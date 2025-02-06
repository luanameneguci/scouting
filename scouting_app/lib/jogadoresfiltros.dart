import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class JogadoresFiltrosPage extends StatefulWidget {
  const JogadoresFiltrosPage({Key? key}) : super(key: key);

  @override
  _JogadoresFiltrosPageState createState() => _JogadoresFiltrosPageState();
}

class _JogadoresFiltrosPageState extends State<JogadoresFiltrosPage> {
  // Listas dinâmicas vindas do backend
  List<dynamic> listaPosicoes = [];
  List<dynamic> listaClubes = [];
  List<dynamic> listaEscaloes = [];

  // IDs selecionados para cada dropdown dinâmico
  String? selectedPosicaoId;
  String? selectedClubeId;
  String? selectedEscalaoId;

  // Filtro para rating e ano
  int? selectedRating;
  int? selectedAnoNascimento;

  // Lista de ratings fixos (1 a 5)
  final List<int> ratings = [1, 2, 3, 4, 5];

  // Gerando anos de nascimento até 90 anos atrás
  late final List<int> anos;

  @override
  void initState() {
    super.initState();

    // Gera anos desde o ano atual até 90 anos atrás
    final int currentYear = DateTime.now().year; // se estamos em 2025, ex.
    final int startYear = currentYear - 90; // 1935 se 90 anos
    anos = [
      for (int y = currentYear; y >= startYear; y--) y,
    ];

    _fetchPosicoes(); // GET /atleta/posicoes
    _fetchClubes(); // GET /clube/listar
    _fetchEscaloes(); // GET /escalao/listar
  }

  // ---------------------------------------------------------
  // 1) BUSCAR POSIÇÕES (/atleta/posicoes)
  // ---------------------------------------------------------
  Future<void> _fetchPosicoes() async {
    try {
      final url = Uri.parse('http://localhost:8080/atleta/posicoes');
      final resp = await http.get(url);
      if (resp.statusCode == 200) {
        final jsonBody = json.decode(resp.body);
        if (jsonBody['success'] == true) {
          setState(() {
            listaPosicoes = jsonBody['data'];
          });
        }
      } else {
        print('Erro ao buscar posicoes: ${resp.statusCode}');
      }
    } catch (e) {
      print('Erro ao conectar no endpoint posicoes: $e');
    }
  }

  // ---------------------------------------------------------
  // 2) BUSCAR CLUBES (/clube/listar)
  // ---------------------------------------------------------
  Future<void> _fetchClubes() async {
    try {
      final url = Uri.parse('http://localhost:8080/clube/listar');
      final resp = await http.get(url);
      if (resp.statusCode == 200) {
        final jsonBody = json.decode(resp.body);
        if (jsonBody['success'] == true) {
          setState(() {
            listaClubes = jsonBody['data'];
          });
        }
      } else {
        print('Erro ao buscar clubes: ${resp.statusCode}');
      }
    } catch (e) {
      print('Erro ao conectar no endpoint clubes: $e');
    }
  }

  // ---------------------------------------------------------
  // 3) BUSCAR ESCALÕES (/escalao/listar)
  // ---------------------------------------------------------
  Future<void> _fetchEscaloes() async {
    try {
      final url = Uri.parse('http://localhost:8080/escalao/listar');
      final resp = await http.get(url);
      if (resp.statusCode == 200) {
        final jsonBody = json.decode(resp.body);
        if (jsonBody['success'] == true) {
          setState(() {
            listaEscaloes = jsonBody['data'];
          });
        }
      } else {
        print('Erro ao buscar escalões: ${resp.statusCode}');
      }
    } catch (e) {
      print('Erro ao conectar no endpoint escalões: $e');
    }
  }

  // ---------------------------------------------------------
  // Ao clicar em "Aplicar Filtros"
  // ---------------------------------------------------------
  void _aplicarFiltros() {
    // Retornamos um Map para a tela anterior
    // Observação: no JogadoresPage, converteremos ID strings -> int
    Navigator.pop(context, {
      'posicaoId': selectedPosicaoId,
      'clubeId': selectedClubeId,
      'escalaoId': selectedEscalaoId,
      'rating': selectedRating, // exato
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
          children: [
            // 1) CHIPs de filtros já aplicados
            Container(
              padding: const EdgeInsets.all(8.0),
              decoration: BoxDecoration(
                color: Colors.grey[900],
                borderRadius: BorderRadius.circular(8),
              ),
              child: Wrap(
                spacing: 8.0,
                runSpacing: 4.0,
                children: _buildSelectedFilters(),
              ),
            ),
            const SizedBox(height: 16),

            // 2) Dropdowns
            Container(
              padding: const EdgeInsets.all(12.0),
              decoration: BoxDecoration(
                color: Colors.grey[850],
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                children: [
                  // (A) Posição
                  _buildRowPosicao(),

                  // (B) Clube
                  _buildRowClube(),

                  // (C) Escalão
                  _buildRowEscalao(),

                  // (D) Rating (fixo de 1 a 5, para filtrar exato ratingfinal)
                  _buildRowRating(),

                  // (E) Ano de nascimento
                  _buildRowAnoNascimento(),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Botão "Aplicar filtros"
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

  // -------------------------------------------------
  // CHIPs com os nomes dos filtros aplicados
  // -------------------------------------------------
  List<Widget> _buildSelectedFilters() {
    final chips = <Widget>[];
    if (selectedPosicaoId != null) chips.add(_filtroChip('Posição'));
    if (selectedClubeId != null) chips.add(_filtroChip('Clube'));
    if (selectedEscalaoId != null) chips.add(_filtroChip('Escalão'));
    if (selectedRating != null) chips.add(_filtroChip('Rating'));
    if (selectedAnoNascimento != null) {
      chips.add(_filtroChip('Ano de nascimento'));
    }
    return chips;
  }

  Widget _filtroChip(String label) {
    return Chip(
      label: Text(label, style: const TextStyle(color: Colors.white)),
      backgroundColor: Colors.grey[800],
      deleteIcon: const Icon(Icons.close, color: Colors.white),
      onDeleted: () {
        setState(() {
          switch (label) {
            case 'Posição':
              selectedPosicaoId = null;
              break;
            case 'Clube':
              selectedClubeId = null;
              break;
            case 'Escalão':
              selectedEscalaoId = null;
              break;
            case 'Rating':
              selectedRating = null;
              break;
            case 'Ano de nascimento':
              selectedAnoNascimento = null;
              break;
          }
        });
      },
    );
  }

  // -------------------------------------------------
  // Posição (dinâmico)
  // -------------------------------------------------
  Widget _buildRowPosicao() {
    return _buildDynamicDropdownRow(
      label: 'Posição',
      items: listaPosicoes,
      selectedValue: selectedPosicaoId,
      getValue: (pos) => pos['id_posicao']?.toString() ?? '',
      getLabel: (pos) => pos['designacao'] ?? 'Sem nome',
      onChanged: (String? val) {
        setState(() {
          selectedPosicaoId = val;
        });
      },
    );
  }

  // -------------------------------------------------
  // Clube (dinâmico)
  // -------------------------------------------------
  Widget _buildRowClube() {
    return _buildDynamicDropdownRow(
      label: 'Clube',
      items: listaClubes,
      selectedValue: selectedClubeId,
      getValue: (clube) => clube['id_clube']?.toString() ?? '',
      getLabel: (clube) => clube['nome'] ?? 'Sem nome',
      onChanged: (String? val) {
        setState(() {
          selectedClubeId = val;
        });
      },
    );
  }

  // -------------------------------------------------
  // Escalão (dinâmico)
  // -------------------------------------------------
  Widget _buildRowEscalao() {
    return _buildDynamicDropdownRow(
      label: 'Escalão',
      items: listaEscaloes,
      selectedValue: selectedEscalaoId,
      getValue: (esc) => esc['id_escalao']?.toString() ?? '',
      getLabel: (esc) => esc['designacao'] ?? 'Sem nome',
      onChanged: (String? val) {
        setState(() {
          selectedEscalaoId = val;
        });
      },
    );
  }

  // -------------------------------------------------
  // Rating (fixo) de 1..5 para filtrar exato ratingfinal
  // -------------------------------------------------
  Widget _buildRowRating() {
    final items = ratings.map((r) => r.toString()).toList();
    return _buildFixedDropdownRow(
      label: 'Rating',
      items: items,
      selectedValue: selectedRating?.toString(),
      onChanged: (String? val) {
        setState(() {
          // Ex.: se o user escolher "4", stored int = 4
          selectedRating = val != null ? int.tryParse(val) : null;
        });
      },
    );
  }

  // -------------------------------------------------
  // Ano de nascimento (fixo)
  // -------------------------------------------------
  Widget _buildRowAnoNascimento() {
    final items = anos.map((year) => year.toString()).toList();
    return _buildFixedDropdownRow(
      label: 'Ano de nascimento',
      items: items,
      selectedValue: selectedAnoNascimento?.toString(),
      onChanged: (String? val) {
        setState(() {
          selectedAnoNascimento = val != null ? int.tryParse(val) : null;
        });
      },
    );
  }

  // -------------------------------------------------
  // Dropdown DINÂMICO (Posição, Clube, Escalão)
  // -------------------------------------------------
  Widget _buildDynamicDropdownRow({
    required String label,
    required List<dynamic> items,
    required String? selectedValue,
    required String Function(dynamic) getValue,
    required String Function(dynamic) getLabel,
    required ValueChanged<String?> onChanged,
  }) {
    final dropdownItems = items.map<DropdownMenuItem<String>>((item) {
      final value = getValue(item); // ex.: "2"
      final labelItem = getLabel(item); // ex.: "SL Benfica"
      return DropdownMenuItem<String>(
        value: value,
        child: Text(
          labelItem,
          style: const TextStyle(color: Colors.white),
        ),
      );
    }).toList();

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
                color: Colors.grey[700],
                borderRadius: BorderRadius.circular(8),
              ),
              child: DropdownButtonHideUnderline(
                child: DropdownButton<String>(
                  value: selectedValue,
                  items: dropdownItems,
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

  // -------------------------------------------------
  // Dropdown FIXO (Rating, Ano)
  // -------------------------------------------------
  Widget _buildFixedDropdownRow({
    required String label,
    required List<String> items,
    required String? selectedValue,
    required ValueChanged<String?> onChanged,
  }) {
    final dropdownItems = items.map<DropdownMenuItem<String>>((item) {
      return DropdownMenuItem<String>(
        value: item,
        child: Text(item, style: const TextStyle(color: Colors.white)),
      );
    }).toList();

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
                color: Colors.grey[700],
                borderRadius: BorderRadius.circular(8),
              ),
              child: DropdownButtonHideUnderline(
                child: DropdownButton<String>(
                  value: selectedValue,
                  items: dropdownItems,
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
