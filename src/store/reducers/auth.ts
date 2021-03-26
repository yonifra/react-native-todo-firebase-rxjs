const initialState = {
    profile:null,
    token:null
  }
  
  const todos = (state= initialState, {type, payload}: any) => {
      switch (type) {
        case 'SET_AUTH':
          return {
            ...state,
            profile: payload.profile,
            token: payload.token,
          };
        default:
          return state;
      }
  };
    
  export default todos;
    