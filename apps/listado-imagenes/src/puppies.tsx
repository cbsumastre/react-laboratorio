import React from "react";
import { ShopContext } from "./shopContext";
import { PictureInfoSelected } from "./types";
import { getPuppies } from "./api";
import { Card } from "./card";

export const Puppies: React.FC = () => {
    const shopContext = React.useContext(ShopContext);
    const [puppies, setPuppies] = React.useState<PictureInfoSelected[]>([]);

    React.useEffect(() => {
        setPuppies(getPuppies().map(item => {
            return {
                ...item,
                selected: shopContext?.cartItems.includes(item.id) || false
            }
        }))
    }, [shopContext])


    return (<div className="container-puppies">
        {puppies && puppies.map(item => {
            return <Card key={item.id} item={item} />
        })}
    </div>)
}