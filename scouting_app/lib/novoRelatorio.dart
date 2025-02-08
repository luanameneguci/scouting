import 'package:flutter/material.dart';
import 'package:scouting_app/relatorios.dart';
import 'package:scouting_app/novoJogador.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> criarRelatorio({
  required int idUtilizador,
  required int idJogo,
  required int idAtleta,
  required int tecnica,
  required int velocidade,
  required int atitudeCompetitiva,
  required int inteligencia,
  required String altura,
  required String morfologia,
  required String apontamentos,
}) async {
  final url = Uri.parse("http://localhost:8080/relatorio/criar");

  try {
    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "id_utilizador": idUtilizador,
        "id_jogo": idJogo,
        "id_atleta": idAtleta,
        "tecnica": tecnica,
        "velocidade": velocidade,
        "atitudecompetitiva": atitudeCompetitiva,
        "inteligencia": inteligencia,
        "altura": altura,
        "morfologia": morfologia,
        "apontamentos": apontamentos,
      }),
    );

    if (response.statusCode == 200) {
      print("✅ Relatório criado com sucesso!");
    } else {
      print("❌ Erro ao criar relatório: ${response.body}");
    }
  } catch (error) {
    print("❌ Erro na requisição: $error");
  }
}

Future<List<Map<String, dynamic>>> fetchEscaloes() async {
  final url = Uri.parse("http://localhost:8080/escalao/listar");

  try {
    final response = await http.get(url);

    if (response.statusCode == 200) {
      List<dynamic> data = jsonDecode(response.body);
      return data.map((e) => {"id": e["id_escalao"], "nome": e["nome"]}).toList();
    } else {
      print("❌ Erro ao buscar escalões: ${response.body}");
      return [];
    }
  } catch (error) {
    print("❌ Erro na requisição: $error");
    return [];
  }
}

Future<List<Map<String, dynamic>>> fetchAtletas() async {
  final url = Uri.parse("http://localhost:8080/atleta/listar");

  try {
    final response = await http.get(url);

    if (response.statusCode == 200) {
      List<dynamic> data = jsonDecode(response.body);
      print("Atletas retornados: $data");
      return data.map((e) => {"id": e["id_atleta"], "nome": e["nome"]}).toList();
    } else {
      print("❌ Erro ao buscar atletas: ${response.body}");
      return [];
    }
  } catch (error) {
    print("❌ Erro na requisição: $error");
    return [];
  }
}

Future<List<Map<String, dynamic>>> fetchClubes() async {
  final url = Uri.parse("http://localhost:8080/clube/listar");

  try {
    final response = await http.get(url);

    if (response.statusCode == 200) {
      List<dynamic> data = jsonDecode(response.body);
      print("Clubes retornados: $data");
      return data.map((e) => {"id": e["id_clube"], "nome": e["nome"]}).toList();
    } else {
      print("❌ Erro ao buscar clubes: ${response.body}");
      return [];
    }
  } catch (error) {
    print("❌ Erro na requisição: $error");
    return [];
  }
}

Future<List<Map<String, dynamic>>> fetchJogos(int idEscalao) async {
  final url = Uri.parse("http://localhost:8080/jogo/listarPorEscalao/$idEscalao");

  try {
    final response = await http.get(url);

    if (response.statusCode == 200) {
      List<dynamic> data = jsonDecode(response.body);
      print("Jogos retornados: $data");
      return data.map((e) => {"id": e["id_jogo"], "data": e["dataJogo"]}).toList();
    } else {
      print("❌ Erro ao buscar jogos: ${response.body}");
      return [];
    }
  } catch (error) {
    print("❌ Erro na requisição: $error");
    return [];
  }
}

class RelatorioScreen extends StatefulWidget {
  final Map<String, dynamic>? atletaData;

  RelatorioScreen({this.atletaData});

  @override
  _RelatorioScreenState createState() => _RelatorioScreenState();
}

class _RelatorioScreenState extends State<RelatorioScreen> {
  String? temporaryEscalao;
  String? selectedEscalao;
  String? selectedAtleta;
  String? selectedClube;
  String? selectedJogo;

  List<Map<String, dynamic>> atletasList = [];
  List<Map<String, dynamic>> clubesList = [];
  List<Map<String, dynamic>> jogosList = [];
  List<Map<String, dynamic>> escaloesList = []; // Adicionando a lista de escalões

  @override
  void initState() {
    super.initState();

    if (widget.atletaData != null) {
      print("Atleta Data: ${widget.atletaData}");
      setState(() {
        selectedAtleta = widget.atletaData!['nome'];
        selectedEscalao = widget.atletaData!['escalao'];
        selectedClube = widget.atletaData!['clube'];
      });
    }

    // Carregar dados
    loadData();
  }

  Future<void> loadData() async {
    try {
      final fetchedAtletas = await fetchAtletas();
      print("Atletas buscados: $fetchedAtletas");
      setState(() {
        atletasList = fetchedAtletas;
      });

      final fetchedClubes = await fetchClubes();
      print("Clubes buscados: $fetchedClubes");
      setState(() {
        clubesList = fetchedClubes;
      });

      final fetchedEscaloes = await fetchEscaloes();
      print("Escalões buscados: $fetchedEscaloes");
      setState(() {
        escaloesList = fetchedEscaloes; // Armazenando os escalões
      });
    } catch (error) {
      print("❌ Erro ao carregar dados: $error");
    }
  }

  TextEditingController searchAtletaController = TextEditingController();
  TextEditingController searchClubeController = TextEditingController();
  TextEditingController searchJogoController = TextEditingController();
  int tecnica = 0;
  int velocidade = 0;
  int atitudeCompetitiva = 0;
  int inteligencia = 0;
  String? altura;
  String? morfologia;
  bool isEscalaoDropdownOpen = false;
  bool isAtletaDropdownOpen = false;
  bool isClubeDropdownOpen = false;
  bool isJogosDropdownOpen = false;

  @override
  void dispose() {
    searchAtletaController.dispose();
    searchClubeController.dispose();
    searchJogoController.dispose();
    super.dispose();
  }

  Widget _buildSearchBar(TextEditingController controller, String hint, Function(String) onChanged) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      child: TextField(
        controller: controller,
        style: TextStyle(color: Colors.white),
        decoration: InputDecoration(
          hintText: hint,
          hintStyle: TextStyle(color: Colors.white54),
          prefixIcon: Icon(Icons.search, color: Colors.white54),
          filled: true,
          fillColor: Colors.black45,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: BorderSide.none,
          ),
          contentPadding: EdgeInsets.symmetric(vertical: 8),
        ),
        onChanged: onChanged,
      ),
    );
  }

  String _truncateText(String text, {int maxLength = 10}) {
    return text.length > maxLength ? '${text.substring(0, maxLength)}...' : text;
  }

  bool _isFormValid() {
    return selectedEscalao != null &&
        selectedAtleta != null &&
        selectedClube != null &&
        selectedJogo != null &&
        tecnica > 0 &&
        velocidade > 0 &&
        atitudeCompetitiva > 0 &&
        inteligencia > 0 &&
        altura != null &&
        morfologia != null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 23, 23, 23),
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Text("Novo Relatório", style: TextStyle(color: Colors.white)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              decoration: BoxDecoration(
                color: Colors.grey[900],
                borderRadius: BorderRadius.circular(8),
              ),
              padding: const EdgeInsets.all(8.0),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // Escalão Dropdown Button
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            isEscalaoDropdownOpen = true;
                            isJogosDropdownOpen = false;
                            isAtletaDropdownOpen = false;
                            isClubeDropdownOpen = false;
                          });
                        },
                        child: _buildDropdownButton(
                          _truncateText(selectedEscalao ?? "Escalão", maxLength: 8),
                          width: 100,
                        ),
                      ),
                      // Atleta Dropdown Button
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            searchAtletaController.clear();
                            isAtletaDropdownOpen = true;
                            isEscalaoDropdownOpen = false;
                            isJogosDropdownOpen = false;
                            isClubeDropdownOpen = false;
                          });
                        },
                        child: _buildDropdownButton(
                          _truncateText(selectedAtleta ?? "Atleta", maxLength: 8),
                          width: 100,
                        ),
                      ),
                      // Clube Dropdown Button
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            searchClubeController.clear();
                            isClubeDropdownOpen = true;
                            isEscalaoDropdownOpen = false;
                            isJogosDropdownOpen = false;
                            isAtletaDropdownOpen = false;
                          });
                        },
                        child: _buildDropdownButton(
                          _truncateText(selectedClube ?? "Clube", maxLength: 8),
                          width: 100,
                        ),
                      ),
                    ],
                  ),
                  // Escalão Dropdown Content
                  if (isEscalaoDropdownOpen)
                    Container(
                      margin: EdgeInsets.only(top: 8),
                      padding: const EdgeInsets.all(8.0),
                      decoration: BoxDecoration(
                        color: Colors.grey[900],
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Wrap(
                        spacing: 8.0,
                        runSpacing: 8.0,
                        children: [
                          for (var escalao in escaloesList) // Acesse a lista de escalões
                            GestureDetector(
                              onTap: () {
                                setState(() {
                                  temporaryEscalao = escalao['id']; // Acesse o ID corretamente
                                  fetchJogos(int.parse(temporaryEscalao!)).then((fetchedJogos) {
                                    setState(() {
                                      jogosList = fetchedJogos;
                                    });
                                  });
                                  isEscalaoDropdownOpen = false;
                                  isJogosDropdownOpen = true;
                                  selectedJogo = null; // Limpa a seleção do jogo anterior.
                                });
                              },
                              child: Container(
                                width: 100,
                                padding: EdgeInsets.symmetric(horizontal: 8, vertical: 12),
                                decoration: BoxDecoration(
                                  color: Colors.black,
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Center(
                                  child: Text(
                                    escalao['nome'], // Acesse o nome do escalão
                                    style: TextStyle(color: Colors.white, fontSize: 14),
                                    textAlign: TextAlign.center,
                                  ),
                                ),
                              ),
                            ),
                        ],
                      ),
                    ),
                  // Jogos Dropdown Content
                  if (isJogosDropdownOpen)
                    Container(
                      margin: EdgeInsets.only(top: 8),
                      padding: const EdgeInsets.all(8.0),
                      decoration: BoxDecoration(
                        color: Colors.grey[900],
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Column(
                        children: [
                          _buildSearchBar(searchJogoController, 'Pesquisar Jogo', (value) {
                            setState(() {});
                          }),
                          Container(
                            height: 200,
                            child: ListView(
                              children: jogosList.isNotEmpty
                                  ? jogosList
                                      .where((jogo) => jogo['data'].toLowerCase().contains(searchJogoController.text.toLowerCase()))
                                      .take(5)
                                      .map((jogo) {
                                        return GestureDetector(
                                          onTap: () {
                                            setState(() {
                                              selectedJogo = jogo['data'];
                                              isJogosDropdownOpen = false;
                                            });
                                          },
                                          child: Container(
                                            width: double.infinity,
                                            padding: EdgeInsets.symmetric(vertical: 12, horizontal: 8),
                                            margin: EdgeInsets.only(top: 4),
                                            decoration: BoxDecoration(
                                              color: Colors.black,
                                              borderRadius: BorderRadius.circular(8),
                                            ),
                                            child: Text(
                                              jogo['data'],
                                              style: TextStyle(color: Colors.white),
                                              textAlign: TextAlign.center,
                                            ),
                                          ),
                                        );
                                      }).toList()
                                  : [Text("Nenhum jogo encontrado", style: TextStyle(color: Colors.white))],
                            ),
                          ),
                        ],
                      ),
                    ),
                  // Atleta Dropdown Content
                  if (isAtletaDropdownOpen)
                    Container(
                      margin: EdgeInsets.only(top: 8),
                      padding: const EdgeInsets.all(8.0),
                      decoration: BoxDecoration(
                        color: Colors.grey[900],
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Column(
                        children: [
                          _buildSearchBar(searchAtletaController, 'Pesquisar Atleta', (value) {
                            setState(() {});
                          }),
                          Container(
                            height: 200,
                            child: ListView(
                              children: atletasList.isNotEmpty
                                  ? atletasList
                                      .where((atleta) => atleta['nome'].toLowerCase().contains(searchAtletaController.text.toLowerCase()))
                                      .take(5)
                                      .map((atleta) {
                                        return GestureDetector(
                                          onTap: () {
                                            setState(() {
                                              selectedAtleta = atleta['nome'];
                                              isAtletaDropdownOpen = false;
                                            });
                                          },
                                          child: Container(
                                            width: double.infinity,
                                            padding: EdgeInsets.symmetric(vertical: 12, horizontal: 8),
                                            margin: EdgeInsets.only(top: 4),
                                            decoration: BoxDecoration(
                                              color: Colors.black,
                                              borderRadius: BorderRadius.circular(8),
                                            ),
                                            child: Text(
                                              atleta['nome'],
                                              style: TextStyle(color: Colors.white),
                                              textAlign: TextAlign.center,
                                            ),
                                          ),
                                        );
                                      }).toList()
                                  : [Text("Nenhum atleta encontrado", style: TextStyle(color: Colors.white))],
                            ),
                          ),
                          Divider(color: Colors.grey),
                          GestureDetector(
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (context) => NovoJogadorScreen()),
                              );
                            },
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.add, color: Colors.amber),
                                SizedBox(width: 8),
                                Text(
                                  "Criar jogador",
                                  style: TextStyle(color: Colors.amber),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  // Clube Dropdown Content
                  if (isClubeDropdownOpen)
                    Container(
                      margin: EdgeInsets.only(top: 8),
                      padding: const EdgeInsets.all(8.0),
                      decoration: BoxDecoration(
                        color: Colors.grey[900],
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Column(
                        children: [
                          _buildSearchBar(searchClubeController, 'Pesquisar Clube', (value) {
                            setState(() {});
                          }),
                          Container(
                            height: 200,
                            child: ListView(
                              children: clubesList.isNotEmpty
                                  ? clubesList
                                      .where((clube) => clube['nome'].toLowerCase().contains(searchClubeController.text.toLowerCase()))
                                      .take(5)
                                      .map((clube) {
                                        return GestureDetector(
                                          onTap: () {
                                            setState(() {
                                              selectedClube = clube['nome'];
                                              isClubeDropdownOpen = false;
                                            });
                                          },
                                          child: Container(
                                            width: double.infinity,
                                            padding: EdgeInsets.symmetric(vertical: 12, horizontal: 8),
                                            margin: EdgeInsets.only(top: 4),
                                            decoration: BoxDecoration(
                                              color: Colors.black,
                                              borderRadius: BorderRadius.circular(8),
                                            ),
                                            child: Text(
                                              clube['nome'],
                                              style: TextStyle(color: Colors.white),
                                              textAlign: TextAlign.center,
                                            ),
                                          ),
                                        );
                                      }).toList()
                                  : [Text("Nenhum clube encontrado", style: TextStyle(color: Colors.white))],
                            ),
                          ),
                        ],
                      ),
                    ),
                ],
              ),
            ),
            // Rating Rows
            _buildRatingRow("Técnica", tecnica, (val) => setState(() => tecnica = val)),
            _buildRatingRow("Velocidade", velocidade, (val) => setState(() => velocidade = val)),
            _buildRatingRow("Atitude Competitiva", atitudeCompetitiva, (val) => setState(() => atitudeCompetitiva = val)),
            _buildRatingRow("Inteligência", inteligencia, (val) => setState(() => inteligencia = val)),
            SizedBox(height: 16),
            // Option Rows
            _buildOptionRow("Altura", ["Baixo", "Médio", "Alto"], altura, (val) => setState(() => altura = val)),
            _buildOptionRow("Morfologia", ["Ectomorfo", "Mesomorfo", "Endomorfo"], morfologia, (val) => setState(() => morfologia = val)),
            SizedBox(height: 16),
            // Notes TextField
            TextField(
              maxLines: 4,
              decoration: InputDecoration(
                hintText: "Notas",
                hintStyle: TextStyle(color: Colors.white54),
                filled: true,
                fillColor: Colors.grey[900],
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                  borderSide: BorderSide.none,
                ),
              ),
              style: TextStyle(color: Colors.white),
            ),
            SizedBox(height: 16),
            // Confirm Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () async {
                  if (_isFormValid()) {
                    await criarRelatorio(
                      idUtilizador: 1, // Ajuste com o ID do utilizador autenticado
                      idJogo: 2, // Ajuste conforme o jogo selecionado
                      idAtleta: 3, // Ajuste conforme o atleta selecionado
                      tecnica: tecnica,
                      velocidade: velocidade,
                      atitudeCompetitiva: atitudeCompetitiva,
                      inteligencia: inteligencia,
                      altura: altura!,
                      morfologia: morfologia!,
                      apontamentos: "Anotações sobre o jogador",
                    );
                    Navigator.pop(context); // Voltar para a tela anterior após o envio
                  } else {
                    print("⚠️ Formulário incompleto!");
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.amber,
                  padding: EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: Text(
                  "Confirmar",
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDropdownButton(String text, {double width = 120}) {
    return Container(
      width: width,
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.black,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            text,
            style: TextStyle(color: Colors.white),
            overflow: TextOverflow.ellipsis,
          ),
          Icon(
            Icons.arrow_drop_down,
            color: Colors.white,
          ),
        ],
      ),
    );
  }

  Widget _buildRatingRow(String title, int rating, Function(int) onChanged) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(title, style: TextStyle(color: Colors.white)),
              Text("$rating", style: TextStyle(color: Colors.white)),
            ],
          ),
          SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(4, (index) {
              return GestureDetector(
                onTap: () => onChanged(index + 1),
                child: Container(
                  margin: EdgeInsets.symmetric(horizontal: 15),
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: index < rating ? Colors.amber : Colors.grey,
                      width: 2,
                    ),
                  ),
                  child: Center(
                    child: Container(
                      width: 12,
                      height: 12,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: index < rating ? Colors.amber : Colors.transparent,
                      ),
                    ),
                  ),
                ),
              );
            }),
          ),
        ],
      ),
    );
  }

  Widget _buildOptionRow(String title, List<String> options, String? selectedOption, Function(String) onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: TextStyle(color: Colors.white)),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: options.map((option) {
            return Column(
              children: [
                GestureDetector(
                  onTap: () => onChanged(option),
                  child: Container(
                    width: 24,
                    height: 24,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: selectedOption == option ? Colors.amber : Colors.grey,
                        width: 2,
                      ),
                    ),
                    child: Center(
                      child: Container(
                        width: 12,
                        height: 12,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: selectedOption == option ? Colors.amber : Colors.transparent,
                        ),
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  option,
                  style: TextStyle(color: Colors.white),
                ),
              ],
            );
          }).toList(),
        ),
      ],
    );
  }

  bool _isFormValidado() {
    return selectedEscalao != null &&
           selectedAtleta != null &&
           selectedClube != null &&
           selectedJogo != null;
  }
}