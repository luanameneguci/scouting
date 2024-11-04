import 'package:flutter/material.dart';
import 'package:scouting_app/novoRelatorio.dart';

class JogadorPage extends StatefulWidget {
  @override
  _JogadorPageState createState() => _JogadorPageState();
}

class _JogadorPageState extends State<JogadorPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Jogador'),
      ),
      body: Center(
        child: Text('This is the Jogador page'),
      ),
    );
  }
}