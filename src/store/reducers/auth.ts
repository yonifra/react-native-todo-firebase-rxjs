const initialState = {
    user:null,
    token:null
  }
  
const auth = (state= initialState, {type, payload}: any) => {
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
  
export default auth;
    