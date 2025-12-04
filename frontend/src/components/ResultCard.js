import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { DataItem2 } from './DataItem2';
import "../pages/Data.css";

export const ResultCard = ({ item, type }) => {
  const {
    favItems,
    favProjects,
    favServices,
    toggleItemFavorite,
    toggleProjectFavorite,
    toggleServiceFavorite,
  } = useContext(GlobalContext);

  // Determine which array and toggle function to use based on type
  let isFavorited = false;
  let toggleFavorite = null;

  if (type === 'item') {
    isFavorited = favItems.find((i) => i.id === item.id) ? true : false;
    toggleFavorite = () => toggleItemFavorite(item);
  } else if (type === 'project') {
    isFavorited = favProjects.find((p) => p.id === item.id) ? true : false;
    toggleFavorite = () => toggleProjectFavorite(item);
  } else if (type === 'service') {
    isFavorited = favServices.find((s) => s.id === item.id) ? true : false;
    toggleFavorite = () => toggleServiceFavorite(item);
  }

  return (
      <table className="table table-borderless">
        <thead>
          <tr>               
          </tr>
        </thead>
        <tbody className="table__data">
            <tr key={item.id}>
              <DataItem2 id="data__cards__item"
                src={item.imageUrl}
                label={item.name}
              />
              <td className="data__item__description">
                {item.description}
              </td>
              <td className="crud__action__buttons">
                <button
                  id="favouriteOn" 
                  className="btn btn-primary"
                  onClick={toggleFavorite}
                >
                  {isFavorited
                    ? <i className="fas fa-star"></i>
                    : <i className="far fa-star"></i>
                  }
                </button>
              </td>
            </tr>
          </tbody>
      </table>
  );
};