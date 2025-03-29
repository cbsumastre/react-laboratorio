import stock from "./mock/stock.json"
import { PictureInfo } from "../types/pictureInfo";

interface Stock {
    id: string;
    pic_url: string;
    name: string;
}

interface StockData {
    cats: Stock[],
    dogs: Stock[]
}

const mapStockToData = (data: Stock[]): PictureInfo[] => {
    const dataArray: PictureInfo[] = [];
    data.forEach((s: Stock) => {
        dataArray.push({
            id: s.id,
            picUrl: s.pic_url,
            title: s.name
        })
    });
    return dataArray;
}

export const getKitties = (): PictureInfo[] => {
    return mapStockToData((stock as StockData).cats);
}

export const getPuppies = () => {
    return mapStockToData((stock as StockData).dogs);
}

export const getInfo = (id: string): Stock => {
    let idx = (stock as StockData).cats.findIndex(item => item.id === id)
    if (idx >= 0) {
        return (stock as StockData).cats[idx]
    }
    idx = (stock as StockData).dogs.findIndex(item => item.id === id)
    return (stock as StockData).dogs[idx]

}