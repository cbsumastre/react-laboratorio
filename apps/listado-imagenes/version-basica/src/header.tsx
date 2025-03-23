import React from "react";
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
    return <header>
        <h1>Catálogo de Fotografías de Mascotas</h1>
        <nav>
            <ul>
                <li><NavLink to="/kitties" className={({ isActive }) => ((isActive || location.pathname === '/') ? 'active' : 'no-active')}>Kitties</NavLink></li>
                <li><NavLink to="/puppies" className={({ isActive }) => (isActive ? 'active' : 'no-active')}>Puppies</NavLink></li>
            </ul>
        </nav>
    </header>
}