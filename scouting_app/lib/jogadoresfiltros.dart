import 'package:flutter/material.dart';

class JogadoresFiltrosPage extends StatefulWidget {
  const JogadoresFiltrosPage({Key? key}) : super(key: key);

  @override
  _JogadoresFiltrosPageState createState() => _JogadoresFiltrosPageState();
}

class _JogadoresFiltrosPageState extends State<JogadoresFiltrosPage> {
  String? selectedPosicao;
  String? selectedClube;
  int? selectedRating;
  String? selectedEscalao;
  int? selectedAnoNascimento;

  final List<String> posicoes = ['Ataque', 'Meio-Campo', 'Defesa', 'Goleiro'];
  final List<String> clubes = ['Clube A', 'Clube B', 'Clube C'];
  final List<int> ratings = [1, 2, 3, 4, 5];
  final List<String> escaloes = ['Sub 15', 'Sub 17', 'Sub 20', 'Profissional'];
  final List<int> anos =
      List.generate(10, (index) => DateTime.now().year - index);

  void _aplicarFiltros() {
    Navigator.pop(context, {
      'posicao': selectedPosicao,
      'clube': selectedClube,
      'rating': selectedRating,
      'escalao': selectedEscalao,
      'anoNascimento': selectedAnoNascimento,
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text(
          'Filtros',
          style: TextStyle(color: Colors.white, fontSize: 24),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Contêiner dos filtros selecionados
            Container(
              padding: const EdgeInsets.all(8.0),
              decoration: BoxDecoration(
                color: Colors.grey[900],
                borderRadius: BorderRadius.circular(8),
              ),
              child: Wrap(
                spacing: 8.0,
                runSpacing: 4.0,
                children: [..._buildSelectedFilters()],
              ),
            ),
            const SizedBox(height: 16),

            // Container para os filtros
            Container(
              padding: const EdgeInsets.all(12.0),
              decoration: BoxDecoration(
                color: Colors.grey[850],
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                children: [
                  _buildFilterRow('Posição', posicoes, selectedPosicao,
                      (String? value) {
                    setState(() => selectedPosicao = value);
                  }),
                  _buildFilterRow('Clube', clubes, selectedClube,
                      (String? value) {
                    setState(() => selectedClube = value);
                  }),
                  _buildFilterRow(
                      'Rating',
                      ratings.map((e) => e.toString()).toList(),
                      selectedRating?.toString(), (String? value) {
                    setState(() => selectedRating =
                        value != null ? int.tryParse(value) : null);
                  }),
                  _buildFilterRow('Escalão', escaloes, selectedEscalao,
                      (String? value) {
                    setState(() => selectedEscalao = value);
                  }),
                  _buildFilterRow(
                      'Ano de nascimento',
                      anos.map((e) => e.toString()).toList(),
                      selectedAnoNascimento?.toString(), (String? value) {
                    setState(() => selectedAnoNascimento =
                        value != null ? int.tryParse(value) : null);
                  }),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Botão aplicar filtros
            ElevatedButton(
              onPressed: _aplicarFiltros,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.yellow[700],
                minimumSize: const Size(double.infinity, 50),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
              ),
              child: const Text(
                'Aplicar filtros',
                style:
                    TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Constrói os chips de filtros selecionados
  List<Widget> _buildSelectedFilters() {
    List<Widget> selectedFilters = [];
    if (selectedPosicao != null) selectedFilters.add(_filtroChip('Posição'));
    if (selectedClube != null) selectedFilters.add(_filtroChip('Clube'));
    if (selectedRating != null) selectedFilters.add(_filtroChip('Rating'));
    if (selectedEscalao != null) selectedFilters.add(_filtroChip('Escalão'));
    if (selectedAnoNascimento != null)
      selectedFilters.add(_filtroChip('Ano de nascimento'));
    return selectedFilters;
  }

  // Widget para exibir os filtros aplicados como chips removíveis
  Widget _filtroChip(String label) {
    return Chip(
      label: Text(label, style: const TextStyle(color: Colors.white)),
      backgroundColor: Colors.grey[800],
      deleteIcon: const Icon(Icons.close, color: Colors.white),
      onDeleted: () {
        setState(() {
          if (label == 'Posição') selectedPosicao = null;
          if (label == 'Clube') selectedClube = null;
          if (label == 'Rating') selectedRating = null;
          if (label == 'Escalão') selectedEscalao = null;
          if (label == 'Ano de nascimento') selectedAnoNascimento = null;
        });
      },
    );
  }

  // Constrói cada linha da lista de filtros
  Widget _buildFilterRow(String label, List<String> items,
      String? selectedValue, ValueChanged<String?> onChanged) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6.0),
      child: Row(
        children: [
          Expanded(
            flex: 2,
            child: Text(
              label,
              style: const TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold),
            ),
          ),
          Expanded(
            flex: 3,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8),
              decoration: BoxDecoration(
                color: Colors.grey[700], // Cor do dropdown
                borderRadius: BorderRadius.circular(8),
              ),
              child: DropdownButtonHideUnderline(
                child: DropdownButton<String>(
                  value: selectedValue,
                  items: items.map((item) {
                    return DropdownMenuItem<String>(
                      value: item,
                      child: Text(
                        item,
                        style: const TextStyle(color: Colors.white),
                      ),
                    );
                  }).toList(),
                  onChanged: onChanged,
                  dropdownColor: Colors.grey[900],
                  isExpanded: true,
                  icon: const Icon(Icons.arrow_drop_down, color: Colors.white),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
