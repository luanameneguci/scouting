import 'package:flutter/material.dart';
import 'package:flag/flag.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class JogadorPage extends StatefulWidget {
  final int jogadorId;
  
  const JogadorPage({super.key, required this.jogadorId});

  @override
  _JogadorPageState createState() => _JogadorPageState();
}

class _JogadorPageState extends State<JogadorPage> {
  Map<String, dynamic>? jogador;
  bool isLoading = true;
  
  @override
  void initState() {
    super.initState();
    fetchJogador();
  }

  Future<void> fetchJogador() async {
    try {
      final response = await http.get(Uri.parse('http://localhost:8080/atleta/${widget.jogadorId}'));
      if (response.statusCode == 200) {
        setState(() {
          jogador = json.decode(response.body);
          isLoading = false;
        });
      } else {
        throw Exception('Erro ao buscar dados do jogador');
      }
    } catch (e) {
      print('Erro: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Jogador'),
      ),
      backgroundColor: const Color.fromARGB(255, 30, 30, 30),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : jogador == null
              ? Center(child: Text('Erro ao carregar jogador', style: TextStyle(color: Colors.white)))
              : SingleChildScrollView(
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
                                jogador!["nome"] ?? "Nome não disponível",
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
                                    jogador!["nacionalidades"] != null && jogador!["nacionalidades"].isNotEmpty
                                        ? jogador!["nacionalidades"][0]["designacao"].substring(0, 2).toUpperCase()
                                        : 'PT',
                                    width: 30,
                                    height: 20,
                                  ),
                                  const SizedBox(width: 8.0),
                                  Text(
                                    jogador!["datanascimento"] ?? "--/--/----",
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
                          _buildTableRow('Posição', jogador!["posicoes"]?.isNotEmpty ?? false ? jogador!["posicoes"][0]["designacao"] : 'N/A'),
                          _buildTableRow('Clube', jogador!["clube"]?["nome"] ?? 'N/A'),
                          _buildTableRow('Rating Final', jogador!["ratingfinal"]?.toString() ?? 'N/A'),
                          _buildTableRow('Escalão', jogador!["escalao"]?["designacao"] ?? 'N/A'),
                          _buildTableRow('Idade', jogador!["idade"]?.toString() ?? 'N/A'),
                          _buildTableRow('Nacionalidade', jogador!["nacionalidades"]?.isNotEmpty ?? false ? jogador!["nacionalidades"][0]["designacao"] : 'N/A'),
                          _buildTableRow('Nome do Encarregado', jogador!["nomeencarregado"] ?? 'N/A'),
                          _buildTableRow('Contato do Encarregado', jogador!["contactoencarregado"] ?? 'N/A'),
                        ],
                      ),
                      const SizedBox(height: 12),
                      ElevatedButton.icon(
                        onPressed: () {
                          Navigator.pushNamed(context, '/novo_relatorio');
                        },
                        icon: const Icon(Icons.add, color: Colors.black),
                        label: const Text(
                          'Novo relatório',
                          style: TextStyle(color: Colors.black),
                        ),
                        style: ElevatedButton.styleFrom(
                          foregroundColor: Colors.black,
                          backgroundColor: Colors.amber,
                          padding: const EdgeInsets.symmetric(vertical: 16.0),
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

  TableRow _buildTableRow(String title, String value) {
    return TableRow(
      children: [
        _buildTableCell(title, true),
        _buildTableCell(value, false),
      ],
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
