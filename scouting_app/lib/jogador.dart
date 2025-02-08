import 'package:flutter/material.dart';
import 'package:flag/flag.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class JogadorPage extends StatefulWidget {
  final int jogadorId;

  const JogadorPage({super.key, required this.jogadorId});

  @override
  _JogadorPageState createState() => _JogadorPageState();
}

class _JogadorPageState extends State<JogadorPage> {
  Map<String, dynamic>? atletaData;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchAtletaData();
  }

  Future<void> _fetchAtletaData() async {
    // Carrega as variáveis de ambiente
    await dotenv.load(fileName: ".env");

    final response = await http.get(
      Uri.parse('${dotenv.env['API_URL']}/atleta/listar?size=50&page=1'),
    );

    if (response.statusCode == 200) {
      setState(() {
        atletaData = json.decode(response.body);
        isLoading = false;
      });
    } else {
      throw Exception('Falha ao carregar dados do atleta');
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: Text('Carregando...'),
        ),
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text('Jogador ID: ${widget.jogadorId}'),
      ),
      backgroundColor: const Color.fromARGB(255, 30, 30, 30),
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
                      atletaData?['nome'] ?? 'Nome não disponível',
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
                          atletaData?['datanascimento'] ?? 'Data não disponível',
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
                    _buildTableCell(atletaData?['posicoes']?[0]?['designacao'] ?? 'Posição não disponível', false),
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Clube', true),
                    _buildTableCell(atletaData?['clube']?['nome'] ?? 'Clube não disponível', false),
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Rating Final', true),
                    _buildTableCell(atletaData?['ratingfinal']?.toString() ?? 'Rating não disponível', false),
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Escalão', true),
                    _buildTableCell(atletaData?['escalao']?['designacao'] ?? 'Escalão não disponível', false),
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Idade', true),
                    _buildTableCell(atletaData?['idade']?.toString() ?? 'Idade não disponível', false),
                  ],
                ),
                TableRow(
                  children: [
                    _buildTableCell('Nacionalidade', true),
                    _buildTableCell(atletaData?['nacionalidades']?[0]?['designacao'] ?? 'Nacionalidade não disponível', false),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 12),
            ElevatedButton.icon(
              onPressed: () {
                Navigator.pushNamed(
                  context,
                  '/jogador',
                  arguments: {"jogadorId": widget.jogadorId + 1},
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