import 'package:flutter/material.dart';
import 'package:scouting_app/perfil.dart';
import 'package:scouting_app/perfil.dart';
import 'package:scouting_app/tarefas.dart';
import 'package:scouting_app/relatorios.dart';
import 'package:scouting_app/jogadores.dart';
import 'package:scouting_app/notificacoes.dart';
import 'package:scouting_app/perfil.dart'; // Import PerfilPage

void main() => runApp(const HomePage());

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(useMaterial3: true),
      home: const Navigation(),
    );
  }
}

class Navigation extends StatefulWidget {
  const Navigation({super.key});

  @override
  State<Navigation> createState() => _NavigationState();
}

class _NavigationState extends State<Navigation> {
  int currentPageIndex = 0;

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    return Scaffold(
      bottomNavigationBar: NavigationBar(
        backgroundColor: Colors.grey[900],        
        onDestinationSelected: (int index) {
          setState(() {
            currentPageIndex = index;
          });
        },
        indicatorColor: Colors.amber,
        selectedIndex: currentPageIndex,
    
        destinations: const <Widget>[
          NavigationDestination(
            selectedIcon: Icon(Icons.home_outlined),
            icon: Icon(Icons.home_outlined,size: 30, color: Colors.amber),
            label: '',
          ),
          NavigationDestination(
            icon: Icon(Icons.post_add),
            label: '',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_search),          
            label: '',
          ),
          NavigationDestination(
            icon: Icon(Icons.notifications_none_outlined),
            label: '',
          ),
          NavigationDestination(
            icon: Icon(Icons.person),
            label: '',
          ),
        ],
      ),
      body: <Widget>[
        // Home page

        TarefasPage(),

        // Notifications page
        RelatoriosPage(),

        JogadoresPage(),

        NotificacoesPage(),

        // Perfil page (uses PerfilPage here)
        PerfilPage(),
      ][currentPageIndex],
    );
  }
}
