import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:scouting_app/main.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  bool _emailHasError = false;
  bool _passwordHasError = false;
  String? _emailErrorMessage;
  String? _passwordErrorMessage;
  bool _isPasswordVisible = false; 


  void resetErrors() {
    setState(() {
      _emailHasError = false;
      _passwordHasError = false;
      _emailErrorMessage = null;
      _passwordErrorMessage = null;
    });
  }

  Future<void> _login() async {
    resetErrors();
    //
    if(emailController.text == '' || passwordController.text == '') {
      setState(() {
        if(emailController.text == '') {
          _emailHasError = true;
          _emailErrorMessage = 'Email precisa ser inserido.';
        }
        if(passwordController.text == '') {
          _passwordHasError = true;
          _passwordErrorMessage = 'Palavra-passe precisa ser inserida.';
        }
      });
      return;
    }
    final url = dotenv.env['API_URL']! + '/auth/login';
    final response = await http.post(
      Uri.parse(url),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'email': emailController.text,
        'password': passwordController.text,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', data['token']);
      await prefs.setString('userData', jsonEncode(data['user']));
      print('Login realizado com sucesso.');

      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => const Navigation()),
      );
    } else {
      setState(() {
        /*_hasError = true;
        _errorMessage = jsonDecode(response.body)['message'];*/
        switch (response.statusCode) {
          case 400:
            _emailHasError = true;
            _passwordHasError = true;
            _emailErrorMessage = 'Email precisa ser inserido.';
            _passwordErrorMessage = 'Palavra-passe precisa ser inserida.';
            break;
          case 404:
            _emailHasError = true;
            _emailErrorMessage = jsonDecode(response.body)['message'];
            break;
          case 401:
            _passwordHasError = true;
            _passwordErrorMessage = jsonDecode(response.body)['message'];
            break;
          default:
            _emailHasError = true;
            _passwordHasError = true;
            _emailErrorMessage = 'Erro desconhecido.';
            _passwordErrorMessage = 'Erro desconhecido.';
            break;
        }
      });
    }
  }

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
              controller: emailController,
              decoration: InputDecoration(
                labelText: 'Email',
                errorText: _emailErrorMessage,
                errorStyle: const TextStyle(fontWeight: FontWeight.bold),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(18),
                  borderSide: _emailHasError
                      ? BorderSide(
                          color: Theme.of(context).colorScheme.error,
                        )
                      : BorderSide.none,
                ),
              ),
            ),
            const SizedBox(height: 18),
            TextField(
              controller: passwordController,
                obscureText: !_isPasswordVisible,
              decoration: InputDecoration(
                labelText: 'Palavra-passe',
                errorText: _passwordErrorMessage,
                errorStyle: const TextStyle(
                    fontWeight: FontWeight.bold),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(18),
                  borderSide: _passwordHasError
                      ? BorderSide(
                          color: Theme.of(context).colorScheme.error,
                          width: 2.0,
                        )
                      : BorderSide.none,
                ),
                suffixIcon: IconButton(
                    icon: Icon(
                      _isPasswordVisible ? Icons.visibility : Icons.visibility_off,
                    ),
                    onPressed: () {
                      setState(() {
                        _isPasswordVisible = !_isPasswordVisible;
                      });
                    },
                  ),
              ),
            ),
            SizedBox(height: 18),
            ElevatedButton(
              onPressed: _login,
              child: Text(
                'Entrar',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
            Spacer(),
            TextButton(
              onPressed: () {},
              style: TextButton.styleFrom(
                alignment: Alignment.center,
              ),
              child: Text(
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
