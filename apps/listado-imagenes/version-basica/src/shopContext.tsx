import React from "react";

interface ShopContextType {
    cartItems: string[];
    addToCart: (id: string) => void;
    removeToCart: (id: string) => void;
}

export const ShopContext = React.createContext<ShopContextType | undefined>(undefined)

interface ShopProviderProps {
    children: React.ReactNode;
}

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = React.useState<string[]>([]);

    const addToCart = (id: string) => {
        if (!cartItems.includes(id)) {
            setCartItems([...cartItems, id]);
        }
    };

    const removeToCart = (id: string) => {
        setCartItems(cartItems.filter(i=>i!==id))
    }

    return (
        <ShopContext.Provider value={{ cartItems, addToCart, removeToCart }}>
            {children}
        </ShopContext.Provider>
    );
};

