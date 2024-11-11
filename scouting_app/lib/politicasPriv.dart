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
        padding: const EdgeInsets.all(8.0),
        children: <Widget>[
          _buildExpansionTile('Identificação do responsável pelo tratamento', 'Académico de Viseu Futebol Clube\nNIPC 503954306\nSede: sede no Estádio Municipal do Fontelo, Avenida Anacleto Pinto, freguesia e concelho de Viseu.\nContato do EPD (Encarregado da Proteção de Dados) xxxxx@xxxxx  '),
          const SizedBox(height: 18.0),
          _buildExpansionTile('Informação, consentimento e finalidade do tratamento', 'Content for Section 2'),
          const SizedBox(height: 18.0),
          _buildExpansionTile('Medidas de Segurança', 'Content for Section 3'),
        ],
      ),
    );
  }

  Widget _buildExpansionTile(String title, String content) {
    return ExpansionTile(
      title: Text(
        title,
        style: const TextStyle(fontWeight: FontWeight.bold),
      ),
      children: <Widget>[
        ListTile(
          title: Text(content),
        ),
      ],
      backgroundColor: const Color.fromARGB(255, 43, 43, 43),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18.0),
      ),
      collapsedShape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18.0),
      ),
      iconColor: Colors.white,
      collapsedIconColor: Colors.white,
    );
  }
}
