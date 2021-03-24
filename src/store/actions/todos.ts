export const getTodos= (payload: any)=> ({type:"REQUEST_TODOS", payload});
export const addTodo= (payload: any)=> ({type:"REQUEST_ADD_TODO", payload});
export const editTodo= (payload: any)=> ({type:"REQUEST_EDIT_TODO", payload});
export const deleteTodo= (payload: any)=> ({type:"REQUEST_DELETE_TODO", payload});