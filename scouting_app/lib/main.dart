import 'package:flutter/material.dart';
import 'package:scouting_app/jogador.dart';
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
          primaryColor: const Color.fromARGB(255, 23, 23, 23),
          scaffoldBackgroundColor:const Color.fromARGB(255, 30, 30, 30),
          cardColor: const Color.fromARGB(255, 43, 43, 43),
          colorScheme: const ColorScheme.dark(
            primary: Color.fromARGB(255, 30, 30, 30),
            secondary: Color.fromARGB(255, 255, 208, 0), // Yellow accent color
          ),
          inputDecorationTheme: InputDecorationTheme(
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(18),
            ),
          ),
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ButtonStyle(
              backgroundColor: WidgetStateProperty.all(const Color.fromARGB(255, 255, 208, 0)),
              shape: WidgetStateProperty.all(
                RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(100),
                ),
              ),
            ),
          ),
          iconTheme: const IconThemeData(color: Color.fromARGB(255, 255, 208, 0), ),
          bottomNavigationBarTheme: const BottomNavigationBarThemeData(
            backgroundColor: Color.fromARGB(255, 30, 30, 30),
            selectedItemColor: Color.fromARGB(255, 255, 208, 0),
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

        JogadorPage(),

        // Perfil page (uses PerfilPage here)
        PerfilPage(),
      ][currentPageIndex],
    );
  }
}
