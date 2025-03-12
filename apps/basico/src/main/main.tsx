import React from "react";
import { Link } from "react-router-dom";
import { router } from "../router";

export const MainPage: React.FC = () => {
    return <div className="main-container">
        <div className="menu">
            <Link to={router.listGithub}>Ir a Github Members</Link>
            <Link to={router.listRickMorty}>Ir a Rick y Morty</Link>
        </div>
        <footer className="footer">Master Front End Lemoncode XVII - Módulo 4.1 - Frameworks - React Laboratorio Básico</footer>
    </div>

}