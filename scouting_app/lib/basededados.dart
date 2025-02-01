import 'dart:async';
import 'package:sqflite/sqflite.dart';
import 'package:collection/collection.dart';
import 'package:path/path.dart';
import 'dart:convert';
import 'dart:io';
import 'package:flutter/services.dart';
import 'package:path_provider/path_provider.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Basededados {
  final String? url;
  static const nomebd = "scouting.db";
  final int versao = 1;
  static Database? _basededados;

  List<String> jogadores = [];
  List<String> clubes = [];
  List<String> gameDays = [];
  List<String> gameTimes = [];

  Basededados({required this.url});

//---------------------------------------
  Future<Database> get basededados async {
    if (_basededados != null) return _basededados!;
    _basededados = await _initDatabase();
    return _basededados!;
  }

  _initDatabase() async {
    String path = join(await getDatabasesPath(), nomebd);
    return await openDatabase(path, version: versao, onCreate: _onCreate);
  }

//---------------------------------------
  Future _onCreate(Database db, int version) async {}

  Future<void> fetchInitPageData() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');

    try {
      final response = await http.get(
        Uri.parse(url!),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token', // Include the token here
        },
      );
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);

        for (var jogoUser in data["JogosUser"]) {
          // Extract atleta names
          String atletaNome = jogoUser["RelatedAtleta"]["nome"];
          jogadores.add(atletaNome);

          // Extract club names
          List<String> clubesNomes = jogoUser["jogo"]["JogoClubes"]
              .map<String>((clubeData) =>
                  clubeData["RelatedClube"]["nome"]?.toString() ??
                  "Unknown Club")
              .toList();
          // Format the clubs string
          String clubesString = '${clubesNomes[0]} x ${clubesNomes[1]}';
          clubes.add(clubesString);

          // Extract game date and time
          String gameDateTime = jogoUser["jogo"]["data"];
          DateTime dateTime = DateTime.parse(gameDateTime);
          gameDays.add(
              '${dateTime.year}-${dateTime.month.toString().padLeft(2, '0')}-${dateTime.day.toString().padLeft(2, '0')}');
          gameTimes.add(
              '${dateTime.hour}:${dateTime.minute.toString().padLeft(2, '0')}');
        }

        // Print the lists (or do something with them)
        print("Jogadores: $jogadores");
        print("Clubes: $clubes");
        print("Game Days: $gameDays");
        print("Game Times: $gameTimes");
      } else {
        print("Failed to fetch data: ${response.statusCode}");
      }
    } catch (error) {
      print("Error fetching data: $error");
    }
  }
}

/* Future<void> inserirvalor(String title, String description, String imagePath) async {
  Database db = await basededados;
  await db.insert(
    'produto',
    {'title': title, 'description': description, 'imagePath': imagePath},
    conflictAlgorithm: ConflictAlgorithm.replace, // Prevent overwriting
  );
}

   Future<void> inserirUser(
      nome, email, password, perfil) async {
    Database db = await basededados;
    await db.rawInsert(
        'insert into utilizador(nome, email, password, perfil) values("$nome","$email", "$password", "$perfil")');
  } */

