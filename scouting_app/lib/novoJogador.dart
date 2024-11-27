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

  TextEditingController dataNascimentoController = TextEditingController();

  @override
  void dispose() {
    dataNascimentoController.dispose();
    super.dispose();
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
              _buildTextField("Nome", (value) => nome = value),
              _buildDataNascimentoField(),
              SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _isFormValid()
                      ? () {
                          print("Novo jogador criado:");
                          print("Nome: $nome");
                          print("Data de Nascimento: ${dataNascimentoController.text}");
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
      child: TextField(
        controller: dataNascimentoController,
        keyboardType: TextInputType.number,
        style: TextStyle(color: Colors.white),
        decoration: InputDecoration(
          labelText: "Data de Nascimento (DD/MM/AAAA)",
          labelStyle: TextStyle(color: Colors.white54),
          filled: true,
          fillColor: Colors.grey[900],
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: BorderSide.none,
          ),
          hintText: "DD/MM/AAAA",
          hintStyle: TextStyle(color: Colors.white54),
        ),
        onChanged: (value) {
          String sanitized = value.replaceAll(RegExp(r'[^0-9/]'), '');
          String formatted = _formatDateInput(sanitized);
          dataNascimentoController.value = TextEditingValue(
            text: formatted,
            selection: TextSelection.collapsed(offset: formatted.length),
          );
        },
      ),
    );
  }

  String _formatDateInput(String input) {
    List<String> parts = input.split('/');
    String day = parts.isNotEmpty ? parts[0] : '';
    String month = parts.length > 1 ? parts[1] : '';
    String year = parts.length > 2 ? parts[2] : '';

    if (day.length > 2) {
      month = day.substring(2) + month;
      day = day.substring(0, 2);
    }

    if (month.length > 2) {
      year = month.substring(2) + year;
      month = month.substring(0, 2);
    }

    String formatted = day;
    if (day.length == 2) formatted += '/';
    formatted += month;
    if (month.length == 2) formatted += '/';
    formatted += year;

    return formatted;
  }

  bool _isFormValid() {
    return nome != null &&
        dataNascimentoController.text.isNotEmpty;
  }
}
