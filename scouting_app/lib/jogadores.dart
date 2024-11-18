import 'package:flutter/material.dart';
import 'package:flag/flag.dart';

class JogadoresPage extends StatefulWidget {
  const JogadoresPage({super.key});

  @override
  _JogadoresPageState createState() => _JogadoresPageState();
}

class _JogadoresPageState extends State<JogadoresPage> {
  final List<Map<String, dynamic>> jogadores = [
    {
      'nome': 'Francisco Machado',
      'posicao': 'MCO',
      'idade': 19,
      'paisCode': 'PT',
      'estrelas': 5
    },
    {
      'nome': 'Elisse Ben Seghir',
      'posicao': 'ME',
      'idade': 19,
      'paisCode': 'FR',
      'estrelas': 4
    },
    {
      'nome': 'Samuel Omorodion',
      'posicao': 'PL',
      'idade': 20,
      'paisCode': 'ES',
      'estrelas': 2
    },
    {
      'nome': 'M\'bala Nzola',
      'posicao': 'PL',
      'idade': 28,
      'paisCode': 'AO',
      'estrelas': 3
    },
  ];

  String searchQuery = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Consultar jogadores'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            TextField(
              decoration: InputDecoration(
                hintText: 'Buscar jogador',
                suffixIcon: Padding(
                  padding: const EdgeInsets.only(
                      right: 8.0), // Add padding to the right
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal:
                                4.0), // Add horizontal padding for each icon
                        child: Icon(
                          Icons.search,
                          color: Colors.grey[600], // Set to lighter grey color
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal:
                                4.0), // Add horizontal padding for each icon
                        child: Icon(
                          Icons.tune,
                          color: Colors.grey[600], // Set to lighter grey color
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              onChanged: (value) {
                setState(() {
                  searchQuery = value;
                });
              },
            ),
            Expanded(
              child: ListView.builder(
                itemCount: jogadores.length,
                itemBuilder: (context, index) {
                  final jogador = jogadores[index];
                  final nome = jogador['nome'];
                  final posicao = jogador['posicao'];
                  final idade = jogador['idade'];
                  final paisCode = jogador['paisCode'];
                  final estrelas = jogador['estrelas'];

                  if (searchQuery.isNotEmpty &&
                      !nome.toLowerCase().contains(searchQuery.toLowerCase())) {
                    return Container();
                  }

                  return Card(
                    elevation: 2,
                    color: const Color.fromARGB(255, 35, 35, 35),
                    margin: const EdgeInsets.symmetric(
                        vertical: 4.0, horizontal: 0.0),
                    child: ListTile(
                      leading: Flag.fromString(
                        paisCode,
                        width: 30,
                        height: 30,
                      ),
                      title: GestureDetector(
                        onTap: () {
                          if (nome == 'Francisco Machado') {
                            Navigator.pushNamed(context, '/jogador');
                          }
                        },
                        child: Text(
                          nome,
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      subtitle: Text(
                        '$posicao | $idade anos',
                        style: const TextStyle(color: Colors.grey),
                      ),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: List.generate(
                          estrelas,
                          (index) => const Icon(
                            Icons.star,
                            color: Colors.amber,
                            size: 20.0,
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
