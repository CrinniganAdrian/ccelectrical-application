import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { ItemCard } from "../components/ItemCard";

export const ProjectsFavorites = () => {
  const { favProjects } = useContext(GlobalContext);

  return (
    <div data-testid="favorite-1" className="item-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Favourite Projects</h1>

          <span className="count-pill">
            {favProjects.length} {favProjects.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        {favProjects.length > 0 ? (
          <div className="item-grid">
            {favProjects.map((item) => (
              <ItemCard item={item} key={item.id} type="favProjects" />
            ))}
          </div>
        ) : (
          <h2 className="no-movies">No items in your list! Add some!</h2>
        )}
      </div>
    </div>
  );
};
