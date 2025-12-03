import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { ItemCard } from "../components/ItemCard";
import "../App.css";

export const ItemsFavorites = () => {
  const { watchlist } = useContext(GlobalContext);

  return (
    <div data-testid="favorite-1" className="item-page">
      <div className="container">
        <div className="header">
          <h1 className="favouritesHeading">Favourite Items</h1>

          <span className="count-pill">
            {watchlist.length} {watchlist.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        {watchlist.length > 0 ? (
          <div className="item-grid">
            {watchlist.map((item) => (
              <ItemCard item={item} key={item.id} type="watchlist" />
            ))}
          </div>
        ) : (
          <h2 className="noFavs">No items in your list! Add some!</h2>
        )}
      </div>
    </div>
  );
};
