import 'package:flutter/material.dart';
import 'package:scouting_app/novoRelatorio.dart'; // Certifique-se que o caminho está correto

class RelatoriosPage extends StatefulWidget {
  const RelatoriosPage({super.key});

  @override
  _RelatoriosPageState createState() => _RelatoriosPageState();
}

class _RelatoriosPageState extends State<RelatoriosPage> {
  final List<Map<String, String>> reports = [
    {"name": "Mbappé da Shopee", "date": "Hoje", "time": "10:55"},
    {"name": "Xiribi Astrolábio", "date": "Ontem", "time": "19:42"},
    {"name": "Sílvio Moreira", "date": "Ontem", "time": "14:33"},
    {"name": "Carlos Roque", "date": "4 dias atrás", "time": "01:43"},
    {"name": "Tomé Silva", "date": "19/01/2025", "time": "19:51"},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text(
          'Relatórios',
          style: TextStyle(color: Colors.white, fontSize: 24),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ElevatedButton.icon(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => RelatorioScreen()),
                );
              },
              icon: const Icon(Icons.add, color: Colors.black),
              label: const Text(
                'Novo relatório',
                style: TextStyle(color: Colors.black),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.yellow[700],
                minimumSize: const Size(double.infinity, 50),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              'Relatórios enviados',
              style: TextStyle(color: Colors.white, fontSize: 18),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: ListView.builder(
                itemCount: reports.length,
                itemBuilder: (context, index) {
                  final report = reports[index];
                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 4.0),
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.grey[850],
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            report['name']!,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Row(
                            children: [
                              Text(
                                report['date']!,
                                style: const TextStyle(color: Colors.white54),
                              ),
                              const SizedBox(width: 8),
                              const Icon(Icons.circle, color: Colors.yellow, size: 5),
                              const SizedBox(width: 8),
                              Text(
                                report['time']!,
                                style: const TextStyle(color: Colors.white54),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
