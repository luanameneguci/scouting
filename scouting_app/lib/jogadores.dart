import 'package:flutter/material.dart';
import 'package:scouting_app/jogador.dart';

class JogadoresPage extends StatefulWidget {
  @override
  _JogadoresPageState createState() => _JogadoresPageState();
}

class _JogadoresPageState extends State<JogadoresPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Jogadores'),
      ),
      body: Center(
        child: Text('This is the Jogadores page'),
      ),
    );
  }
}