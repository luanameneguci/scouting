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
import 'package:flutter_dotenv/flutter_dotenv.dart';

class Basededados {
  final String? url;
  static const nomebd = "scouting.db";
  final int versao = 1;
  static Database? _basededados;
  DateTime? lastFetchedTime;

  List<Map<String, dynamic>> jogadores = [];
  List<String> clubes = [];
  List<String> gameDays = [];
  List<String> gameTimes = [];
  String username2 = "";
  int tipo = 0;
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

    // Prepare the query params for fetching the new data
    String queryParams = lastFetchedTime != null
        ? '?since=${lastFetchedTime!.toIso8601String()}'
        : '';

    try {
      final response = await http.get(
        Uri.parse('$url$queryParams'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token', // Include the token here
        },
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);

        for (var jogoUser in data["JogosUser"]) {
          // Extract athlete information
          int atletaId = jogoUser["id_atleta"];
          String atletaNome = jogoUser["RelatedAtleta"]["nome"];
          String atletaEscalao =
              jogoUser["RelatedAtleta"]["escalao"]["designacao"];
          String atletaClube = jogoUser["RelatedAtleta"]["clube"]["nome"];

          // Add athlete details to jogadores map
          jogadores.add({
            'id': atletaId,
            'nome': atletaNome,
            'escalao': atletaEscalao,
            'clube': atletaClube
          });

          // Print athlete's additional details
          print(
              "Atleta: $atletaNome, Escalão: $atletaEscalao, Clube: $atletaClube");

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

          // Update the last fetched time to the current time
          if (lastFetchedTime == null ||
              DateTime.now().isAfter(lastFetchedTime!)) {
            lastFetchedTime = DateTime.now();
          }
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

 Future<void> fetchUserData() async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  
  final String url = dotenv.env['API_URL']! + '/mobile/userData';

  try {
    final response = await http.get(
      Uri.parse(url),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token', // Include the token here
      },
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      // Debugging: Print the response body to inspect the structure
      print("Response Data: $data");

      // Check if the "User" key exists and is not null, and that it's an array
      if (data != null && data.containsKey("User") && data["User"] is List) {
        // Safely access the first element of the "User" array and the "nome" key
        username2 = data["User"][0]["nome"];
        tipo = data["User"][0]["id_tipoutilizador"];

        print("User Name: $username2");
        print("User Name: $tipo");
      } else {
        print("Error: 'User' key is missing, null, or not an array in the response.");
      }
    } else {
      print("Failed to fetch data: ${response.statusCode}");
      print("Response Body: ${response.body}");
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

