import 'package:flutter/material.dart';
import 'package:scouting_app/jogador.dart';
import 'package:scouting_app/novoRelatorio.dart';
import 'package:intl/intl.dart'; // Add this import to work with dates

class TarefasPage extends StatefulWidget {
  const TarefasPage({super.key});

  @override
  _TarefasPageState createState() => _TarefasPageState();
}

enum FilterOption { week, month, all } // Define filter options

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
    '2024-11-15',
    '2024-12-01',
    '2024-12-10'
  ];
  final List<String> gameTimes = <String>[
    '14:00',
    '16:00',
    '18:00',
    '20:00'
  ];

  FilterOption selectedFilter = FilterOption.all; // Default filter option

  List<int> getFilteredIndexes() {
    DateTime now = DateTime.now();
    DateTime weekFromNow = now.add(const Duration(days: 7));
    DateTime monthFromNow = DateTime(now.year, now.month + 1, now.day);

    List<int> filteredIndexes = [];

    for (int i = 0; i < gameDays.length; i++) {
      DateTime gameDate = DateTime.parse(gameDays[i]);
      if (selectedFilter == FilterOption.all ||
          (selectedFilter == FilterOption.week && gameDate.isBefore(weekFromNow)) ||
          (selectedFilter == FilterOption.month && gameDate.isBefore(monthFromNow))) {
        filteredIndexes.add(i);
      }
    }
    return filteredIndexes;
  }

  @override
  Widget build(BuildContext context) {
    List<int> filteredIndexes = getFilteredIndexes();

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
              padding: const EdgeInsets.only(top: 15, left: 10),
              child: Text(
                'Próximos jogos',
                style: Theme.of(context).textTheme.headlineSmall,
              ),
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                const Text('Filter by:', style: TextStyle(color: Colors.white)),
                const SizedBox(width: 10),
                DropdownButton<FilterOption>(
                  value: selectedFilter,
                  dropdownColor: const Color.fromARGB(255, 43, 43, 43),
                  iconEnabledColor: Colors.white,
                  style: const TextStyle(color: Colors.white),
                  items: const [
                    DropdownMenuItem(
                      value: FilterOption.all,
                      child: Text('All'),
                    ),
                    DropdownMenuItem(
                      value: FilterOption.week,
                      child: Text('This Week'),
                    ),
                    DropdownMenuItem(
                      value: FilterOption.month,
                      child: Text('This Month'),
                    ),
                  ],
                  onChanged: (FilterOption? newValue) {
                    setState(() {
                      selectedFilter = newValue!;
                    });
                  },
                ),
              ],
            ),
            const SizedBox(height: 10),
            Expanded(
              child: ListView.builder(
                itemCount: filteredIndexes.length,
                itemBuilder: (BuildContext context, int index) {
                  int gameIndex = filteredIndexes[index];
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
                              clubes[gameIndex],
                              style: Theme.of(context).textTheme.headlineMedium,
                            ),
                            const SizedBox(height: 4),
                            Text(
                              jogadores[gameIndex],
                              style: Theme.of(context).textTheme.bodyMedium,
                            ),
                            Text(
                              gameDays[gameIndex],
                              style: Theme.of(context).textTheme.bodyMedium,
                            ),
                            Text(
                              gameTimes[gameIndex],
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
                              backgroundColor:
                                  const Color.fromARGB(255, 255, 208, 0),
                              padding: const EdgeInsets.symmetric(
                                  vertical: 10, horizontal: 20),
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
