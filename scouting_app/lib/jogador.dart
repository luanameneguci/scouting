import 'package:flutter/material.dart';
import 'package:flag/flag.dart'; // Usando o pacote flag corretamente

class JogadorPage extends StatefulWidget {
  final int jogadorId;
  
  const JogadorPage({super.key, required this.jogadorId});

  @override
  _JogadorPageState createState() => _JogadorPageState();
}

class _JogadorPageState extends State<JogadorPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Jogador ID: ${widget.jogadorId}'), // Mostra o ID no título
      ),
      backgroundColor: const Color.fromARGB(255, 30, 30, 30), // Fundo escuro
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(18.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Francisco Machado', // Aqui você pode substituir por um nome vindo do backend
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8.0),
                    Row(
                      children: [
                        Flag.fromString(
                          'PT', // Código do país (Portugal)
                          width: 30,
                          height: 20,
                        ),
                        const SizedBox(width: 8.0),
                        Text(
                          '22/07/2005', // Substituir pelo dado correto do jogador
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
                    _buildTableCell('Atacante', false), // Substituir pelo dado real
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Clube', true),
                    _buildTableCell('AC Viseu', false), // Substituir pelo dado real
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Rating Final', true),
                    _buildTableCell('4', false), // Substituir pelo dado real
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Escalão', true),
                    _buildTableCell('Sub 23', false), // Substituir pelo dado real
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Idade', true),
                    _buildTableCell('19', false), // Substituir pelo dado real
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Nacionalidade', true),
                    _buildTableCell('Portugal', false), // Substituir pelo dado real
                  ],
                ),
              ],
            ),
            const SizedBox(height: 12),
            ElevatedButton.icon(
              onPressed: () {
                // Agora abre a página de outro jogador passando o ID correto
                Navigator.pushNamed(
                  context,
                  '/jogador',
                  arguments: {"jogadorId": widget.jogadorId + 1}, // Muda o ID dinamicamente
                );
              },
              icon: const Icon(Icons.person, color: Colors.black),
              label: const Text(
                'Ver próximo jogador',
                style: TextStyle(color: Colors.black),
              ),
              style: ElevatedButton.styleFrom(
                foregroundColor: Colors.black,
                backgroundColor: Colors.amber,
                padding: const EdgeInsets.symmetric(
                  vertical: 16.0,
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
      padding: const EdgeInsets.all(16.0),
      color: isHeader ? const Color.fromARGB(255, 50, 50, 50) : const Color.fromARGB(255, 0, 0, 0),
      child: Text(
        text,
        style: const TextStyle(color: Colors.white),
      ),
    );
  }
}