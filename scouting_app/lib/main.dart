import 'package:flutter/material.dart';
import 'package:scouting_app/notificacoes.dart';
import 'package:scouting_app/perfil.dart';
import 'package:scouting_app/tarefas.dart';
import 'package:scouting_app/relatorios.dart';
import 'package:scouting_app/jogadores.dart';
import 'package:scouting_app/jogador.dart';
import 'package:scouting_app/novorelatorio.dart'; // Importando a nova página de relatório
import 'package:google_fonts/google_fonts.dart';
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
        scaffoldBackgroundColor: const Color.fromARGB(255, 30, 30, 30),
        cardColor: const Color.fromARGB(255, 43, 43, 43),
        colorScheme: const ColorScheme.dark(
          primary: Color.fromARGB(255, 30, 30, 30),
          secondary: Color.fromARGB(255, 255, 208, 0), // Yellow accent color
        ),
        textTheme: GoogleFonts.latoTextTheme(
          Theme.of(context).textTheme,
        ).copyWith(
          headlineLarge: GoogleFonts.lato(
            fontSize: 32.0,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
          headlineMedium: GoogleFonts.lato(
            fontSize: 20.0,
            fontWeight: FontWeight.w400,
            color: Colors.white,
          ),
          headlineSmall: GoogleFonts.lato(
            fontSize: 18.0,
            fontWeight: FontWeight.w400,
            color: Colors.white,
          ),
          bodyLarge: GoogleFonts.lato(
            fontSize: 16.0,
            fontWeight: FontWeight.w400,
            color: Colors.white,
          ),
          bodyMedium: GoogleFonts.lato(
            fontSize: 14.0,
            fontWeight: FontWeight.w300,
            color: Colors.white70,
          ),
          bodySmall: GoogleFonts.lato(
            fontSize: 12.0,
            fontWeight: FontWeight.w200,
            color: Colors.white70,
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: const Color.fromARGB(
              255, 58, 58, 58), // Background color for input fields
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(18), // Roundness
            borderSide: BorderSide.none, // No border
          ),
          labelStyle: const TextStyle(
            color: Colors.grey, // Color for the label when not selected
          ),
          floatingLabelStyle: const TextStyle(
            color: Colors.white, // Color for the label when selected
          ),
          contentPadding: const EdgeInsets.all(18.0),
        ),
        textSelectionTheme: const TextSelectionThemeData(
          cursorColor: Colors.white, // Set cursor color to white
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ButtonStyle(
            backgroundColor:
                WidgetStateProperty.all(const Color.fromARGB(255, 255, 208, 0)),
            shape: WidgetStateProperty.all(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(100),
              ),
            ),
            padding: WidgetStateProperty.all(
              const EdgeInsets.all(18.0), // Padding for the button
            ),
          ),
        ),
        iconTheme: const IconThemeData(
          color: Color.fromARGB(255, 255, 208, 0),
        ),
        splashFactory: NoSplash.splashFactory,
        useMaterial3: true,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginPage(),
        '/jogador': (context) => const JogadorPage(),
        '/novo_relatorio': (context) => RelatorioScreen(),
      },
    );
  }
}

class Navigation extends StatefulWidget {
  const Navigation({super.key});

  @override
  State<Navigation> createState() => _NavigationState();
}

class _NavigationState extends State<Navigation> {
  int _selectedIndex = 0;

  static const List<Widget> _widgetOptions = <Widget>[
    TarefasPage(),
    RelatoriosPage(),
    JogadoresPage(),
    NotificacoesPage(),
    PerfilPage()
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        showSelectedLabels: false,
        showUnselectedLabels: false,
        backgroundColor: const Color.fromARGB(
            255, 23, 23, 23), // Set a general dark background
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        items: <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: _buildIcon(Icons.home_outlined, 0),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: _buildIcon(Icons.post_add_outlined, 1),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: _buildIcon(Icons.person_search_outlined, 2),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: _buildIcon(Icons.notifications_none_outlined, 3),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: _buildIcon(Icons.person_outlined, 4),
            label: '',
          ),
        ],
      ),
    );
  }

  // Custom widget method to add background color to selected icons
  Widget _buildIcon(IconData iconData, int index) {
    bool isSelected = index == _selectedIndex;
    return Container(
      transform: Matrix4.translationValues(0.0, 6.0, 0.0),
      decoration: BoxDecoration(
          color: isSelected ? Colors.amber : Colors.transparent,
          shape: BoxShape.rectangle,
          borderRadius: BorderRadius.circular(10)),
      padding: const EdgeInsets.only(
        top: 4.0,
        bottom: 4.0,
        left: 20.0,
        right: 20.0,
      ), // Padding for background effect
      child: Icon(
        size: 27,
        iconData,
        color: isSelected ? Colors.black : Colors.amber, // Icon color
      ),
    );
  }
}
