import 'package:flutter/material.dart';
import 'package:scouting_app/novoRelatorio.dart';

class RelatoriosPage extends StatefulWidget {
  @override
  _RelatoriosPageState createState() => _RelatoriosPageState();
}

class _RelatoriosPageState extends State<RelatoriosPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Relatórios'),
      ),
      body: Center(
        child: Text('Conteúdo dos Relatórios'),
      ),
    );
  }
}