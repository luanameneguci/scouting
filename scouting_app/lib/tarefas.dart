import 'package:flutter/material.dart';
import 'package:scouting_app/jogador.dart';
import 'package:scouting_app/novoRelatorio.dart';
import 'package:intl/intl.dart';

class TarefasPage extends StatefulWidget {
  const TarefasPage({super.key});

  @override
  _TarefasPageState createState() => _TarefasPageState();
}

enum FilterOption { week, month, all, specificMonth }

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
    '2024-11-20',
    '2024-11-25',
    '2024-11-29',
    '2025-07-10'
  ];
  final List<String> gameTimes = <String>['14:00', '16:00', '18:00', '20:00'];

  FilterOption selectedFilter = FilterOption.all;
  String? selectedMonth;

  List<String> getNext12Months() {
    List<String> months = [];
    DateTime now = DateTime.now();

    for (int i = 0; i < 12; i++) {
      DateTime month = DateTime(now.year, now.month + i, 1);
      months.add(DateFormat('MMMM yyyy').format(month));
    }
    return months;
  }

  List<int> getFilteredIndexes() {
    DateTime now = DateTime.now();
    DateTime weekFromNow = now.add(const Duration(days: 7));
    DateTime nextMonth = DateTime(now.year, now.month + 1, 1);

    List<int> filteredIndexes = [];

    for (int i = 0; i < gameDays.length; i++) {
      DateTime gameDate = DateTime.parse(gameDays[i]);
      if (selectedFilter == FilterOption.all ||
          (selectedFilter == FilterOption.week &&
              gameDate.isBefore(weekFromNow) &&
              gameDate.isAfter(now)) ||
          (selectedFilter == FilterOption.month &&
              gameDate.isBefore(nextMonth)) ||
          (selectedFilter == FilterOption.specificMonth &&
              selectedMonth != null &&
              DateFormat('MMMM yyyy').format(gameDate) == selectedMonth)) {
        filteredIndexes.add(i);
      }
    }
    return filteredIndexes;
  }

  @override
  Widget build(BuildContext context) {
    List<int> filteredIndexes = getFilteredIndexes();
    List<String> next12Months = getNext12Months();

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
            SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // Title on the left
                Container(
                  padding: const EdgeInsets.only(top: 0, left: 10),
                  child: Text(
                    'Próximos jogos',
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                ),
                // Filter dropdowns on the right
                Container(
                  height: 30,
                  padding: const EdgeInsets.only(left: 10),
                  decoration: BoxDecoration(
                    color:
                        const Color.fromARGB(255, 50, 50, 50), // Lighter color
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Row(
                    children: [
                      DropdownButtonHideUnderline(
                        child: DropdownButton<FilterOption>(
                          icon: const Icon(
                            Icons.tune, // Set the custom icon here
                            color:
                                Color.fromRGBO(95, 99, 104, 1), // Customize icon color if needed
                          ),
                          value: selectedFilter,
                          dropdownColor: const Color.fromARGB(255, 43, 43, 43),
                          style: const TextStyle(color: Colors.white),
                          items: const [
                            DropdownMenuItem(
                              value: FilterOption.all,
                              child: Text('Todos'),
                            ),
                            DropdownMenuItem(
                              value: FilterOption.week,
                              child: Text('Próximos 7 dias'),
                            ),
                            DropdownMenuItem(
                              value: FilterOption.month,
                              child: Text('Este mês'),
                            ),
                            DropdownMenuItem(
                              value: FilterOption.specificMonth,
                              child: Text('Select Month'),
                            ),
                          ],
                          onChanged: (FilterOption? newValue) {
                            setState(() {
                              selectedFilter = newValue!;
                              if (selectedFilter !=
                                  FilterOption.specificMonth) {
                                selectedMonth = null;
                              }
                            });
                          },
                        ),
                      ),
                      const SizedBox(width: 10),
                      if (selectedFilter == FilterOption.specificMonth)
                        DropdownButton<String>(
                          value: selectedMonth,
                          hint: const Text(
                            "Choose month",
                            style: TextStyle(color: Colors.white),
                          ),
                          dropdownColor: const Color.fromARGB(255, 43, 43, 43),
                          iconEnabledColor: Colors.white,
                          style: const TextStyle(color: Colors.white),
                          items: next12Months.map((String month) {
                            return DropdownMenuItem<String>(
                              value: month,
                              child: Text(month),
                            );
                          }).toList(),
                          onChanged: (String? newMonth) {
                            setState(() {
                              selectedMonth = newMonth;
                            });
                          },
                        ),
                    ],
                  ),
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
