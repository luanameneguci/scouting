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
        children: const <Widget>[
          ExpansionTile(
            title: Text('Section 1'),
            children: <Widget>[
              ListTile(
                title: Text('Content for Section 1'),
              ),
            ],
          ),
          ExpansionTile(
            title: Text('Section 2'),
            children: <Widget>[
              ListTile(
                title: Text('Content for Section 2'),
              ),
            ],
          ),
          ExpansionTile(
            title: Text('Section 3'),
            children: <Widget>[
              ListTile(
                title: Text('Content for Section 3'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
