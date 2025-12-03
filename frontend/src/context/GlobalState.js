import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  favServices: localStorage.getItem("favServices")
    ? JSON.parse(localStorage.getItem("favServices"))
    : [],
  
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("favServices", JSON.stringify(state.favServices));
  }, [state]);

  // actions
  const addItemToWatchlist = (item) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: item });
  };

  const removeItemFromWatchlist = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };

  

  const moveToWatchlist = (item) => {
    dispatch({ type: "MOVE_TO_WATCHLIST", payload: item });
  };


  const addItemToFavServices = (item) => {
    dispatch({ type: "ADD_MOVIE_TO_FAVSERVICES", payload: item });
  };

  const moveToFavServices = (item) => {
    dispatch({ type: "MOVE_TO_FAVSERVICES", payload: item });
  };

  

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        addItemToWatchlist,
        removeItemFromWatchlist,
        moveToWatchlist,
        moveToFavServices,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
