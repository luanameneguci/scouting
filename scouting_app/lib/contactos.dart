import 'package:flutter/material.dart';

class ContactosPage extends StatefulWidget {
  const ContactosPage({super.key});

  @override
  _ContactosPageState createState() => _ContactosPageState();
}

class _ContactosPageState extends State<ContactosPage>{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Contactos'),
      ),
      body: const Center(
        child: Text('This is the Contactos page. Quem vai realizar esta página é Francisca Palma 25393'),
      ),
    );
  }
}
