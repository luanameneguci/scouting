import 'package:flutter/material.dart';

class RelatorioScreen extends StatefulWidget {
  @override
  _RelatorioScreenState createState() => _RelatorioScreenState();
}

class _RelatorioScreenState extends State<RelatorioScreen> {
  String? selectedEscalao;
  String? selectedAtleta;
  String? selectedClube;
  String? selectedJogo;
  TextEditingController searchAtletaController = TextEditingController();
  TextEditingController searchClubeController = TextEditingController();
  TextEditingController searchJogoController = TextEditingController();
  int tecnica = 1;
  int velocidade = 3;
  int atitudeCompetitiva = 4;
  int inteligencia = 2;
  String? altura = "Baixo";
  String? morfologia = "Mesomorfo";
  bool isEscalaoDropdownOpen = false;
  bool isAtletaDropdownOpen = false;
  bool isClubeDropdownOpen = false;
  bool isJogosDropdownOpen = false;

  final Map<String, List<String>> jogosPorEscalao = {
    "Profissional": ["Porto x Benfica 19:30", "Sporting x Braga 20:30"],
    "Sub 23": ["Time1 x Time2 17:00", "Time3 x Time4 18:30"],
    "Sub 19": ["Time5 x Time6 16:00", "Time7 x Time8 17:30"],
    "Sub 16": ["Time9 x Time10 15:00"],
    "Sub 14": ["Time11 x Time12 14:00"],
    "Sub 12": ["Time13 x Time14 13:00"],
    "Sub 11": ["Time15 x Time16 12:00"],
    "Sub 10": ["Time17 x Time18 11:00"]
  };

  List<String> atletas = ["Fernando Machado", "Carlos Silva", "João Santos", "André Pereira", "Miguel Oliveira", "Rui Costa", "Pedro Santos", "Luís Fernandes"];
  List<String> clubes = ["Clube 1", "Clube 2", "Clube 3", "Clube 4", "Clube 5", "Clube 6", "Clube 7", "Clube 8"];
  List<String> jogos = [];

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
                          for (var escalao in jogosPorEscalao.keys)
                            GestureDetector(
                              onTap: () {
                                setState(() {
                                  selectedEscalao = escalao;
                                  jogos = jogosPorEscalao[escalao] ?? [];
                                  isEscalaoDropdownOpen = false;
                                  isJogosDropdownOpen = true;
                                  selectedJogo = null;
                                  searchJogoController.clear();
                                });
                              },
                              child: Container(
                                width: 100,
                                padding: EdgeInsets.symmetric(
                                    horizontal: 8, vertical: 12),
                                decoration: BoxDecoration(
                                  color: Colors.black,
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Center(
                                  child: Text(
                                    escalao,
                                    style: TextStyle(
                                        color: Colors.white, fontSize: 14),
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
                          _buildSearchBar(
                              searchJogoController, 'Pesquisar Jogo', (value) {
                            setState(() {});
                          }),
                          Container(
                            height: 200,
                            child: ListView(
                              children: jogos
                                  .where((jogo) => jogo
                                      .toLowerCase()
                                      .contains(searchJogoController.text.toLowerCase()))
                                  .take(5)
                                  .map((jogo) {
                                return GestureDetector(
                                  onTap: () {
                                    setState(() {
                                      selectedJogo = jogo;
                                      isJogosDropdownOpen = false;
                                    });
                                  },
                                  child: Container(
                                    width: double.infinity,
                                    padding: EdgeInsets.symmetric(
                                        vertical: 12, horizontal: 8),
                                    margin: EdgeInsets.only(top: 4),
                                    decoration: BoxDecoration(
                                      color: Colors.black,
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: Text(
                                      jogo,
                                      style: TextStyle(color: Colors.white),
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                );
                              }).toList(),
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
                          _buildSearchBar(
                              searchAtletaController, 'Pesquisar Atleta', (value) {
                            setState(() {});
                          }),
                          Container(
                            height: 200,
                            child: ListView(
                              children: [
                                ...atletas
                                    .where((atleta) => atleta
                                        .toLowerCase()
                                        .contains(searchAtletaController.text.toLowerCase()))
                                    .take(5)
                                    .map((atleta) {
                                  return GestureDetector(
                                    onTap: () {
                                      setState(() {
                                        selectedAtleta = atleta;
                                        isAtletaDropdownOpen = false;
                                      });
                                    },
                                    child: Container(
                                      width: double.infinity,
                                      padding: EdgeInsets.symmetric(
                                          vertical: 12, horizontal: 8),
                                      margin: EdgeInsets.only(top: 4),
                                      decoration: BoxDecoration(
                                        color: Colors.black,
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: Text(
                                        atleta,
                                        style: TextStyle(color: Colors.white),
                                        textAlign: TextAlign.center,
                                      ),
                                    ),
                                  );
                                }).toList(),
                                Divider(color: Colors.grey),
                                GestureDetector(
                                  onTap: () {
                                    // Lógica para criar novo jogador
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
                          _buildSearchBar(
                              searchClubeController, 'Pesquisar Clube', (value) {
                            setState(() {});
                          }),
                          Container(
                            height: 200,
                            child: ListView(
                              children: clubes
                                  .where((clube) => clube
                                      .toLowerCase()
                                      .contains(searchClubeController.text.toLowerCase()))
                                  .take(5)
                                  .map((clube) {
                                return GestureDetector(
                                  onTap: () {
                                    setState(() {
                                      selectedClube = clube;
                                      isClubeDropdownOpen = false;
                                    });
                                  },
                                  child: Container(
                                    width: double.infinity,
                                    padding: EdgeInsets.symmetric(
                                        vertical: 12, horizontal: 8),
                                    margin: EdgeInsets.only(top: 4),
                                    decoration: BoxDecoration(
                                      color: Colors.black,
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: Text(
                                      clube,
                                      style: TextStyle(color: Colors.white),
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                );
                              }).toList(),
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
            _buildRatingRow(
                "Velocidade", velocidade, (val) => setState(() => velocidade = val)),
            _buildRatingRow("Atitude Competitiva", atitudeCompetitiva,
                (val) => setState(() => atitudeCompetitiva = val)),
            _buildRatingRow("Inteligência", inteligencia,
                (val) => setState(() => inteligencia = val)),
            SizedBox(height: 16),
            // Option Rows
            _buildOptionRow("Altura", ["Baixo", "Médio", "Alto"], altura,
                (val) => setState(() => altura = val)),
            _buildOptionRow("Morfologia", ["Ectomorfo", "Mesomorfo", "Endomorfo"],
                morfologia, (val) => setState(() => morfologia = val)),
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
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.amber,
                  padding: EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: Text(
                  "Confirmar",
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
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
}