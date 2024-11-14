import 'package:flutter/material.dart';
import 'package:flags/flags.dart'; // Importa a biblioteca de bandeiras

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
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(18.0), // Adiciona o padding de 18 px
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
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
                        Flags.getMiniFlag('PT', 24, 16), // Adicione a bandeira de Portugal
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
            const SizedBox(height: 12),
            ElevatedButton.icon(
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
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8.0),
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
