import { useState } from "react";
import { NavLink } from "react-router-dom";
import './navLanding.css'; // Estilos da navbar
import logoSVG from '../assets/whiteLogo.svg';
import Cookies from 'js-cookie';

export default function NavLanding() {
    const nome = JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).nome;
    const [loggedIn, setLoggedIn] = useState(nome ? true : false);

    const logout = () => {
        Cookies.remove('token');
        localStorage.removeItem('userData');
        setLoggedIn(false);
    };
    return (
        <div className='navbar-landing'>
            <NavLink to="/">
                <img src={logoSVG} alt="Logo Académico de Viseu" />
            </NavLink>
            {loggedIn ?
                <span>
                    <NavLink to="/home" className='rounded font-bold login'><span className="material-symbols-outlined icon">
                        arrow_forward
                    </span>{nome}
                    </ NavLink>
                    <button onClick={logout} className='rounded font-bold login'> <span className="material-symbols-outlined icon">
                        logout
                    </span></button>
                </span>
                :
                <NavLink to="/login" className='rounded font-bold login'>
                    <span className="material-symbols-outlined icon">
                        login
                    </span>
                    Autenticar
                </NavLink>
            }

        </div >
    );
}
