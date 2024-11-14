import 'package:flutter/material.dart';

class RelatorioScreen extends StatefulWidget {
  @override
  _RelatorioScreenState createState() => _RelatorioScreenState();
}

class _RelatorioScreenState extends State<RelatorioScreen> {
  String? selectedEscalao;
  String? selectedAtleta;
  String? selectedClube;
  int tecnica = 1;
  int velocidade = 3;
  int atitudeCompetitiva = 4;
  int inteligencia = 2;
  String? altura = "Baixo";
  String? morfologia = "Mesomorfo";
  bool isDropdownOpen = false;

  List<String> escalaoOptions = [
    "Profissional", "Sub 23", "Sub 19", "Sub 16",
    "Sub 14", "Sub 12", "Sub 11", "Sub 10"
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 23, 23, 23),
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Text("Novo Relatório", style: TextStyle(color: Colors.white)),
      ),
      body: SingleChildScrollView( // Adiciona rolagem
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Filtros do jogo com dropdown personalizado para Escalão
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // Dropdown de Escalão com efeito de overlay
                GestureDetector(
                  onTap: () {
                    setState(() {
                      isDropdownOpen = !isDropdownOpen;
                    });
                  },
                  child: Container(
                    padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    decoration: BoxDecoration(
                      color: Colors.grey[900],
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      children: [
                        Text(
                          selectedEscalao ?? "Escalão",
                          style: TextStyle(color: Colors.white),
                        ),
                        Icon(
                          isDropdownOpen ? Icons.arrow_drop_up : Icons.arrow_drop_down,
                          color: Colors.white,
                        ),
                      ],
                    ),
                  ),
                ),
                DropdownButton<String>(
                  value: selectedAtleta,
                  hint: Text("Atleta", style: TextStyle(color: Colors.white)),
                  dropdownColor: Colors.black,
                  onChanged: (value) {
                    setState(() => selectedAtleta = value);
                  },
                  items: ["Atleta 1", "Atleta 2"].map((e) {
                    return DropdownMenuItem(
                      value: e,
                      child: Text(e, style: TextStyle(color: Colors.white)),
                    );
                  }).toList(),
                ),
                DropdownButton<String>(
                  value: selectedClube,
                  hint: Text("Clube", style: TextStyle(color: Colors.white)),
                  dropdownColor: Colors.black,
                  onChanged: (value) {
                    setState(() => selectedClube = value);
                  },
                  items: ["Clube 1", "Clube 2"].map((e) {
                    return DropdownMenuItem(
                      value: e,
                      child: Text(e, style: TextStyle(color: Colors.white)),
                    );
                  }).toList(),
                ),
              ],
            ),
            SizedBox(height: 16),

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

      // Overlay escuro e menu dropdown de Escalão
      if (isDropdownOpen)
        Stack(
          children: [
            GestureDetector(
              onTap: () => setState(() => isDropdownOpen = false),
              child: Container(
                color: Colors.black.withOpacity(0.5),
              ),
            ),
            Positioned(
              left: 16,
              right: 16,
              top: 100, // Posição ajustada para o dropdown
              child: Material(
                color: Colors.grey[800],
                borderRadius: BorderRadius.circular(8),
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    children: [
                      GridView.builder(
                        shrinkWrap: true,
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 4, // 4 botões por linha
                          mainAxisSpacing: 8,
                          crossAxisSpacing: 8,
                          childAspectRatio: 2.5,
                        ),
                        itemCount: escalaoOptions.length,
                        itemBuilder: (context, index) {
                          return ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: selectedEscalao == escalaoOptions[index] ? Colors.amber : Colors.grey[700],
                              padding: EdgeInsets.symmetric(vertical: 8),
                            ),
                            onPressed: () {
                              setState(() {
                                selectedEscalao = escalaoOptions[index];
                                isDropdownOpen = false;
                              });
                            },
                            child: Text(
                              escalaoOptions[index],
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 12,
                              ),
                            ),
                          );
                        },
                      ),
                      // Botão opcional para adicionar mais opções
                      TextButton(
                        onPressed: () {
                          // Lógica para adicionar opções
                        },
                        child: Text("+ Adicionar escalão", style: TextStyle(color: Colors.amber)),
                      ),
                    ],
                  ),
                ),
              ),
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
                  style: TextStyle(color: Colors.white, fontSize: 12),
                ),
              ],
            );
          }).toList(),
        ),
      ],
    );
  }
}
