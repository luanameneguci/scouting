import React from 'react';
import { NavLink } from "react-router-dom";
import './navBackoffice.css';

export default function NavBackoffice() {
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
            <NavLink to="/equipa/1" className={({ isActive }) => `rounded font-bold ${isActive ? 'selected' : ''}`}>
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
            <div><div>utilizador</div></div>
        </div>
    );
};

