import 'package:flutter/material.dart';

class NovoJogador extends StatefulWidget {
  @override
  _NovoJogadorState createState() => _NovoJogadorState();
}

class _NovoJogadorState extends State<NovoJogador> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Novo Jogador'),
      ),
      body: Center(
        child: Text('Conteúdo da nova rota'),
      ),
    );
  }
}