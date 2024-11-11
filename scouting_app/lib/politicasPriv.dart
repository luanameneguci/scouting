import 'package:flutter/material.dart';

class PoliticasPrivPage extends StatefulWidget {
  const PoliticasPrivPage({super.key});

  @override
  _PoliticasPrivPageState createState() => _PoliticasPrivPageState();
}

class _PoliticasPrivPageState extends State<PoliticasPrivPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Política de Privacidade'),
      ),
      body: ListView(
        children: <Widget>[
          ExpansionTile(
            title: const Text('Identificação do responsável pelo tratamento', style: TextStyle(fontWeight: FontWeight.bold)),
            children: <Widget>[
              ListTile(
                title: const Text('Content for Section 1'),
              ),
            ],
          ),
          ExpansionTile(
            title: const Text('Informação, consentimento e finalidade do tratamento', style: TextStyle(fontWeight: FontWeight.bold)),            children: <Widget>[
              ListTile(
                title: const Text('Content for Section 2'),
              ),
            ],
          ),
          ExpansionTile(
            title: const Text(, style: TextStyle(fontWeight: FontWeight.bold)),            children: <Widget>[
              ListTile(
                title: const Text('Content for Section 3'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
