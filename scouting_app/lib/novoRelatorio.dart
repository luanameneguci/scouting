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
       body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('This is the Novo relatorio page. Quem vai realizar esta página é Rafael Nogueira'),
            ElevatedButton(            
              child: const Text('Novo jogador'),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const NovoJogador()),
                );
              },
            ),
          ]
      ),
    )
    );
  }
}
