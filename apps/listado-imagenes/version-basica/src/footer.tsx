import React from "react";

import heartIcon from "./assets/heart_icon.svg";

export const Footer: React.FC = () => {
    return <footer>Made with  <img src={heartIcon} alt="love" title="love" /> by <a href="https://github.com/cbsumastre" target="_blank">@cbsumastre</a> in Madrid 03/2025</footer>
}