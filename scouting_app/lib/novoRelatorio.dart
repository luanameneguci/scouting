import 'package:flutter/material.dart';
import 'package:scouting_app/novoJogador.dart';


class NovoRelatorio extends StatefulWidget {
  const NovoRelatorio({super.key});

  @override
  _NovoRelatorioState createState() => _NovoRelatorioState();
}

class _NovoRelatorioState extends State<NovoRelatorio> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Novo Relatorio'),
      ),
      body: const Center(
        child: Text('Página de novo Relatorio. Quem vai realizar esta página é Rafael Nogueira 26504'),
      ),
    );
  }
}
