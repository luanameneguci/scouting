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
              onChanged: (query) {
                setState(() {
                  searchQuery = query.toLowerCase();
                });
              },
            ),
            const SizedBox(height: 10),
            Expanded(
              child: ListView.builder(
                itemCount: jogadores.length,
                itemBuilder: (context, index) {
                  final jogador = jogadores[index];
                  if (!jogador['nome'].toLowerCase().contains(searchQuery)) {
                    return Container(); // Hide player if it doesn't match the search query
                  }
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 5.0),
                    child: ListTile(
                      leading: Flag.fromString(
                        jogador['paisCode'],
                        width: 30,
                        height: 30,
                        fit: BoxFit.fill,
                      ),
                      title: Text(
                        jogador['nome'],
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Row(
                        children: [
                          Text(
                              '${jogador['posicao']} • ${jogador['idade']} anos'),
                          const SizedBox(width: 10),
                          Row(
                            children: List.generate(
                              jogador['estrelas'],
                              (starIndex) => const Icon(
                                Icons.star,
                                size: 15,
                                color: Colors.amber,
                              ),
                            ),
                          ),
                        ],
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
