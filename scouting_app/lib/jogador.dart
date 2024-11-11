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
                    const Text(
                      'Francisco Machado',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20.0, // Diminuir o tamanho da fonte
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
                        const Text(
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
            Expanded(
              child: Table(
                defaultVerticalAlignment: TableCellVerticalAlignment.middle,
                columnWidths: const <int, TableColumnWidth>{
                  0: IntrinsicColumnWidth(),
                  1: FlexColumnWidth(),
                },
                children: [
                  TableRow(
                    children: [
                      _buildTableCell('Posição', true),
                      _buildTableCell('Atacante', false),
                    ],
                  ),
                  TableRow(
                    children: [
                      _buildTableCell('Clube', true),
                      _buildTableCell('AC Viseu', false),
                    ],
                  ),
                  TableRow(
                    children: [
                      _buildTableCell('Rating Final', true),
                      _buildTableCell('4', false),
                    ],
                  ),
                  TableRow(
                    children: [
                      _buildTableCell('Escalão', true),
                      _buildTableCell('Sub 23', false),
                    ],
                  ),
                  TableRow(
                    children: [
                      _buildTableCell('Idade', true),
                      _buildTableCell('19', false),
                    ],
                  ),
                  TableRow(
                    children: [
                      _buildTableCell('Nacionalidade', true),
                      _buildTableCell('Portugal', false),
                    ],
                  ),
                ],
              ),
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
                  foregroundColor: Colors.black,
                  backgroundColor: Colors.yellow,
                  padding: const EdgeInsets.symmetric(
                    vertical: 16.0, // Aumentar o tamanho do botão
                    horizontal: 40.0, // Aumentar o tamanho do botão
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

  Widget _buildTableCell(String text, bool isHeader) {
    return Container(
      padding: const EdgeInsets.all(16.0), // Aumentar o espaço nas linhas
      color: isHeader ? const Color(0xFF1F1F1F) : const Color(0xFF2C2C2C),
      child: Text(
        text,
        style: const TextStyle(color: Colors.white),
      ),
    );
  }
}
