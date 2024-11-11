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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Text("Novo Relatório", style: TextStyle(color: Colors.white)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Filtros do jogo
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                DropdownButton<String>(
                  value: selectedEscalao,
                  hint: Text("Escalão", style: TextStyle(color: Colors.white)),
                  dropdownColor: Colors.black,
                  onChanged: (value) {
                    setState(() => selectedEscalao = value);
                  },
                  items: ["Escalão 1", "Escalão 2"].map((e) {
                    return DropdownMenuItem(
                      value: e,
                      child: Text(e, style: TextStyle(color: Colors.white)),
                    );
                  }).toList(),
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

            // Avaliações
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
            Spacer(),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.yellow,
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

  Widget _buildRatingRow(String title, int rating, Function(int) onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: TextStyle(color: Colors.white)),
        Row(
          children: List.generate(4, (index) {
            return IconButton(
              icon: Icon(
                Icons.circle,
                color: index < rating ? Colors.yellow : Colors.grey,
              ),
              onPressed: () => onChanged(index + 1),
            );
          }),
        ),
      ],
    );
  }

  Widget _buildOptionRow(String title, List<String> options, String? selectedOption, Function(String) onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: TextStyle(color: Colors.white)),
        Row(
          children: options.map((option) {
            return Row(
              children: [
                Radio<String>(
                  value: option,
                  groupValue: selectedOption,
                  onChanged: (value) => onChanged(value!),
                  activeColor: Colors.yellow,
                ),
                Text(option, style: TextStyle(color: Colors.white)),
              ],
            );
          }).toList(),
        ),
      ],
    );
  }
}
