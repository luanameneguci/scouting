import 'package:flutter/material.dart';

class NovoJogadorScreen extends StatefulWidget {
  @override
  _NovoJogadorScreenState createState() => _NovoJogadorScreenState();
}

class _NovoJogadorScreenState extends State<NovoJogadorScreen> {
  final _formKey = GlobalKey<FormState>();

  String? nome;
  String? dataNascimento;
  String? selectedNacionalidade;
  String? selectedPosicao;
  String? selectedClube;
  String? nomeEncarregado;
  String? contatoEncarregado;

  bool isNacionalidadeDropdownOpen = false;
  bool isPosicaoDropdownOpen = false;
  bool isClubeDropdownOpen = false;

  final List<String> nacionalidades = [
    "Português",
    "Brasileiro",
    "Espanhol",
    "Inglês",
    "Francês",
    "Alemão"
  ];
  final List<String> posicoes = ["Guarda-redes", "Defesa", "Médio", "Avançado"];
  final List<String> clubes = [
    "Clube 1",
    "Clube 2",
    "Clube 3",
    "Clube 4",
    "Clube 5",
    "Clube 6",
    "Clube 7",
    "Clube 8"
  ];

  TextEditingController dataNascimentoController = TextEditingController();

  bool isFormValid = false; // Estado do botão de submissão

  @override
  void dispose() {
    dataNascimentoController.dispose();
    super.dispose();
  }

  void _validateForm() {
    setState(() {
      isFormValid = nome != null &&
          nome!.isNotEmpty &&
          dataNascimento != null &&
          dataNascimento!.isNotEmpty &&
          selectedNacionalidade != null &&
          selectedNacionalidade!.isNotEmpty &&
          selectedPosicao != null &&
          selectedPosicao!.isNotEmpty &&
          selectedClube != null &&
          selectedClube!.isNotEmpty &&
          nomeEncarregado != null &&
          nomeEncarregado!.isNotEmpty &&
          contatoEncarregado != null &&
          contatoEncarregado!.isNotEmpty;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 23, 23, 23),
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Text("Novo Jogador", style: TextStyle(color: Colors.white)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildTextField("Nome", (value) {
                nome = value;
                _validateForm();
              }),
              _buildDataNascimentoField(),
              Row(
                children: [
                  Expanded(
                    child: GestureDetector(
                      onTap: () {
                        setState(() {
                          isNacionalidadeDropdownOpen = true;
                          isPosicaoDropdownOpen = false;
                          isClubeDropdownOpen = false;
                        });
                      },
                      child: _buildDropdownField(
                        _truncateText(selectedNacionalidade ?? "Nacionalidade", maxLength: 8),
                      ),
                    ),
                  ),
                  SizedBox(width: 16),
                  Expanded(
                    child: GestureDetector(
                      onTap: () {
                        setState(() {
                          isPosicaoDropdownOpen = true;
                          isNacionalidadeDropdownOpen = false;
                          isClubeDropdownOpen = false;
                        });
                      },
                      child: _buildDropdownField(
                        _truncateText(selectedPosicao ?? "Posição", maxLength: 8),
                      ),
                    ),
                  ),
                  SizedBox(width: 16),
                  Expanded(
                    child: GestureDetector(
                      onTap: () {
                        setState(() {
                          isClubeDropdownOpen = true;
                          isNacionalidadeDropdownOpen = false;
                          isPosicaoDropdownOpen = false;
                        });
                      },
                      child: _buildDropdownField(
                        _truncateText(selectedClube ?? "Clube", maxLength: 8),
                      ),
                    ),
                  ),
                ],
              ),
              if (isNacionalidadeDropdownOpen)
                _buildDropdownContent(nacionalidades, (nacionalidade) {
                  setState(() {
                    selectedNacionalidade = nacionalidade;
                    isNacionalidadeDropdownOpen = false;
                    _validateForm();
                  });
                }),
              if (isPosicaoDropdownOpen)
                _buildDropdownContent(posicoes, (posicao) {
                  setState(() {
                    selectedPosicao = posicao;
                    isPosicaoDropdownOpen = false;
                    _validateForm();
                  });
                }),
              if (isClubeDropdownOpen)
                _buildDropdownContent(clubes, (clube) {
                  setState(() {
                    selectedClube = clube;
                    isClubeDropdownOpen = false;
                    _validateForm();
                  });
                }),
              _buildTextField("Nome do Encarregado", (value) {
                nomeEncarregado = value;
                _validateForm();
              }),
              _buildTextField("Contato do Encarregado", (value) {
                contatoEncarregado = value;
                _validateForm();
              }),
              SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: isFormValid
                      ? () {
                          print("Novo jogador criado:");
                          print("Nome: $nome");
                          print("Data de Nascimento: $dataNascimento");
                          print("Nacionalidade: $selectedNacionalidade");
                          print("Posição: $selectedPosicao");
                          print("Clube: $selectedClube");
                          print("Nome do Encarregado: $nomeEncarregado");
                          print("Contato do Encarregado: $contatoEncarregado");
                          Navigator.pop(context);
                        }
                      : null,
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
      ),
    );
  }

  Widget _buildTextField(String label, Function(String) onChanged) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: TextField(
        style: TextStyle(color: Colors.white),
        decoration: InputDecoration(
          labelText: label,
          labelStyle: TextStyle(color: Colors.white54),
          filled: true,
          fillColor: Colors.grey[900],
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: BorderSide.none,
          ),
        ),
        onChanged: onChanged,
      ),
    );
  }

  Widget _buildDataNascimentoField() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: GestureDetector(
        onTap: () async {
          DateTime? selectedDate = await showDatePicker(
            context: context,
            initialDate: DateTime.now(),
            firstDate: DateTime(1900),
            lastDate: DateTime.now(),
            builder: (BuildContext context, Widget? child) {
              return Theme(
                data: ThemeData.dark().copyWith(
                  colorScheme: ColorScheme.dark(
                    primary: Colors.amber,
                    onPrimary: Colors.black,
                    surface: Colors.grey[900]!,
                    onSurface: Colors.white,
                  ),
                  dialogBackgroundColor: const Color.fromARGB(255, 23, 23, 23),
                ),
                child: child!,
              );
            },
          );

          if (selectedDate != null) {
            setState(() {
              dataNascimento = "${selectedDate.day.toString().padLeft(2, '0')}/"
                  "${selectedDate.month.toString().padLeft(2, '0')}/"
                  "${selectedDate.year}";
              dataNascimentoController.text = dataNascimento!;
              _validateForm();
            });
          }
        },
        child: AbsorbPointer(
          child: TextField(
            controller: dataNascimentoController,
            style: TextStyle(color: Colors.white),
            decoration: InputDecoration(
              labelText: "Data de Nascimento",
              labelStyle: TextStyle(color: Colors.white54),
              filled: true,
              fillColor: Colors.grey[900],
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide.none,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDropdownField(String text) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.grey[900],
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

  Widget _buildDropdownContent(List<String> options, Function(String) onSelected) {
    return Container(
      margin: EdgeInsets.only(top: 8),
      padding: const EdgeInsets.all(8.0),
      decoration: BoxDecoration(
        color: Colors.grey[900],
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          TextField(
            style: TextStyle(color: Colors.white),
            decoration: InputDecoration(
              hintText: 'Pesquisar',
              hintStyle: TextStyle(color: Colors.white54),
              filled: true,
              fillColor: Colors.grey[800],
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide.none,
              ),
            ),
            onChanged: (value) {
              setState(() {});
            },
          ),
          Container(
            height: 200,
            child: ListView(
              children: options.map((option) {
                return GestureDetector(
                  onTap: () {
                    onSelected(option);
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
                      option,
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
    );
  }

  String _truncateText(String text, {required int maxLength}) {
    return text.length > maxLength ? "${text.substring(0, maxLength)}…" : text;
  }
}
