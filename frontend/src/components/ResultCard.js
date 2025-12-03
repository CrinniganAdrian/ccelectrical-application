import React, { useContext , useState} from "react";
import Moment from "react-moment";
import { GlobalContext } from "../context/GlobalState";
import { DataItem2 } from './DataItem2';
import { FavoriteButton } from '../components/FavoriteButton';
import "../pages/Data.css";
export const ResultCard = ({ item }) => {
  const {
    addItemToWatchlist,
    watchlist,
    watched,
  } = useContext(GlobalContext);
  let storedItem = watchlist.find((o) => o.id === item.id);
  const watchlistDisabled = storedItem
    ? true
    : false;
  const [iconView, setIconView] = useState(false);
  return (
      <table className="table table-borderless">
        <thead>
          <tr>               
          </tr>
        </thead>
        <tbody className="table__data">
            <tr key = {item.id}>
              <DataItem2 id="data__cards__item"
                src={item.imageUrl}
                label={item.name}
              />
              <td className="data__item__description">
                {item.description}
              </td>
              <td className="crud__action__buttons">
                <button
                  id="favouriteOn" className="btn btn-primary"
                  disabled={watchlistDisabled}
                  onClick={() => {addItemToWatchlist(item); setIconView(iconView, !iconView)}}
                >
                  { iconView
                    ? <i class="fas fa-star"></i>
                    : <i class="far fa-star"></i>
                  }
                </button>
              </td>
            </tr>
          </tbody>
      </table>
  );
};