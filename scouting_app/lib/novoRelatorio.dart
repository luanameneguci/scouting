import 'package:flutter/material.dart';

class RelatorioScreen extends StatefulWidget {
  @override
  _RelatorioScreenState createState() => _RelatorioScreenState();
}

class _RelatorioScreenState extends State<RelatorioScreen> {
  String? selectedEscalao;
  String? selectedAtleta;
  String? selectedClube;
  String? jogoSelecionado;
  int tecnica = 1;
  int velocidade = 3;
  int atitudeCompetitiva = 4;
  int inteligencia = 2;
  String? altura = "Baixo";
  String? morfologia = "Mesomorfo";
  bool isEscalaoDropdownOpen = false;
  bool isAtletaDropdownOpen = false;

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

  List<String> atletas = ["Fernando Machado", "Carlos Silva", "João Santos"]; // Lista inicial de atletas

  List<String> jogos = []; // Lista de jogos do escalão selecionado

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
            // Barra de filtros
            Container(
              decoration: BoxDecoration(
                color: Colors.grey[900],
                borderRadius: BorderRadius.circular(8),
              ),
              
              padding: const EdgeInsets.all(8.0),
              child: Column(
                children: [
                  // Linha de filtros principais
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // Escalão
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          isEscalaoDropdownOpen = !isEscalaoDropdownOpen;
                          jogos = []; // Limpa os jogos ao abrir o dropdown
                        });
                      },
                      child: _buildDropdownButton(
                        selectedEscalao ?? "Escalão",
                        width: 100,
                      ),
                    ),
                     // Dropdown de Atletas
    Container(
      margin: EdgeInsets.only(top: 8),
      padding: EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.grey[900],
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          ...atletas.map((atleta) {
            return GestureDetector(
              onTap: () {
                setState(() {
                  selectedAtleta = atleta;
                  isAtletaDropdownOpen = false;
                });
              },
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 8.0),
                child: Text(
                  atleta,
                  style: TextStyle(color: Colors.white),
                ),
              ),
            );
          }).toList(),
          Divider(color: Colors.grey),
          GestureDetector(
            onTap: () {
              // Lógica para criar novo jogador
              // Adicione aqui a funcionalidade adicional se necessário
            },
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: Row(
                children: [
                  Icon(Icons.add, color: Colors.amber),
                  SizedBox(width: 8),
                  Text("Criar jogador", style: TextStyle(color: Colors.amber)),
                ],
              ),
            ),
          ),
        ],
      )
    );
  }
                      // Clube
                      _buildDropdown(
                        selectedClube,
                        "Clube",
                        ["Clube 1", "Clube 2"],
                        (value) {
                          setState(() => selectedClube = value);
                        },
                        width: 100,
                      ),
                    ]
                  ),
                 // Dropdown de Escalão ou Jogos
          if (isEscalaoDropdownOpen || jogos.isNotEmpty)
            Positioned(
              top: 80, // Ajusta esta posição para alinhar com a barra de filtros
              left: 16,
              right: 16,
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 8.0),
                decoration: BoxDecoration(
                  color: Colors.grey[900],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: jogos.isEmpty
                    ? Wrap(
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
                      )
                    : Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          for (var jogo in jogos)
                            GestureDetector(
                              onTap: () {
                                setState(() {
                                  jogoSelecionado = jogo;
                                  jogos = []; // Fecha o dropdown
                                });
                              },
                              child: Padding(
                                padding:
                                    const EdgeInsets.symmetric(vertical: 4.0),
                                child: Text(
                                  jogo,
                                  style: TextStyle(
                                    color: Colors.amber,
                                    fontSize: 16,
                                  ),
                                ),
                              ),
                            ),
                        ],
                      ),
              ),
            ),
        ],
      ),
    ),
            
            // Avaliações com número ao lado do título
            _buildRatingRow("Técnica", tecnica, (val) => setState(() => tecnica = val)),
            _buildRatingRow("Velocidade", velocidade, (val) => setState(() => velocidade = val)),
            _buildRatingRow("Atitude Competitiva", atitudeCompetitiva, (val) => setState(() => atitudeCompetitiva = val)),
            _buildRatingRow("Inteligência", inteligencia, (val) => setState(() => inteligencia = val)),

            // Altura e Morfologia
            SizedBox(height: 16),
            _buildOptionRow("Altura", ["Baixo", "Médio", "Alto"], altura, (val) => setState(() => altura = val)),
            _buildOptionRow("Morfologia", ["Ectomorfo", "Mesomorfo", "Endomorfo"], morfologia, (val) => setState(() => morfologia = val)),

            // Notas
            SizedBox(height: 16),
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

            // Botão Confirmar
            SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.amber,
                  padding: EdgeInsets.symmetric(vertical: 16),
                  textStyle: TextStyle(fontSize: 18),
                ),
                child: Text("Confirmar"),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Método para criar botão dropdown
  Widget _buildDropdownButton(String text, {double width = 120}) {
    return Container(
      width: width,
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.black,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        text.length > 15 ? "${text.substring(0, 15)}..." : text,
        style: TextStyle(color: Colors.white),
        textAlign: TextAlign.center,
      ),
    );
  }

   // Dropdown de Atletas com opção de criar novo jogador
  Widget _buildAtletaDropdown() {
    return Container(
      margin: EdgeInsets.only(top: 8),
      decoration: BoxDecoration(
        color: Colors.grey[900],
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          for (var atleta in atletas)
            GestureDetector(
              onTap: () {
                setState(() {
                  selectedAtleta = atleta;
                  isAtletaDropdownOpen = false;
                });
              },
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
                child: Text(
                  atleta,
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
          Divider(color: Colors.grey),
          GestureDetector(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
              child: Row(
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
          ),
        ],
      ),
    );
  }

  // Método para criar botões uniformes
  Widget _buildDropdownButton2(String text, {double width = 120}) {
    return Container(
      width: width,
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.black,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        text.length > 8 ? "${text.substring(0, 8)}..." : text,
        style: TextStyle(color: Colors.white),
        textAlign: TextAlign.center,
      ),
    );
  }

  // Método para dropdowns
  Widget _buildDropdown(
    String? selectedValue,
    String hint,
    List<String> options,
    Function(String?) onChanged, {
    double width = 120,
  }) {
    return DropdownButton<String>(
      value: selectedValue,
      hint: Text(hint, style: TextStyle(color: Colors.white)),
      dropdownColor: Colors.black,
      onChanged: onChanged,
      items: options.map((e) {
        return DropdownMenuItem(
          value: e,
          child: Text(
            e.length > 8 ? "${e.substring(0, 8)}..." : e,
            style: TextStyle(color: Colors.white),
          ),
        );
      }).toList(),
      style: TextStyle(color: Colors.white),
      iconEnabledColor: Colors.white,
      isDense: true,
      underline: SizedBox(),
      itemHeight: 48,
      menuMaxHeight: 200,
    );
  }

  // Método para avaliação de critérios
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

  // Método para opções de altura e morfologia
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
