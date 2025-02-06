import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flag/flag.dart';
import 'package:http/http.dart' as http;

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

  // --------------------------
  // BUSCAR ATLETAS DO BACKEND
  // --------------------------
  Future<void> _fetchJogadores() async {
    setState(() {
      isLoading = true;
      errorMsg = null;
    });

    try {
      final url =
          Uri.parse('http://localhost:8080/atleta/listar?size=50&page=1');
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final body = json.decode(response.body);

        if (body['success'] == true) {
          final data = body['data'] as List<dynamic>;

          final List<Map<String, dynamic>> listaConvertida =
              data.map((jsonAtleta) {
            // 1) Nacionalidade: Pega a primeira (ou "PT" por default)
            String paisCode = 'PT';
            if (jsonAtleta['nacionalidades'] != null &&
                (jsonAtleta['nacionalidades'] as List).isNotEmpty) {
              final firstNat = jsonAtleta['nacionalidades'][0];
              // Se seu BD tiver "abreviatura" ou outro campo:
              paisCode = (firstNat['abreviatura'] ?? 'PT').toUpperCase();
            }

            // 2) Calcular idade a partir de datanascimento (yyyy-mm-dd)
            int idade = 0;
            if (jsonAtleta['datanascimento'] != null) {
              idade = _calcularIdade(jsonAtleta['datanascimento']);
            }

            // 3) Determinar "estrelas" a partir de ratingfinal ou ratinggeral
            //    ex.: se ratingfinal for 3.7, vira 4 estrelas
            double ratingDouble = 0.0;

            // Se ratingfinal vier como double (3.5), parse para double e arredonda depois
            if (jsonAtleta['ratingfinal'] != null) {
              ratingDouble =
                  double.tryParse(jsonAtleta['ratingfinal'].toString()) ?? 0.0;
            } else if (jsonAtleta['ratinggeral'] != null) {
              ratingDouble =
                  double.tryParse(jsonAtleta['ratinggeral'].toString()) ?? 0.0;
            }

            // Arredonda para inteiro
            int estrelas = ratingDouble.round();

            // Garante que não passe de 5, se for seu caso
            if (estrelas > 5) estrelas = 5;
            if (estrelas < 0) estrelas = 0;

            return {
              'id': jsonAtleta['id_atleta'],
              'nome': jsonAtleta['nome'] ?? 'Sem Nome',
              'posicao': 'PL', // Aqui é fixo ou você puxa de outro lugar
              'idade': idade,
              'paisCode': paisCode,
              'estrelas': estrelas,
            };
          }).toList();

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

  // Função para converter "2005-01-01" em idade (aproximada)
  int _calcularIdade(String dataNascimento) {
    try {
      final partes = dataNascimento.split('-'); // [yyyy, mm, dd]
      final ano = int.parse(partes[0]);
      final mes = int.parse(partes[1]);
      final dia = int.parse(partes[2]);

      final hoje = DateTime.now();
      int idade = hoje.year - ano;

      // Ajuste se não fez aniversário ainda neste ano
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
                        print('Filtros aplicados: $filtrosSelecionados');
                        // Se precisar aplicar filtros no backend, chame _fetchJogadores() aqui
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
            else if (errorMsg != null)
              // Se deu erro, exibe mensagem
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
              // Lista dos jogadores
              Expanded(
                child: ListView.builder(
                  itemCount: jogadores.length,
                  itemBuilder: (context, index) {
                    final jogador = jogadores[index];
                    final nome = jogador['nome'];
                    final posicao = jogador['posicao'];
                    final idade = jogador['idade'];
                    final paisCode = jogador['paisCode'];
                    final estrelas = jogador['estrelas'];

                    // Filtro por nome
                    if (searchQuery.isNotEmpty &&
                        !nome
                            .toLowerCase()
                            .contains(searchQuery.toLowerCase())) {
                      return Container();
                    }

                    return Card(
                      elevation: 2,
                      color: const Color.fromARGB(255, 35, 35, 35),
                      margin: const EdgeInsets.symmetric(
                          vertical: 4.0, horizontal: 0.0),
                      child: ListTile(
                        leading: Flag.fromString(
                          paisCode, // ex: "PT", "FR", ...
                          width: 30,
                          height: 30,
                        ),
                        title: GestureDetector(
                          onTap: () {
                            if (nome == 'Francisco Machado') {
                              Navigator.pushNamed(context, '/jogador');
                            } else {
                              // Exemplo: vai para /jogador com o ID do atleta
                              // Navigator.pushNamed(
                              //   context,
                              //   '/jogador',
                              //   arguments: jogador['id'],
                              // );
                            }
                          },
                          child: Text(
                            nome,
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
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
