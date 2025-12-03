import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { ItemCard } from "../components/ItemCard";

export const ServicesFavorites = () => {
  const { favServices } = useContext(GlobalContext);

  return (
    <div data-testid="favorite-1" className="item-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Favourite Items</h1>

          <span className="count-pill">
            {favServices.length} {favServices.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        {watchlist.length > 0 ? (
          <div className="item-grid">
            {favServices.map((item) => (
              <ItemCard item={item} key={item.id} type="favServices" />
            ))}
          </div>
        ) : (
          <h2 className="no-movies">No items in your list! Add some!</h2>
        )}
      </div>
    </div>
  );
};
