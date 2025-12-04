import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { ItemCard } from "../components/ItemCard";
import "../App.css";

export const ItemsFavorites = () => {
  const { favItems } = useContext(GlobalContext);

  return (
    <div data-testid="favorite-1" className="item-page">
      <div className="container">
        <div className="header">
          <h1 className="favouritesHeading">Favourite Items</h1>

          <span className="count-pill">
            {favItems.length} {favItems.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        {favItems.length > 0 ? (
          <div className="item-grid">
            {favItems.map((item) => (
              <ItemCard item={item} key={item.id} type="favItems" />
            ))}
          </div>
        ) : (
          <h2 className="noFavs">No items in your list! Add some!</h2>
        )}
      </div>
    </div>
  );
};
