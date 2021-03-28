const initialState = {
    isSplashing: true,
  }
  
const apps = (state= initialState, {type}: any) => {
    switch (type) {
      case 'SET_DONE_SPLASH':
        return {
          ...state,
          isSplashing: false,
        };
      default:
        return state;
    }
};
  
export default apps;
    