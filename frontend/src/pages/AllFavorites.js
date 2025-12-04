import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { ItemCard } from "../components/ItemCard";
import "../App.css";
import "./Data.css";

export const AllFavorites = () => {
  const { favItems, favProjects, favServices } = useContext(GlobalContext);
  const [filter, setFilter] = useState("all");

  // Combine all favorites with type labels
  const allFavorites = [
    ...favItems.map(item => ({ ...item, favoriteType: 'item' })),
    ...favProjects.map(project => ({ ...project, favoriteType: 'project' })),
    ...favServices.map(service => ({ ...service, favoriteType: 'service' }))
  ];

  // Filter based on selection
  const getFilteredFavorites = () => {
    switch(filter) {
      case 'items':
        return favItems.map(item => ({ ...item, favoriteType: 'item' }));
      case 'projects':
        return favProjects.map(project => ({ ...project, favoriteType: 'project' }));
      case 'services':
        return favServices.map(service => ({ ...service, favoriteType: 'service' }));
      default:
        return allFavorites;
    }
  };

  const filteredFavorites = getFilteredFavorites();
  const totalCount = allFavorites.length;

  // Get card type based on favorite type
  const getCardType = (favoriteType) => {
    switch(favoriteType) {
      case 'item':
        return 'favItems';
      case 'project':
        return 'favProjects';
      case 'service':
        return 'favServices';
      default:
        return 'favItems';
    }
  };

  return (
    <div className="item-page">
      <div className="container">
        <div className="header">
          <h1 className="favouritesHeading">My Favourites</h1>
          <span className="count-pill">
            {totalCount} {totalCount === 1 ? "Favourite" : "Favourites"}
          </span>
        </div>

        {/* Filter Dropdown */}
        <div className="favorites-filter-container">
          <label htmlFor="favorites-filter" className="filter-label">
            <i className="fa fa-filter"></i> Show:
          </label>
          <select 
            id="favorites-filter"
            className="favorites-filter-dropdown"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Favourites ({allFavorites.length})</option>
            <option value="items">Items Only ({favItems.length})</option>
            <option value="projects">Projects Only ({favProjects.length})</option>
            <option value="services">Services Only ({favServices.length})</option>
          </select>
        </div>

        {/* Section Headers */}
        {filter === "all" && totalCount > 0 && (
          <div className="favorites-sections">
            {favItems.length > 0 && (
              <div className="favorites-section">
                <h2 className="section-heading">
                  <i className="fa fa-cube"></i> Items ({favItems.length})
                </h2>
                <div className="item-grid">
                  {favItems.map((item) => (
                    <ItemCard item={item} key={`item-${item.id}`} type="favItems" />
                  ))}
                </div>
              </div>
            )}

            {favProjects.length > 0 && (
              <div className="favorites-section">
                <h2 className="section-heading">
                  <i className="fa fa-folder"></i> Projects ({favProjects.length})
                </h2>
                <div className="item-grid">
                  {favProjects.map((project) => (
                    <ItemCard item={project} key={`project-${project.id}`} type="favProjects" />
                  ))}
                </div>
              </div>
            )}

            {favServices.length > 0 && (
              <div className="favorites-section">
                <h2 className="section-heading">
                  <i className="fa fa-wrench"></i> Services ({favServices.length})
                </h2>
                <div className="item-grid">
                  {favServices.map((service) => (
                    <ItemCard item={service} key={`service-${service.id}`} type="favServices" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Filtered View */}
        {filter !== "all" && filteredFavorites.length > 0 && (
          <div className="item-grid">
            {filteredFavorites.map((item) => (
              <ItemCard 
                item={item} 
                key={`${item.favoriteType}-${item.id}`} 
                type={getCardType(item.favoriteType)} 
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredFavorites.length === 0 && (
          <h2 className="noFavs">
            {filter === "all" 
              ? "No favourites yet! Start adding your favorite items, projects, and services."
              : `No ${filter} in your favourites yet!`
            }
          </h2>
        )}
      </div>
    </div>
  );
};

