import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Login'),
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(
                horizontal: 20.0), // Add padding to the sides
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TextField(
                  decoration: InputDecoration(
                    labelText: 'Email',
                  ),
                ),
                TextField(
                  decoration: InputDecoration(
                    labelText: 'Palavra-passe',
                  ),
                ),
                ElevatedButton(
                  onPressed: () {},
                  child: Text('Entrar'),
                ),
              ],
            ),
          ),
        ));
  }
}
