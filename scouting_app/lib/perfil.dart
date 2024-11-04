import 'package:flutter/material.dart';

class PerfilPage extends StatefulWidget {
  @override
  _PerfilPageState createState() => _PerfilPageState();
}

class _PerfilPageState extends State<PerfilPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Perfil'),
        backgroundColor: Colors.black,
        elevation: 0,
      ),
      backgroundColor: Colors.black,
      body: ListView(
        children: [
          ListTile(
            title: Text(
              'Mudar palavra passe',
              style: TextStyle(color: Colors.white),
            ),
            trailing: Icon(Icons.chevron_right, color: Colors.grey),
            onTap: () {
              // Add functionality for changing password
            },
          ),
          Divider(color: Colors.grey),
          ListTile(
            title: Text(
              'Política de privacidade',
              style: TextStyle(color: Colors.white),
            ),
            trailing: Icon(Icons.chevron_right, color: Colors.grey),
            onTap: () {
              // Add functionality for privacy policy
            },
          ),
          Divider(color: Colors.grey),
          ListTile(
            title: Text(
              'Aparência',
              style: TextStyle(color: Colors.white),
            ),
            trailing: Icon(Icons.chevron_right, color: Colors.grey),
            onTap: () {
              // Add functionality for appearance settings
            },
          ),
          Divider(color: Colors.grey),
        ],
      ),
    );
  }
}
