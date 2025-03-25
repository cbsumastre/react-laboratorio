import React from "react";
import { ShopContext } from "./shopContext";
import { PictureInfoSelected } from "./types";
import { getKitties } from "./api";
import { Card } from "./card";

export const Kitties: React.FC = () => {
    const shopContext = React.useContext(ShopContext);
    const [kitties, setKitties] = React.useState<PictureInfoSelected[]>([]);

    React.useEffect(() => {
        setKitties(getKitties().map(item => {
            return {
                ...item,
                selected: shopContext?.cartItems.includes(item.id) || false
            }
        }))
    }, [shopContext])


    return (<div className="container-kitties">
        {kitties && kitties.map(item => {
            return <Card key={item.id} item={item} />
        })}
    </div>)
}