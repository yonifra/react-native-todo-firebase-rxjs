const initialState = {
  data:[]
}

export default (state= initialState, {type, payload}: any) => {
    switch (type) {
      case 'SET_TODOS':
        return {
          ...state,
          data: payload,
        };
      case 'ADD_TODO':
        return {
          ...state,
          data: [payload, ...state.data],
        };
      case 'UPDATE_TODO':
          return {
            ...state,
            data: state.data.map((e: any) => e.id===payload?.id ? {...e, ...payload} : e)
          }
      case 'DELETE_TODO':
        return {
          ...state,
          data: state.data.filter((e: any) => e.id!==payload?.id),
        };  
      default:
        return state;
    }
};