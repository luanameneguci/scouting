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
            Text(
              'Bem-vindo de volta!',
              style: Theme.of(context).textTheme.headlineLarge,
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 18),
            TextField(
              decoration: InputDecoration(
                labelText: 'Email',
              ),
            ),
            SizedBox(height: 18),
            TextField(
              decoration: InputDecoration(
                labelText: 'Palavra-passe',
              ),
            ),
            SizedBox(height: 18),
            ElevatedButton(
              onPressed: () {},
              child: Text(
                'Entrar',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
            Spacer(),
            TextButton(
              onPressed: () {
                // Handle the tap event
              },
              style: TextButton.styleFrom(
                padding: EdgeInsets.zero, // Remove default padding
                minimumSize: Size(50, 30), // Adjust as needed
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                alignment: Alignment.centerLeft,
              ),
              child: Text(
                'Click here',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
      ),
    ));
  }
}
