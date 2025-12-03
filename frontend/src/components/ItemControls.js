import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
export const ItemControls = ({ type, item }) => {
  const {
    removeItemFromWatchlist,
    addItemToFavorites,
  } = useContext(GlobalContext);
  return (
    <div className="inner-card-controls">
      {type === "watchlist" && (
        <>
          <button
            className="ctrl-btn"
            onClick={() => removeItemFromWatchlist(item.id)}
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}
    </div>
  );
};