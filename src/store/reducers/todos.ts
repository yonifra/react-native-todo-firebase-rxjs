export interface IRStodo {
  id:string;
  fireId?:string;
  title:string;
  isDone?:boolean;
  createAt?:Date;
  createBy?:string 
}
export interface IRStodos {
  data: IRStodo[];
} 

const initialState: IRStodos = {
  data:[]
}

const todos = (state= initialState, {type, payload}: any) => {
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
            data: state.data.map((e: IRStodo) => e.id===payload?.id ? {...e, ...payload} : e)
          }
      case 'DELETE_TODO':
        return {
          ...state,
          data: state.data.filter((e: IRStodo) => e.id!==payload?.id),
        };  
      default:
        return state;
    }
};
export default todos