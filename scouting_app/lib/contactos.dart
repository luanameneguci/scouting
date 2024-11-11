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
                width: 120,
                height: 120,
                ),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: const Color(0xFF1E1E1E),
        selectedItemColor: const Color(0xFFFFD000), // Cor amarela para item selecionado
        unselectedItemColor: Colors.white54,
        currentIndex: 4, // Define o índice selecionado como o último
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.post_add),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_search),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.notifications_none_outlined),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: '',
          ),
        ],
      ),
    );
  }
}
