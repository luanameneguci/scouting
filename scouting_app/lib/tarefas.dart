import 'package:flutter/material.dart';
import 'package:scouting_app/jogador.dart';

class TarefasPage extends StatefulWidget {
  const TarefasPage({super.key});

  @override
  _TarefasPageState createState() => _TarefasPageState();
}

class _TarefasPageState extends State<TarefasPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tarefas'),
      ),
      body: const Center(
        child: Text('This is the Tarefas page. Quem vai realizar esta página é Luana Meneguci 26366'),
      ),
    );
  }
}
