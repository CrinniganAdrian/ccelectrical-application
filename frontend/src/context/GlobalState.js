import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// Helper function to get current user ID
const getCurrentUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.id : null;
};

// Helper function to get user-specific key
const getUserKey = (baseKey) => {
  const userId = getCurrentUserId();
  return userId ? `${baseKey}_user_${userId}` : baseKey;
};

// initial state
const initialState = {
  favItems: localStorage.getItem(getUserKey("favItems"))
    ? JSON.parse(localStorage.getItem(getUserKey("favItems")))
    : [],
  favProjects: localStorage.getItem(getUserKey("favProjects"))
    ? JSON.parse(localStorage.getItem(getUserKey("favProjects")))
    : [],
  favServices: localStorage.getItem(getUserKey("favServices"))
    ? JSON.parse(localStorage.getItem(getUserKey("favServices")))
    : [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem(getUserKey("favItems"), JSON.stringify(state.favItems));
    localStorage.setItem(getUserKey("favProjects"), JSON.stringify(state.favProjects));
    localStorage.setItem(getUserKey("favServices"), JSON.stringify(state.favServices));
  }, [state]);

  // Items actions
  const addItemToFavorites = (item) => {
    dispatch({ type: "ADD_ITEM_TO_FAVORITES", payload: item });
  };

  const removeItemFromFavorites = (id) => {
    dispatch({ type: "REMOVE_ITEM_FROM_FAVORITES", payload: id });
  };

  const toggleItemFavorite = (item) => {
    const exists = state.favItems.find((i) => i.id === item.id);
    if (exists) {
      removeItemFromFavorites(item.id);
    } else {
      addItemToFavorites(item);
    }
  };

  // Projects actions
  const addProjectToFavorites = (project) => {
    dispatch({ type: "ADD_PROJECT_TO_FAVORITES", payload: project });
  };

  const removeProjectFromFavorites = (id) => {
    dispatch({ type: "REMOVE_PROJECT_FROM_FAVORITES", payload: id });
  };

  const toggleProjectFavorite = (project) => {
    const exists = state.favProjects.find((p) => p.id === project.id);
    if (exists) {
      removeProjectFromFavorites(project.id);
    } else {
      addProjectToFavorites(project);
    }
  };

  // Services actions
  const addServiceToFavorites = (service) => {
    dispatch({ type: "ADD_SERVICE_TO_FAVORITES", payload: service });
  };

  const removeServiceFromFavorites = (id) => {
    dispatch({ type: "REMOVE_SERVICE_FROM_FAVORITES", payload: id });
  };

  const toggleServiceFavorite = (service) => {
    const exists = state.favServices.find((s) => s.id === service.id);
    if (exists) {
      removeServiceFromFavorites(service.id);
    } else {
      addServiceToFavorites(service);
    }
  };

  // Clear all favorites (useful for logout)
  const clearAllFavorites = () => {
    dispatch({ type: "CLEAR_ALL_FAVORITES" });
  };

  return (
    <GlobalContext.Provider
      value={{
        favItems: state.favItems,
        favProjects: state.favProjects,
        favServices: state.favServices,
        addItemToFavorites,
        removeItemFromFavorites,
        toggleItemFavorite,
        addProjectToFavorites,
        removeProjectFromFavorites,
        toggleProjectFavorite,
        addServiceToFavorites,
        removeServiceFromFavorites,
        toggleServiceFavorite,
        clearAllFavorites,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
