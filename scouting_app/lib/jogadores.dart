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
    _fetchJogadores(); // carrega a lista inicial sem filtros
  }

  // ---------------------------------------------------------
  // 1) LISTAR ATLETAS (GET) - SEM FILTROS
  // ---------------------------------------------------------
  Future<void> _fetchJogadores() async {
    setState(() {
      isLoading = true;
      errorMsg = null;
    });

    try {
      final url =
          Uri.parse(dotenv.env['API_URL']! +'/atleta/listar?size=50&page=1');
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

  // ---------------------------------------------------------
  // 2) FILTRAR ATLETAS (POST) - COM FILTROS
  // ---------------------------------------------------------
  Future<void> _fetchJogadoresFiltrados(Map<String, dynamic> filtros) async {
    setState(() {
      isLoading = true;
      errorMsg = null;
    });

    try {
      final url =
          Uri.parse(dotenv.env['API_URL']! + '/atleta/filtrar?size=50&page=1');

      final body = {
        "filtros": _ajustarFiltrosParaBackend(filtros),
      };

      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode(body),
      );

      if (response.statusCode == 200) {
        final jsonBody = json.decode(response.body);
        if (jsonBody['success'] == true) {
          final data = jsonBody['atletas'] ?? [];
          final listaConvertida = _converterLista(data);
          setState(() {
            jogadores = listaConvertida;
          });
        } else {
          setState(() {
            errorMsg = 'Erro do servidor: ${jsonBody['message']}';
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

  // ---------------------------------------------------------
  // 3) CONVERTE LISTA DE ATLETAS (JSON) PARA MAP LOCAIS
  // ---------------------------------------------------------
  List<Map<String, dynamic>> _converterLista(List<dynamic> data) {
    return data.map<Map<String, dynamic>>((jsonAtleta) {
      // 1) Nacionalidade: pegar a primeira (ou usar outra lógica)
      String paisCode = 'PT';
      final nats = jsonAtleta['nacionalidades'] as List?;
      if (nats != null && nats.isNotEmpty) {
        paisCode = (nats[0]['abreviatura'] ?? 'PT').toUpperCase();
      }

      // 2) Calcular idade a partir de datanascimento (yyyy-mm-dd)
      int idade = 0;
      if (jsonAtleta['datanascimento'] != null) {
        idade = _calcularIdade(jsonAtleta['datanascimento']);
      }

      // 3) Determinar "estrelas" a partir de ratingfinal (ou ratinggeral)
      double ratingDouble = 0.0;
      if (jsonAtleta['ratingfinal'] != null) {
        ratingDouble =
            double.tryParse(jsonAtleta['ratingfinal'].toString()) ?? 0.0;
      } else if (jsonAtleta['ratinggeral'] != null) {
        ratingDouble =
            double.tryParse(jsonAtleta['ratinggeral'].toString()) ?? 0.0;
      }
      // Floor descarta decimais
      int estrelas = ratingDouble.floor();
      if (estrelas > 5) estrelas = 5;
      if (estrelas < 0) estrelas = 0;

      // 4) Extrair posições do array posicoes
      String posicao = 'Sem posição';
      final posicoes = jsonAtleta['posicoes'] as List?;
      if (posicoes != null && posicoes.isNotEmpty) {
        posicao = posicoes
            .map((p) => p['designacao'] as String? ?? 'Sem posição')
            .join(', ');
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

  // ---------------------------------------------------------
  // 4) AJUSTAR FILTROS DO FRONT PARA O BACK
  //    (Ex.: converter strings "2" -> int 2, etc.)
  // ---------------------------------------------------------
  Map<String, dynamic> _ajustarFiltrosParaBackend(
      Map<String, dynamic> filtros) {
    final output = <String, dynamic>{};

    // se quiser também incluir a busca por nome (searchQuery) no backend:
    if (searchQuery.isNotEmpty) {
      output['nome'] = searchQuery;
    }

    // POSIÇÃO
    if (filtros['posicaoId'] != null) {
      final pid = int.tryParse(filtros['posicaoId']);
      if (pid != null) output['posicao'] = pid;
    }

    // CLUBE
    if (filtros['clubeId'] != null) {
      final cid = int.tryParse(filtros['clubeId']);
      if (cid != null) output['clube'] = cid;
    }

    // ESCALÃO
    if (filtros['escalaoId'] != null) {
      final eid = int.tryParse(filtros['escalaoId']);
      if (eid != null) {
        // Ex.: se no back for EXACT "id_escalao"
        // ou se for "escalaoMin" e "escalaoMax"
        output['escalaoMin'] = eid;
        output['escalaoMax'] = eid;
      }
    }

    // RATING
    if (filtros['rating'] != null) {
      output['ratingMin'] = filtros['rating'];
    }

    // ANO
    if (filtros['anoNascimento'] != null) {
      final ano = filtros['anoNascimento'] as int;
      output['anoMin'] = ano;
      output['anoMax'] = ano;
    }

    return output;
  }

  // ---------------------------------------------------------
  // 5) CALCULA IDADE
  // ---------------------------------------------------------
  int _calcularIdade(String dataNascimento) {
    try {
      final partes = dataNascimento.split('-');
      final ano = int.parse(partes[0]);
      final mes = int.parse(partes[1]);
      final dia = int.parse(partes[2]);

      final hoje = DateTime.now();
      int idade = hoje.year - ano;
      // Ajuste se não fez aniversário ainda
      if (hoje.month < mes || (hoje.month == mes && hoje.day < dia)) {
        idade--;
      }
      return idade;
    } catch (e) {
      return 0;
    }
  }

  // ---------------------------------------------------------
  // BUILD
  // ---------------------------------------------------------
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
            // Campo de busca
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

            // Se estiver carregando, mostra um spinner
            if (isLoading)
              const Expanded(
                child: Center(child: CircularProgressIndicator()),
              )
            // Se deu erro, exibe mensagem
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
            // Se não há erro e não está carregando
            else
              Expanded(
                child: jogadores.isEmpty
                    // Se não achou nada, mostra msg
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

                          // Filtrar localmente (searchQuery)
                          if (searchQuery.isNotEmpty &&
                              !nome
                                  .toLowerCase()
                                  .contains(searchQuery.toLowerCase())) {
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