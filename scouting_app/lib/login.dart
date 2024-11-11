import 'package:flutter/material.dart';
import 'package:scouting_app/main.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool _hasError = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 18.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Flexible(
              child: Image.asset(
                'images/Imagem Mobile - Login.png',
                fit: BoxFit.contain,
              ),
            ),
            const SizedBox(height: 18),
            Text(
              'Bem-vindo de volta!',
              style: Theme.of(context).textTheme.headlineLarge,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 18),
            TextField(
              decoration: InputDecoration(
                labelText: 'Email',
                errorText: _hasError ? 'Invalid email' : null,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(18),
                  borderSide: _hasError
                      ? const BorderSide(
                          color: Colors.red,
                          width: 2.0,
                        )
                      : BorderSide.none,
                ),
              ),
            ),
            const SizedBox(height: 18),
            TextField(
              decoration: InputDecoration(
                labelText: 'Palavra-passe',
                errorText: _hasError ? 'Invalid password' : null,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(18),
                  borderSide: _hasError
                      ? const BorderSide(
                          color: Colors.red,
                          width: 2.0,
                        )
                      : BorderSide.none,
                ),
              ),
            ),
            const SizedBox(height: 18),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const Navigation()),
                );
              },
              child: const Text(
                'Entrar',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
            const Spacer(),
            TextButton(
              onPressed: () {
                setState(() {
                  _hasError = !_hasError;
                });
              },
              style: TextButton.styleFrom(
                alignment: Alignment.center,
              ),
              child: const Text(
                'Esqueci-me da palavra-passe',
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Color.fromARGB(255, 255, 208, 0)),
              ),
            ),
          ],
        ),
      ),
    ));
  }
}
