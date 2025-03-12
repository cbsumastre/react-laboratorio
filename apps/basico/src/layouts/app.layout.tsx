import React from "react";
import { Link } from "react-router-dom";
import { router } from "../router";

interface Props {
    children: React.ReactNode
}

export const AppLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="app-container">
            <div className="header">
                <Link to={router.root}>Volver a menu principal</Link>
            </div>
            {children}
        </div>
    );
}