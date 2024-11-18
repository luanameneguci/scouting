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
    "Profissional",
    "Sub 23",
    "Sub 19",
    "Sub 16",
    "Sub 14",
    "Sub 12",
    "Sub 11",
    "Sub 10"
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 23, 23, 23),
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text(
          "Novo Relatório",
          style: TextStyle(color: Colors.white),
        ),
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // Escalão personalizado com botão
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          isDropdownOpen = !isDropdownOpen;
                        });
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.grey[900],
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Row(
                          children: [
                            Text(
                              selectedEscalao ?? "Escalão",
                              style: const TextStyle(color: Colors.white),
                            ),
                            Icon(
                              isDropdownOpen
                                  ? Icons.arrow_drop_up
                                  : Icons.arrow_drop_down,
                              color: Colors.white,
                            ),
                          ],
                        ),
                      ),
                    ),
                    DropdownButton<String>(
                      value: selectedAtleta,
                      hint: const Text("Atleta",
                          style: TextStyle(color: Colors.white)),
                      dropdownColor: Colors.black,
                      onChanged: (value) {
                        setState(() => selectedAtleta = value);
                      },
                      items: ["Atleta 1", "Atleta 2"].map((e) {
                        return DropdownMenuItem(
                          value: e,
                          child: Text(e,
                              style: const TextStyle(color: Colors.white)),
                        );
                      }).toList(),
                    ),
                    DropdownButton<String>(
                      value: selectedClube,
                      hint: const Text("Clube",
                          style: TextStyle(color: Colors.white)),
                      dropdownColor: Colors.black,
                      onChanged: (value) {
                        setState(() => selectedClube = value);
                      },
                      items: ["Clube 1", "Clube 2"].map((e) {
                        return DropdownMenuItem(
                          value: e,
                          child: Text(e,
                              style: const TextStyle(color: Colors.white)),
                        );
                      }).toList(),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Avaliações com número ao lado do título
                _buildRatingRow(
                    "Técnica", tecnica, (val) => setState(() => tecnica = val)),
                _buildRatingRow("Velocidade", velocidade,
                    (val) => setState(() => velocidade = val)),
                _buildRatingRow("Atitude Competitiva", atitudeCompetitiva,
                    (val) => setState(() => atitudeCompetitiva = val)),
                _buildRatingRow("Inteligência", inteligencia,
                    (val) => setState(() => inteligencia = val)),

                const SizedBox(height: 16),

                // Altura e Morfologia
                _buildOptionRow("Altura", ["Baixo", "Médio", "Alto"], altura,
                    (val) => setState(() => altura = val)),
                _buildOptionRow(
                    "Morfologia",
                    ["Ectomorfo", "Mesomorfo", "Endomorfo"],
                    morfologia,
                    (val) => setState(() => morfologia = val)),

                // Notas
                const SizedBox(height: 16),
                TextField(
                  maxLines: 4,
                  decoration: InputDecoration(
                    hintText: "Notas",
                    hintStyle: const TextStyle(color: Colors.white54),
                    filled: true,
                    fillColor: Colors.grey[900],
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: BorderSide.none,
                    ),
                  ),
                  style: const TextStyle(color: Colors.white),
                ),

                const SizedBox(height: 16),

                // Botão Confirmar
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.amber,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      textStyle: const TextStyle(fontSize: 18),
                    ),
                    child: const Text("Confirmar"),
                  ),
                ),
              ],
            ),
          ),

          // Menu de dropdown do Escalão
          if (isDropdownOpen)
            GestureDetector(
              onTap: () => setState(() => isDropdownOpen = false),
              child: Container(
                color: Colors.black.withOpacity(0.5),
                child: Center(
                  child: Material(
                    color: Colors.grey[800],
                    borderRadius: BorderRadius.circular(8),
                    child: ListView(
                      padding: const EdgeInsets.all(8.0),
                      shrinkWrap: true,
                      children: escalaoOptions.map((option) {
                        return ListTile(
                          title: Text(
                            option,
                            style: TextStyle(
                              color: selectedEscalao == option
                                  ? Colors.amber
                                  : Colors.white,
                            ),
                          ),
                          onTap: () {
                            setState(() {
                              selectedEscalao = option;
                              isDropdownOpen = false;
                            });
                          },
                        );
                      }).toList(),
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildRatingRow(String title, int rating, Function(int) onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(title, style: const TextStyle(color: Colors.white)),
            Text("$rating", style: const TextStyle(color: Colors.white)),
          ],
        ),
        const SizedBox(height: 10),
        Row(
          children: List.generate(5, (index) {
            return GestureDetector(
              onTap: () => onChanged(index + 1),
              child: Icon(
                index < rating ? Icons.star : Icons.star_border,
                color: Colors.amber,
                size: 30,
              ),
            );
          }),
        ),
      ],
    );
  }

  Widget _buildOptionRow(String title, List<String> options,
      String? selectedOption, Function(String) onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(color: Colors.white)),
        const SizedBox(height: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: options.map((option) {
            return GestureDetector(
              onTap: () => onChanged(option),
              child: Column(
                children: [
                  CircleAvatar(
                    radius: 15,
                    backgroundColor:
                        selectedOption == option ? Colors.amber : Colors.grey,
                  ),
                  const SizedBox(height: 4),
                  Text(option,
                      style:
                          const TextStyle(color: Colors.white, fontSize: 12)),
                ],
              ),
            );
          }).toList(),
        ),
      ],
    );
  }
}
