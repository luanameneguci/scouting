import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setupContentNavbarMargin } from '../views/utils';
import './protectedRoute.css';
const url = process.env.REACT_APP_API_URL;

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const response = await axios.get(`${url}/auth/verify`, { withCredentials: true });
                    if (response.status === 200) {
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
        setupContentNavbarMargin('login-validation');

    }, []);

    if (isAuthenticated === null) {
        // Render a loading state while checking authentication
        return <div className='login-validation'> A carregar... </div>;
    }

    if (isAuthenticated) {
        return children;
    } else {
        return (
            <div className='login-validation'>
                <div className='rounded bg-color-gray-800'>
                    <h1>Falha na Autenticação</h1>
                    <p>A sua sessão expirou ou é inválida. Por favor, autentique-se novamente para continuar. </p>
                    <Link to="/login" className='round font-bold'>Autenticar</Link></div>

            </div>
        );
    }
};

export default ProtectedRoute;