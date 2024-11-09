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
        title: const Text('Relatórios'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('This is the Jogadores page. Quem vai realizar esta página é Renata Farias 24820'),
            ElevatedButton(            
              child: const Text('Jogador específico'),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const JogadorPage()),
                );
              },
            ),
          ]
      ),
    )
    );
  }
}

