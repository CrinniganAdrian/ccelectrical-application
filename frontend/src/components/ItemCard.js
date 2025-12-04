import React from "react";
import { ItemControls } from "./ItemControls";
export const ItemCard = ({ item, type }) => {
    return (
      <div className="item-card">
        <div className="overlay"></div>
        <div className="item-card-image-container">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="item-card-image"
          />
        </div>
        <div className="item-card-info">
          <h3 className="item-card-name">{item.name}</h3>
        </div>
        <ItemControls type={type} item={item} />
      </div>
    );
  };