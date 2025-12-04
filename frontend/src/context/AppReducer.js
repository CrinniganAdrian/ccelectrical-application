export default (state, action) => {
  switch (action.type) {
    // Items actions
    case "ADD_ITEM_TO_FAVORITES":
      return {
        ...state,
        favItems: [action.payload, ...state.favItems],
      };
    case "REMOVE_ITEM_FROM_FAVORITES":
      return {
        ...state,
        favItems: state.favItems.filter(
          (item) => item.id !== action.payload
        ),
      };
    
    // Projects actions
    case "ADD_PROJECT_TO_FAVORITES":
      return {
        ...state,
        favProjects: [action.payload, ...state.favProjects],
      };
    case "REMOVE_PROJECT_FROM_FAVORITES":
      return {
        ...state,
        favProjects: state.favProjects.filter(
          (project) => project.id !== action.payload
        ),
      };
    
    // Services actions
    case "ADD_SERVICE_TO_FAVORITES":
      return {
        ...state,
        favServices: [action.payload, ...state.favServices],
      };
    case "REMOVE_SERVICE_FROM_FAVORITES":
      return {
        ...state,
        favServices: state.favServices.filter(
          (service) => service.id !== action.payload
        ),
      };
    
    // Clear all favorites
    case "CLEAR_ALL_FAVORITES":
      return {
        ...state,
        favItems: [],
        favProjects: [],
        favServices: [],
      };
    
    default:
      return state;
  }
};
