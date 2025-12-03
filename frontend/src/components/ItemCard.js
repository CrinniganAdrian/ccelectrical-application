import React from "react";
import { ItemControls } from "./ItemControls";
export const ItemCard = ({ item, type }) => {
    return (
      <div className="item-card">
        <div className="overlay"></div>
        <img
          src={item.imageUrl}
          alt={item.name}
        />
        <ItemControls type={type} item={item} />
      </div>
    );
  };