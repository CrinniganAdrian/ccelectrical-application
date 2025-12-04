/**
 * Migration utility to clean up old favorites localStorage structure
 * This should be run once when the app loads to ensure clean state
 */
export const migrateFavoritesStorage = () => {
  // Check if old 'watchlist' exists (was used for all favorites before)
  const oldWatchlist = localStorage.getItem('watchlist');
  
  // If the new structure doesn't exist but old one does, clear old data
  const hasFavItems = localStorage.getItem('favItems');
  const hasFavProjects = localStorage.getItem('favProjects');
  const hasFavServices = localStorage.getItem('favServices');
  
  // If we have old structure but not new structure, remove old to prevent confusion
  if (oldWatchlist && !hasFavItems && !hasFavProjects && !hasFavServices) {
    console.log('Migrating favorites structure...');
    localStorage.removeItem('watchlist');
    localStorage.removeItem('watched'); // Remove old watched list too if it exists
    localStorage.setItem('favItems', '[]');
    localStorage.setItem('favProjects', '[]');
    localStorage.setItem('favServices', '[]');
    console.log('Favorites migration complete. Users will need to re-add favorites.');
  }
};

