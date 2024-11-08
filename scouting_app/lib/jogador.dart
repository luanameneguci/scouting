import 'package:flutter/material.dart';
import 'package:scouting_app/novoRelatorio.dart';

class JogadorPage extends StatefulWidget {
  const JogadorPage({super.key});

  @override
  _JogadorPageState createState() => _JogadorPageState();
}

class _JogadorPageState extends State<JogadorPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Jogador'),
      ),
      body: const Center(
        child: Text('This is the Jogador page. quem vai realizar esta página é Rodrigo Oliveira 26511'),
      ),
    );
  }
}
