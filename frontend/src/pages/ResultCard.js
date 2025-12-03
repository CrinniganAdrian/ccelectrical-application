import React, { useContext } from "react";
import Moment from "react-moment";
import { Favourites } from "../components/favourites.component";
import { GlobalContext } from "../context/GlobalState";

export const FavoritesList = ({ movie, item, service, project }) => {
  const {
    addMovieToWatchlist,
    addMovieToWatched,
    watchlist,
    watched,

    addItemToFavorites,
    removeItemFromFavorites,
    favorites,
    
    //addServiceToFavorites,
    //addProjectToFavorites,
  } = useContext(GlobalContext);

  let storedMovie = watchlist.find((o) => o.id === movie.id);
  let storedMovieWatched = watched.find((o) => o.id === movie.id);

  let unstoreItem = favorites.find((o) => o.id === item.id);

  //let storedService = favorites.find((o) => o.id === service.id);
  //let storedProject = favorites.find((o) => o.id === project.id);

  
  const watchlistDisabled = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;
  

  const watchedDisabled = storedMovieWatched ? true : false;

  const unstoredDisabled = unstoreItem ? true : false;

  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        ) : (
          <div className="filler-poster" />
        )}
      </div>

      <div className="info">
        <div className="header">
          <h3 className="title">{movie.title}</h3>
          <h4 className="release-date">
            <Moment format="YYYY">{movie.release_date}</Moment>
          </h4>
        </div>

        <div className="controls">
          <button
            className="btn"
            disabled={watchlistDisabled}
            onClick={() => addMovieToWatchlist(movie)}
          >
            Add to Watchlist
          </button>

          <button
            className="btn"
            disabled={watchedDisabled}
            onClick={() => addMovieToWatched(movie)}
          >
            Add to Watched
          </button>
        </div>
      </div>
    </div>
  );
}
export default Favourites;
