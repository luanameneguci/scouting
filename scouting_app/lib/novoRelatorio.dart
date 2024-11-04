import 'package:flutter/material.dart';
import 'package:scouting_app/novoJogador.dart';

class NovoRelatorio extends StatefulWidget {
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
        title: Text('Novo Relatorio'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              _message,
              style: TextStyle(fontSize: 24),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _updateMessage,
              child: Text('Press me'),
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