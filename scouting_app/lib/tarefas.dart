import 'package:flutter/material.dart';
import 'package:scouting_app/jogador.dart';
import 'package:scouting_app/novoRelatorio.dart';

class TarefasPage extends StatefulWidget {
  const TarefasPage({super.key});

  @override
  _TarefasPageState createState() => _TarefasPageState();
}

class _TarefasPageState extends State<TarefasPage> {
  final List<String> jogadores = <String>[
    'Jogador 1',
    'Jogador 2',
    'Jogador 3',
    'Não há um jogador específico!'
  ];
  final List<String> clubes = <String>[
    'Clube 1 x Clube 2',
    'Clube 1 x Clube 2',
    'Clube 1 x Clube 2',
    'Clube 1 x Clube 2'
  ];
  final List<String> gameDays = <String>[
    '2024-11-12',
    '2024-11-12',
    '2024-11-12',
    '2024-11-12'
  ];
  final List<String> gameTimes = <String>[
    '14:00',
    '14:00',
    '14:00',
    '14:00'
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 30, 30, 30),
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 23, 23, 23),
        title: const Text(
          'Olá, Luana',
          style: TextStyle(color: Colors.white),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: EdgeInsets.only(top: 15, left: 10),
              child: Text(
              'Próximos jogos',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            ),
            const SizedBox(height: 10),
            Expanded(
              child: ListView.builder(
                itemCount: clubes.length,
                itemBuilder: (BuildContext context, int index) {
                  return Container(
                    margin: const EdgeInsets.symmetric(vertical: 4),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: const Color.fromARGB(255, 43, 43, 43),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Stack(
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              clubes[index],
                              style: Theme.of(context).textTheme.headlineMedium,
                            ),
                            const SizedBox(height: 4),
                            Text(
                              jogadores[index],
                              style: Theme.of(context).textTheme.bodyMedium,
                            ),
                            Text(
                              gameDays[index],
                              style: Theme.of(context).textTheme.bodyMedium,
                            ),
                            Text(
                              gameTimes[index],
                              style: Theme.of(context).textTheme.bodyMedium,
                            ),
                          ],
                        ),
                        Positioned(
                          bottom: 0,
                          right: 0,
                          child: ElevatedButton(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => RelatorioScreen(),
                                ),
                              );
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color.fromARGB(255, 255, 208, 0),
                              padding: EdgeInsets.only(top: 10, bottom: 10, left: 20, right:20)
                            ),
                            child: const Text(
                              'Novo relatório',
                              style: TextStyle(color: Colors.black),
                            ),
                          ),
                        ),
                      ],
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
