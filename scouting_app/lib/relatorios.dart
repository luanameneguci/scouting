import 'package:flutter/material.dart';
import 'package:scouting_app/novoRelatorio.dart';

class RelatoriosPage extends StatefulWidget {
  const RelatoriosPage({super.key});

  @override
  _RelatoriosPageState createState() => _RelatoriosPageState();
}

class _RelatoriosPageState extends State<RelatoriosPage> {
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
            const Text('Conteúdo dos Relatórios. Quem vai realizar esta página é Francisca Palma 25393'),
            ElevatedButton(
              child: const Text('Novo relatório'),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const NovoRelatorio()),
                );
              },
            ),
          ]
      ),
    )
    );
  }
}
