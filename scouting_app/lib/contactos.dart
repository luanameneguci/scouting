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
            Text(
              'Email',
             style: Theme.of(context).textTheme.bodyLarge,),
            
            const SizedBox(height: 4),
            const Text(
              'clube@academicodeviseu.pt',
            ),
            const SizedBox(height: 16),
            Text(
              'Telefone',
               style: Theme.of(context).textTheme.bodyLarge,),
            
            const SizedBox(height: 4),
            const Text(
              '232 423 268',
            ),
            const SizedBox(height: 16),

             Text(
              'Morada',
               style: Theme.of(context).textTheme.bodyLarge,),
            
            const SizedBox(height: 4),
            const Text(
              'Rua serrado, Bloco 5BA R/C ESQ. E DIR.;\nBloco 5B r/c dir.\n3510-005 - Viseu',
            ),
            const Spacer(),
            Center(
              child: Image.asset(
                'images/logo.png', // Coloque a imagem do logotipo no caminho correto em assets
                ),
            ),
          ],
        ),
      ),
    );
  }
}
