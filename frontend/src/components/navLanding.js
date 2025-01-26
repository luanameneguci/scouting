import { NavLink } from "react-router-dom";
import './navLanding.css'; // Estilos da navbar
import logoSVG from '../assets/whiteLogo.svg';


export default function NavLanding() {

    return (
        <div className='navbar-landing'>
            <NavLink to="/">
                <img src={logoSVG} alt="Logo Académico de Viseu" />
            </NavLink>
            <NavLink to="/login" className='rounded font-bold login'>
                <span className="material-symbols-outlined icon">
                    login
                </span>
                Autenticar
            </NavLink>
        </div>
    );
}
