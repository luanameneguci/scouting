import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import './navBackoffice.css';
import Cookies from 'js-cookie';

export default function NavBackoffice() {
    const navigate = useNavigate();
    if (localStorage.getItem('userData')==null) {
        navigate('/erro')
    }
    const user = JSON.parse(localStorage.getItem('userData'));


    return (
        <div className='navbar-back'>
            <NavLink to="/home" className={({ isActive }) => `rounded font-bold ${isActive ? 'selected' : ''}`}>
                <span className="material-symbols-outlined icon">
                    home
                </span>
            </NavLink>
            <NavLink to="/atletas" className={({ isActive }) => `rounded font-bold ${isActive ? 'selected' : ''}`}>
                <span className="material-symbols-outlined icon">
                    groups
                </span>
                Atletas
            </NavLink>
            <NavLink to="/equipa/" className={({ isActive }) => `rounded font-bold ${isActive ? 'selected' : ''}`}>
                <span className="material-symbols-outlined icon">
                    sports_and_outdoors
                </span>
                Equipas
            </NavLink>
            <NavLink to="/credenciais" className={({ isActive }) => `rounded font-bold ${isActive ? 'selected' : ''}`}>
                <span className="material-symbols-outlined icon">
                    key
                </span>
                Credenciais
            </NavLink>
            <NavLink to="/relatorios" className={({ isActive }) => `rounded font-bold ${isActive ? 'selected' : ''}`}>
                <span className="material-symbols-outlined icon">
                    check_circle
                </span>
                Relatórios
            </NavLink>
            <NavLink to="/jogos" className={({ isActive }) => `rounded font-bold ${isActive ? 'selected' : ''}`}>
                <span className="material-symbols-outlined icon">
                    event
                </span>
                Jogos
            </NavLink>
            <div><div>{user && user.nome}</div></div>
        </div>
    );
};

