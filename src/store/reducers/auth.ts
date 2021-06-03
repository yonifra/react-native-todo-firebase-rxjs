export interface IRSauth {
  user:object | undefined;
  token:string | undefined;
}

const initialState: IRSauth = {
    user:undefined,
    token:undefined
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
    