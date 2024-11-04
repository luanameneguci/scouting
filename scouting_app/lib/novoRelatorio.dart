import 'package:flutter/material.dart';
import 'package:scouting_app/novoJogador.dart';

class NovoRelatorio extends StatefulWidget {
  const NovoRelatorio({super.key});

  @override
  _NovoRelatorioState createState() => _NovoRelatorioState();
}

class _NovoRelatorioState extends State<NovoRelatorio> {
  String _message = "Hello, World!";

  void _updateMessage() {
    setState(() {
      _message = "You pressed the button!";
    });
  }

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
            Text(
              _message,
              style: const TextStyle(fontSize: 24),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _updateMessage,
              child: const Text('Press me'),
            ),
          ],
        ),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: NovoRelatorio(),
  ));
}
