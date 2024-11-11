import 'package:flutter/material.dart';
import 'package:country_icons/country_icons.dart';

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
      'paisCode': 'pt',
      'estrelas': 5
    },
    {
      'nome': 'Elisse Ben Seghir',
      'posicao': 'ME',
      'idade': 19,
      'paisCode': 'fr',
      'estrelas': 4
    },
    {
      'nome': 'Samuel Omorodion',
      'posicao': 'PL',
      'idade': 20,
      'paisCode': 'es',
      'estrelas': 2
    },
    {
      'nome': 'M\'bala Nzola',
      'posicao': 'PL',
      'idade': 28,
      'paisCode': 'ao',
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
                prefixIcon: Icon(Icons.search),
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
                      leading: Image.asset(
                        'icons/flags/png/${jogador['paisCode']}.png',
                        package: 'country_icons',
                        width: 30,
                        height: 30,
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
