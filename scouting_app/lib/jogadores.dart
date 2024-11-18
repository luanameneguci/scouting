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
      'nome': "M'bala Nzola",
      'posicao': 'PL',
      'idade': 28,
      'paisCode': 'AO',
      'estrelas': 3
    },
  ];

  String searchQuery = '';
  bool isFilterVisible = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Consultar jogadores'),
      ),
      body: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: [
                TextField(
                  decoration: InputDecoration(
                    hintText: 'Buscar jogador',
                    suffixIcon: Padding(
                      padding: const EdgeInsets.only(right: 8.0),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Padding(
                            padding:
                                const EdgeInsets.symmetric(horizontal: 4.0),
                            child: Icon(
                              Icons.search,
                              color: Colors.grey[600],
                            ),
                          ),
                          GestureDetector(
                            onTap: () {
                              setState(() {
                                isFilterVisible = true;
                              });
                            },
                            child: Padding(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 4.0),
                              child: Icon(
                                Icons.tune,
                                color: Colors.grey[600],
                              ),
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
                      if (!jogador['nome']
                          .toLowerCase()
                          .contains(searchQuery)) {
                        return Container();
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
          if (isFilterVisible)
            Positioned.fill(
              child: Material(
                color: Colors.black54,
                child: GestureDetector(
                  onTap: () {
                    setState(() {
                      isFilterVisible = false;
                    });
                  },
                  child: Center(
                    child: Container(
                      padding: const EdgeInsets.all(16.0),
                      margin: const EdgeInsets.symmetric(horizontal: 20.0),
                      decoration: BoxDecoration(
                        color: Colors.grey[900],
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Text(
                            'Filtros',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 10),
                          _buildFilterDropdown(
                              'Posição', ['Ataque', 'Defesa', 'Meio']),
                          const SizedBox(height: 10),
                          _buildFilterDropdown(
                              'Clube', ['Clube A', 'Clube B', 'Clube C']),
                          const SizedBox(height: 10),
                          _buildFilterDropdown(
                              'Rating', ['1', '2', '3', '4', '5']),
                          const SizedBox(height: 10),
                          _buildFilterDropdown(
                              'Escalão', ['Sub 20', 'Sub 23', 'Profissional']),
                          const SizedBox(height: 10),
                          _buildFilterDropdown('Ano de nascimento',
                              ['2000', '2001', '2002', '2024']),
                          const SizedBox(height: 20),
                          ElevatedButton(
                            onPressed: () {
                              setState(() {
                                isFilterVisible = false;
                              });
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.yellow,
                              foregroundColor: Colors.black,
                            ),
                            child: const Text('Aplicar filtros'),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildFilterDropdown(String label, List<String> items) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      decoration: BoxDecoration(
        color: Colors.grey[800],
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: DropdownButton<String>(
        value: items.first,
        dropdownColor: Colors.grey[800],
        iconEnabledColor: Colors.white,
        underline: Container(),
        isExpanded: true,
        items: items.map((String value) {
          return DropdownMenuItem<String>(
            value: value,
            child: Text(
              value,
              style: const TextStyle(color: Colors.white),
            ),
          );
        }).toList(),
        onChanged: (String? newValue) {},
      ),
    );
  }
}
