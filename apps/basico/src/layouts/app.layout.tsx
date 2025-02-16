import React from "react";
import { Link } from "react-router-dom";

interface Props {
    children: React.ReactNode
}

export const AppLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="app-container">
            <div className="header">
                <Link to="/">Volver a menu principal</Link>
            </div>
            {children}
        </div>
    );
}