const initialState = {
    user:null,
    token:null
  }
  
export default (state= initialState, {type, payload}: any) => {
    switch (type) {
      case 'SET_AUTH':
        return {
          ...state,
          ...payload
        };
      default:
        return state;
    }
};