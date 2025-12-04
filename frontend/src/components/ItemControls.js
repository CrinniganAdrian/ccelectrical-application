import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
export const ItemControls = ({ type, item }) => {
  const {
    removeItemFromFavorites,
    removeProjectFromFavorites,
    removeServiceFromFavorites,
  } = useContext(GlobalContext);
  return (
    <div className="inner-card-controls">
      {type === "favItems" && (
        <>
          <button
            className="ctrl-btn"
            onClick={() => removeItemFromFavorites(item.id)}
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}
      {type === "favProjects" && (
        <>
          <button
            className="ctrl-btn"
            onClick={() => removeProjectFromFavorites(item.id)}
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}
      {type === "favServices" && (
        <>
          <button
            className="ctrl-btn"
            onClick={() => removeServiceFromFavorites(item.id)}
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}
    </div>
  );
};