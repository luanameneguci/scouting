import 'package:flutter/material.dart';

class JogadorPage extends StatefulWidget {
  const JogadorPage({super.key});

  @override
  _JogadorPageState createState() => _JogadorPageState();
}

class _JogadorPageState extends State<JogadorPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Jogador'),
      ),
      backgroundColor: const Color(0xFF2C2C2C), // Fundo do ecrã cinzento escuro
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Francisco',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 24.0,
                      ),
                    ),
                    Text(
                      'Machado',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 24.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8.0),
                    Row(
                      children: [
                        Image.asset(
                          'assets/portugal_flag.png', // Adicione a bandeira de Portugal
                          width: 24,
                          height: 24,
                        ),
                        const SizedBox(width: 8.0),
                        Text(
                          '22/07/2005',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16.0,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 16.0),
            Table(
              defaultVerticalAlignment: TableCellVerticalAlignment.middle,
              children: [
                TableRow(
                  children: [
                    _buildTableCell('Posição'),
                    _buildTableCell('Atacante'),
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Clube'),
                    _buildTableCell('AC Viseu'),
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Rating Final'),
                    _buildTableCell('4'),
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Escalão'),
                    _buildTableCell('Sub 23'),
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Idade'),
                    _buildTableCell('19'),
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Nacionalidade'),
                    _buildTableCell('Portugal'),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 16.0),
            Center(
              child: ElevatedButton.icon(
                onPressed: () {
                  // Ação do botão
                },
                icon: const Icon(Icons.add, color: Colors.black),
                label: const Text(
                  'Novo relatório',
                  style: TextStyle(color: Colors.black),
                ),
                style: ElevatedButton.styleFrom(
                  foregroundColor: Colors.black, backgroundColor: Colors.yellow,
                  padding: const EdgeInsets.symmetric(
                    vertical: 12.0,
                    horizontal: 24.0,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTableCell(String text) {
    return Container(
      padding: const EdgeInsets.all(8.0),
      color: const Color(0xFF1F1F1F),
      child: Text(
        text,
        style: const TextStyle(color: Colors.white),
      ),
    );
  }
}
