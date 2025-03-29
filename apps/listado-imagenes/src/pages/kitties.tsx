import React from "react";
import { ShopContext } from "../contexts/shopContext";
import { PictureInfoSelected } from "../types/pictureInfo";
import { getKitties } from "../api";
import { Card } from "../components/card";

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