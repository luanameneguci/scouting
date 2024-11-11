import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

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
      'pais': 'assets/flags/portugal.svg',
      'estrelas': 5
    },
    {
      'nome': 'Elisse Ben Seghir',
      'posicao': 'ME',
      'idade': 19,
      'pais': 'assets/flags/france.svg',
      'estrelas': 4
    },
    {
      'nome': 'Samuel Omorodion',
      'posicao': 'PL',
      'idade': 20,
      'pais': 'assets/flags/spain.svg',
      'estrelas': 2
    },
    {
      'nome': 'M\'bala Nzola',
      'posicao': 'PL',
      'idade': 28,
      'pais': 'assets/flags/angola.svg',
      'estrelas': 3
    },
  ];

  String searchQuery = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: const Text('Consultar jogadores'),
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Container(
              decoration: BoxDecoration(
                color: Colors.grey[800],
                borderRadius: BorderRadius.circular(8.0),
              ),
              child: TextField(
                style: TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  hintText: 'Buscar jogador',
                  hintStyle: TextStyle(color: Colors.grey),
                  prefixIcon: Icon(Icons.search, color: Colors.grey),
                  border: InputBorder.none,
                ),
                onChanged: (query) {
                  setState(() {
                    searchQuery = query.toLowerCase();
                  });
                },
              ),
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
                    color: Colors.grey[900],
                    margin: const EdgeInsets.symmetric(vertical: 5.0),
                    child: ListTile(
                      leading: SvgPicture.asset(
                        jogador['pais'],
                        width: 30,
                        height: 30,
                      ),
                      title: Text(
                        jogador['nome'],
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                      subtitle: Row(
                        children: [
                          Text(
                            '${jogador['posicao']}  •  ${jogador['idade']}',
                            style: TextStyle(color: Colors.grey[400]),
                          ),
                          const SizedBox(width: 10),
                          Row(
                            children: List.generate(
                              5,
                              (starIndex) => Icon(
                                starIndex < jogador['estrelas']
                                    ? Icons.star
                                    : Icons.star_border,
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
