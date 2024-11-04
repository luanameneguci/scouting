import 'package:flutter/material.dart';

class NovoJogador extends StatefulWidget {
  const NovoJogador({super.key});

  @override
  _NovoJogadorState createState() => _NovoJogadorState();
}

class _NovoJogadorState extends State<NovoJogador> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Novo Jogador'),
      ),
      body: const Center(
        child: Text('Conteúdo da nova rota'),
      ),
    );
  }
}
