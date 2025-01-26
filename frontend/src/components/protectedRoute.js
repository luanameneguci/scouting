import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setupContentNavbarMargin } from '../views/utils';
const url = process.env.REACT_APP_API_URL;

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();
    
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
        navigate("/erro");
    }
};

export default ProtectedRoute;