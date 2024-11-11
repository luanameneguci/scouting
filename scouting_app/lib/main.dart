import 'package:flutter/material.dart';
import 'package:scouting_app/perfil.dart';
import 'package:scouting_app/perfil.dart';
import 'package:scouting_app/tarefas.dart';
import 'package:scouting_app/relatorios.dart';
import 'package:scouting_app/jogadores.dart';
import 'package:scouting_app/notificacoes.dart';
import 'package:scouting_app/perfil.dart'; // Import PerfilPage
import 'package:scouting_app/login.dart';

void main() => runApp(const HomePage());

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
          brightness: Brightness.dark,
          primaryColor: Color(0xFF333333),
          scaffoldBackgroundColor: Color(0xFF333333),
          cardColor: Color(0xFF444444),
          colorScheme: ColorScheme.dark(
            primary: Color(0xFF333333),
            secondary: Color(0xFFFFD600), // Yellow accent color
          ),
          
          buttonTheme: ButtonThemeData(
            buttonColor: Color(0xFFFFD600),
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
          ),
          iconTheme: IconThemeData(color: Color(0xFFFFD600)),
          bottomNavigationBarTheme: BottomNavigationBarThemeData(
            backgroundColor: Color(0xFF333333),
            selectedItemColor: Color(0xFFFFD600),
            unselectedItemColor: Colors.white54,
          ),
          useMaterial3: true),
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
            icon: Icon(Icons.home_outlined, size: 30, color: Colors.amber),
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

        LoginPage(),

        // Perfil page (uses PerfilPage here)
        PerfilPage(),
      ][currentPageIndex],
    );
  }
}
