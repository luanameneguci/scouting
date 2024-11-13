import 'package:flutter/material.dart';

class PoliticasPrivPage extends StatefulWidget {
  const PoliticasPrivPage({super.key});

  @override
  _PoliticasPrivPageState createState() => _PoliticasPrivPageState();
}

class _PoliticasPrivPageState extends State<PoliticasPrivPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Política de Privacidade'),
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 18.0, vertical: 9),
        children: <Widget>[
          _buildExpansionTile('Identificação do responsável pelo tratamento',
              'Académico de Viseu Futebol Clube\nNIPC 503954306\nSede: sede no Estádio Municipal do Fontelo, Avenida Anacleto Pinto, freguesia e concelho de Viseu.\nContato do EPD (Encarregado da Proteção de Dados) protecaodedados@academicodeviseu.com'),
          const SizedBox(height: 18.0),
          _buildExpansionTile(
              'Informação, consentimento e finalidade do tratamento',
              'A Lei da Proteção de Dados Pessoais (em diante “LPD”) e o Regulamento Geral de Proteção de Dados (Regulamento (UE) 2016/679 do Parlamento Europeu e do Conselho de 27 de abril de 2016, em diante “RGPD”) e a Lei 58/2019, de 8 de agosto, asseguram a proteção das pessoas singulares no que diz respeito ao tratamento de dados pessoais e à livre circulação desses dados.\nMediante a aceitação da presente Política de Privacidade e/ou Termos e Condições o utilizador presta o seu consentimento informado, expresso, livre e inequívoco para que os dados pessoais fornecidos sejam incluídos num ficheiro da responsabilidade do Académico de Viseu Futebol Clube, cujo tratamento nos termos do RGPD cumpre as medidas de segurança técnicas e organizativas adequadas.\nOs dados presentes nesta base são unicamente os dados prestados pelos próprios ou encarregados de educação na altura do seu registo, sendo tratados apenas para a criação do histórico do jogador de futebol/atleta.1nEm caso algum será solicitada informação sobre convicções filosóficas ou políticas, filiação partidária ou sindical, fé religiosa, vida privada e origem racial ou étnica bem como os dados relativos à saúde e à vida sexual, incluindo os dados genéticos. Os dados recolhidos não serão cedidos a outras pessoas ou outras entidades, sem o consentimento prévio do titular dos dados.'),
          const SizedBox(height: 18.0),
          _buildExpansionTile('Medidas de Segurança',
              'O Académico de Viseu Futebol Clube declara que implementou e continuará a implementar as medidas de segurança de natureza técnica e organizativa necessárias para garantir a segurança dos dados de carácter pessoal que lhe sejam fornecidos visando evitar a sua alteração, perda, tratamento e/ou acesso não autorizado, tendo em conta o estado atual da tecnologia, a natureza dos dados armazenados e os riscos a que estão expostos bem como garante a confidencialidade dos mesmos.'),
          const SizedBox(height: 18.0),
          _buildExpansionTile('Exercício dos direitos',
              'O titular dos dados pessoais/encarregados de educação podem, exercer a todo o tempo, os seus direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade.'),
          const SizedBox(height: 18.0),
          _buildExpansionTile('Prazo de conservação',
              'O Académico de Viseu Futebol Clube apenas trata os dados pessaois durante o período que se revele necessário ao cumprimento da sua finalidade (criação de histórico do atleta desde a formação à profissionalização), sem prejuízo dos dados serem conservados por um período superior, por exigências legais.'),
          const SizedBox(height: 18.0),
          _buildExpansionTile('Autoridade de controlo',
              'Nos termos legais, o titular dos dados tem o direito de apresentar uma reclamação em matéria de proteção de dados pessoais à autoridade de controlo competente, a Comissão Nacional de Proteção de Dados (CNPD).'),
        ],
      ),
    );
  }

  Widget _buildExpansionTile(String title, String content) {
    return ExpansionTile(
      backgroundColor: const Color.fromARGB(255, 43, 43, 43),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18.0),
      ),
      collapsedShape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18.0),
      ),
      iconColor: Colors.white,
      collapsedIconColor: Colors.white,
      title: Text(
        title,
        style: const TextStyle(fontWeight: FontWeight.bold),
      ),
      children: <Widget>[
        ListTile(
          title: Text(content),
        ),
        const SizedBox(height: 18.0),
      ],
    );
  }
}
