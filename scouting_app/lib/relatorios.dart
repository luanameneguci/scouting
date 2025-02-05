import 'package:flutter/material.dart';
import 'package:scouting_app/novoRelatorio.dart'; // Certifique-se que o caminho está correto
import 'dart:async';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:scouting_app/basededados.dart';
import 'package:shared_preferences/shared_preferences.dart';

class RelatoriosPage extends StatefulWidget {
  const RelatoriosPage({super.key});

  @override
  _RelatoriosPageState createState() => _RelatoriosPageState();
}

class _RelatoriosPageState extends State<RelatoriosPage> {
  Map<String, dynamic>? userData;
  Basededados? bd;
  List<dynamic> reports = [];  // Usando List<dynamic> para maior flexibilidade

  @override
  void initState() {
    super.initState();
    _loadUserData();
  }

  // Função para carregar o usuário e dados da API
  void _loadUserData() async {
    final prefs = await SharedPreferences.getInstance();
    final String? userDataString = prefs.getString('userData');

    if (userDataString != null) {
      setState(() {
        userData = jsonDecode(userDataString);
        bd = Basededados(
          url: dotenv.env['API_URL']! + '/relatorio/scout/' + userData!['id'].toString(),
        );
      });

      // Agora que o usuário foi carregado, chamamos a API para buscar os relatórios
      _fetchReports();
    }
  }

  // Função para pegar os dados da API
  Future<void> _fetchReports() async {
    try {
      final response = await http.get(Uri.parse(bd!.url!));

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = jsonDecode(response.body);

        // Aqui verificamos a estrutura dos dados e fazemos a conversão necessária
        List<dynamic> reportsData = responseData['relatorios'];
        List<dynamic> fetchedReports = reportsData.map((item) {
          print(item);
          // Verifique como os dados estão vindo e ajuste o mapeamento
          return {
            'name': item['atletum']['nome'] ?? 'Nome não disponível',
            'date': item['data'] ?? 'Data não disponível',
            'id': item['id_relatorio'].toString(),
          };
        }).toList();

        setState(() {
          reports = fetchedReports;  // Atualiza a lista de relatórios com os dados da API
        });
      } else {
        // Caso a resposta da API não seja 200
        print('Erro ao carregar os relatórios. Status code: ${response.statusCode}');
      }
    } catch (e) {
      // Erro na requisição
      print('Erro na requisição: $e');
    }
  }
@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text(
          'Relatórios',
          style: TextStyle(color: Colors.white, fontSize: 24),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ElevatedButton.icon(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => RelatorioScreen()),
                );
              },
              icon: const Icon(Icons.add, color: Colors.black),
              label: const Text(
                'Novo relatório',
                style: TextStyle(color: Colors.black),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.yellow[700],
                minimumSize: const Size(double.infinity, 50),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              'Relatórios enviados',
              style: TextStyle(color: Colors.white, fontSize: 18),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: reports.isEmpty
                  ? Center(child: CircularProgressIndicator())  // Exibe um loading enquanto os relatórios não são carregados
                  : ListView.builder(
                      itemCount: reports.length,
                      itemBuilder: (context, index) {
                        final report = reports[index];
                        return Padding(
                          padding: const EdgeInsets.symmetric(vertical: 4.0),
                          child: Container(
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: Colors.grey[850],
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  report['name']!,
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Row(
                                  children: [
                                    Text(
                                      report['id']!,
                                      style: const TextStyle(color: Colors.white54),
                                    ),
                                    const SizedBox(width: 8),
                                    const Icon(Icons.circle, color: Colors.yellow, size: 5),
                                    const SizedBox(width: 8),
                                    Text(
                                      report['date']!,
                                      style: const TextStyle(color: Colors.white54),
                                    ),
                                  ],
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