import React from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "./shopContext";

export const Header: React.FC = () => {
    const shopContext = React.useContext(ShopContext);

    const handleOnClick = () => {
        shopContext?.openCart(!shopContext.isOpenCart)
    }

    return <header>
        <h1>Catálogo de Fotografías de Mascotas</h1>
        <nav>
            <ul>
                <li><NavLink to="/kitties" className={({ isActive }) => ((isActive || location.pathname === '/') ? 'active' : 'no-active')}>Kitties</NavLink></li>
                <li><NavLink to="/puppies" className={({ isActive }) => (isActive ? 'active' : 'no-active')}>Puppies</NavLink></li>
                <li onClick={handleOnClick}>{!shopContext?.isOpenCart ? `Ver Carrito (${shopContext?.cartItems.length})` : 'Ocultar Carrito'}</li>
            </ul>
        </nav>
    </header>
}