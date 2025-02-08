import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flag/flag.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'jogador_page.dart'; 

class JogadoresPage extends StatefulWidget {
  const JogadoresPage({Key? key}) : super(key: key);

  @override
  _JogadoresPageState createState() => _JogadoresPageState();
}

class _JogadoresPageState extends State<JogadoresPage> {
  List<Map<String, dynamic>> jogadores = [];

  String searchQuery = '';
  bool isLoading = false;
  String? errorMsg;

  @override
  void initState() {
    super.initState();
    _fetchJogadores();
  }

  Future<void> _fetchJogadores() async {
    setState(() {
      isLoading = true;
      errorMsg = null;
    });

    try {
      final url = Uri.parse(dotenv.env['API_URL']! + '/atleta/listar?size=50&page=1');
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final body = json.decode(response.body);

        if (body['success'] == true) {
          final data = body['data'] as List<dynamic>;
          final listaConvertida = _converterLista(data);
          setState(() {
            jogadores = listaConvertida;
          });
        } else {
          setState(() {
            errorMsg = 'Erro do servidor: ${body['message']}';
          });
        }
      } else {
        setState(() {
          errorMsg = 'Erro HTTP ${response.statusCode}';
        });
      }
    } catch (e) {
      setState(() {
        errorMsg = 'Erro ao conectar: $e';
      });
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  List<Map<String, dynamic>> _converterLista(List<dynamic> data) {
    return data.map<Map<String, dynamic>>((jsonAtleta) {
      String paisCode = 'PT';
      final nats = jsonAtleta['nacionalidades'] as List?;
      if (nats != null && nats.isNotEmpty) {
        paisCode = (nats[0]['abreviatura'] ?? 'PT').toUpperCase();
      }

      int idade = 0;
      if (jsonAtleta['datanascimento'] != null) {
        idade = _calcularIdade(jsonAtleta['datanascimento']);
      }

      double ratingDouble = 0.0;
      if (jsonAtleta['ratingfinal'] != null) {
        ratingDouble = double.tryParse(jsonAtleta['ratingfinal'].toString()) ?? 0.0;
      } else if (jsonAtleta['ratinggeral'] != null) {
        ratingDouble = double.tryParse(jsonAtleta['ratinggeral'].toString()) ?? 0.0;
      }

      int estrelas = ratingDouble.floor();
      if (estrelas > 5) estrelas = 5;
      if (estrelas < 0) estrelas = 0;

      String posicao = 'Sem posição';
      final posicoes = jsonAtleta['posicoes'] as List?;
      if (posicoes != null && posicoes.isNotEmpty) {
        posicao = posicoes.map((p) => p['designacao'] as String? ?? 'Sem posição').join(', ');
      }

      return {
        'id': jsonAtleta['id_atleta'],
        'nome': jsonAtleta['nome'] ?? 'Sem Nome',
        'posicao': posicao,
        'idade': idade,
        'paisCode': paisCode,
        'estrelas': estrelas,
      };
    }).toList();
  }

  int _calcularIdade(String dataNascimento) {
    try {
      final partes = dataNascimento.split('-');
      final ano = int.parse(partes[0]);
      final mes = int.parse(partes[1]);
      final dia = int.parse(partes[2]);

      final hoje = DateTime.now();
      int idade = hoje.year - ano;
      if (hoje.month < mes || (hoje.month == mes && hoje.day < dia)) {
        idade--;
      }
      return idade;
    } catch (e) {
      return 0;
    }
  }

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
                suffixIcon: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4.0),
                  child: IconButton(
                    icon: const Icon(Icons.tune, color: Colors.grey),
                    onPressed: () async {
                      final filtrosSelecionados = await Navigator.pushNamed(
                        context,
                        '/jogadores_filtros',
                      );

                      if (filtrosSelecionados != null) {
                        await _fetchJogadoresFiltrados(
                          filtrosSelecionados as Map<String, dynamic>,
                        );
                      }
                    },
                  ),
                ),
              ),
              onChanged: (value) {
                setState(() {
                  searchQuery = value;
                });
              },
            ),
            if (isLoading)
              const Expanded(child: Center(child: CircularProgressIndicator()))
            else if (errorMsg != null)
              Expanded(
                child: Center(
                  child: Text(
                    errorMsg!,
                    style: const TextStyle(color: Colors.red),
                    textAlign: TextAlign.center,
                  ),
                ),
              )
            else
              Expanded(
                child: jogadores.isEmpty
                    ? const Center(
                        child: Text(
                          "Nenhum atleta encontrado com esses filtros.",
                          style: TextStyle(color: Colors.grey),
                        ),
                      )
                    : ListView.builder(
                        itemCount: jogadores.length,
                        itemBuilder: (context, index) {
                          final jogador = jogadores[index];
                          final nome = jogador['nome'];
                          final posicao = jogador['posicao'];
                          final idade = jogador['idade'];
                          final paisCode = jogador['paisCode'];
                          final estrelas = jogador['estrelas'];

                          if (searchQuery.isNotEmpty &&
                              !nome.toLowerCase().contains(searchQuery.toLowerCase())) {
                            return Container();
                          }

                          return Card(
                            elevation: 2,
                            color: const Color.fromARGB(255, 35, 35, 35),
                            margin: const EdgeInsets.symmetric(vertical: 4.0, horizontal: 0.0),
                            child: ListTile(
                              leading: Flag.fromString(
                                paisCode,
                                width: 30,
                                height: 30,
                              ),
                              title: Text(
                                nome,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              subtitle: Text(
                                '$posicao | $idade anos',
                                style: const TextStyle(color: Colors.grey),
                              ),
                              trailing: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: List.generate(
                                  estrelas,
                                  (_) => const Icon(
                                    Icons.star,
                                    color: Colors.amber,
                                    size: 20.0,
                                  ),
                                ),
                              ),
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => JogadorPage(jogadorId: jogador['id']),
                                  ),
                                );
                              },
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
