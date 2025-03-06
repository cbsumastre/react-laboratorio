import React from "react";
import { PictureInfoSelected } from "./types";
import { ShopContext } from "./shopContext";

interface Props {
    item: PictureInfoSelected
}

export const Card: React.FC<Props> = ({ item }) => {

    const shopContext = React.useContext(ShopContext);

    const handleChange = (item: PictureInfoSelected) => {
        if (item.selected) {
            shopContext?.removeToCart(item.id)
        }
        else {
            shopContext?.addToCart(item.id)
        }
    }

    return (<div className="card" title={item.title}>
        <img src={item.picUrl} alt={item.title} />
        <h3>{item.title}</h3>
        <div className="container-check" onClick={() => handleChange(item)}>
            <input type="checkbox" checked={item.selected} onChange={() => handleChange(item)} /> Comprar
        </div>
    </div>
    )
}   
