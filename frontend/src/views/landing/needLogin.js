import React from 'react';
import Footer from '../../components/footerWEB';
import { Link } from 'react-router-dom';
import './needLogin.css';

export default function NeedLogin() {
    return (
        <>
            <div className='login-validation'>
                <div className='rounded bg-color-gray-800'>
                    <h1>Falha na Autenticação</h1>
                    <p>A sua sessão expirou ou é inválida. Por favor, autentique-se novamente para continuar. </p>
                    <Link to="/login" className='font-bold'>Autenticar</Link></div>

            </div>
            <Footer />
        </>
    );
}
