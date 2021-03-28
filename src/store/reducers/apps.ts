const initialState = {
    isSplashing: true,
  }
  
export default (state= initialState, {type}: any) => {
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