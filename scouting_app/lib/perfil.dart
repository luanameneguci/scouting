import 'package:flutter/material.dart';
import 'contactos.dart'; // Importa o arquivo contactos.dart

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
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const ContactosPage()),
              );
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
              // Adicione a funcionalidade para a política de privacidade
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
              // Adicione a funcionalidade para configurações de aparência
            },
          ),
          const Divider(color: Colors.grey),
        ],
      ),
    );
  }
}
