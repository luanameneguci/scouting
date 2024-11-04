import 'package:flutter/material.dart';

class PerfilPage extends StatefulWidget {
  const PerfilPage({super.key});

  @override
  _PerfilPageState createState() => _PerfilPageState();
}

class _PerfilPageState extends State<PerfilPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Perfil'),
        backgroundColor: Colors.black,
        elevation: 0,
      ),
      backgroundColor: Colors.black,
      body: ListView(
        children: [
          ListTile(
            title: const Text(
              'Contactos',
              style: TextStyle(color: Colors.white),
            ),
            trailing: const Icon(Icons.chevron_right, color: Colors.grey),
            onTap: () {
              // Add functionality for changing password
            },
          ),
          const Divider(color: Colors.grey),
          ListTile(
            title: const Text(
              'Política de privacidade',
              style: TextStyle(color: Colors.white),
            ),
            trailing: const Icon(Icons.chevron_right, color: Colors.grey),
            onTap: () {
              // Add functionality for privacy policy
            },
          ),
          const Divider(color: Colors.grey),
          ListTile(
            title: const Text(
              'Aparência',
              style: TextStyle(color: Colors.white),
            ),
            trailing: const Icon(Icons.chevron_right, color: Colors.grey),
            onTap: () {
              // Add functionality for appearance settings
            },
          ),
          const Divider(color: Colors.grey),
        ],
      ),
    );
  }
}
