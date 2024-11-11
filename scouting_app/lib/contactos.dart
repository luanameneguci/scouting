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
         body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Email',
              style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 4),
            const Text(
              'clube@academicodeviseu.pt',
              style: TextStyle(color: Colors.white, fontSize: 16),
            ),
            const SizedBox(height: 16),
            const Text(
              'Telefone',
              style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 4),
            const Text(
              '232 423 268',
              style: TextStyle(color: Colors.white, fontSize: 16),
            ),
            const SizedBox(height: 16),
            const Text(
              'Morada',
              style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 4),
            const Text(
              'Rua serrado, Bloco 5BA R/C ESQ. E DIR.;\nBloco 5B r/c dir.\n3510-005 - Viseu',
              style: TextStyle(color: Colors.white, fontSize: 16),
            ),
            const Spacer(),
            Center(
              child: Image.asset(
                'images/logo.png', // Coloque a imagem do logotipo no caminho
              ),
            ),
          ],
        ),
      ),
    );
  }
}
