import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { migrateFavoritesStorage } from "./utils/migrateFavorites";

import 'font-awesome/css/font-awesome.min.css'

// Migrate old favorites storage structure to new one
migrateFavoritesStorage();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
