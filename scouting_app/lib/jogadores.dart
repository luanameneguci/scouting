import 'package:flutter/material.dart';
import 'package:scouting_app/jogador.dart';

class JogadoresPage extends StatefulWidget {
  const JogadoresPage({super.key});

  @override
  _JogadoresPageState createState() => _JogadoresPageState();
}

class _JogadoresPageState extends State<JogadoresPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Jogadores'),
      ),
      body: const Center(
        child: Text('This is the Jogadores page'),
      ),
    );
  }
}
