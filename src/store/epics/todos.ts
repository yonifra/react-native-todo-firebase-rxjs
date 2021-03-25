import firestore from '@react-native-firebase/firestore';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const getTodosEpic = (action$: any) => 
  action$.pipe(
    ofType("REQUEST_TODOS"),
    switchMap(() => 
      firestore()
      .collection('todos')
      .orderBy("timestamp", "desc")
      .get()
      .then(response => {
        let payload: any = []
        response.forEach((doc) => 
          payload.push({
            ...doc.data(),
            id: doc.id
          })
        ) 
        return ({type: "SET_TODOS", payload})
      })
    )
)

export const addTodoEpic = (action$: any) => 
  action$.pipe(
    ofType("REQUEST_ADD_TODO"),
    switchMap(({payload}: any) => 
      firestore()
      .collection('todos')
      .add(payload)
      .then(({id}: any)=> {
        Object.assign(payload,{id})
        return ({type: "ADD_TODO", payload})
      })
    )
)

export const editTodoEpic = (action$: any, store: any) => 
  action$.pipe(
    ofType("REQUEST_EDIT_TODO"),
    switchMap(({payload}: any) => 
      firestore()
      .collection('todos')
      .doc(payload.id)
      .update(payload)
      .then(()=> 
        ({type: "UPDATE_TODO", payload}))
    )
)

export const deleteTodoEpic = (action$: any) => 
  action$.pipe(
    ofType("REQUEST_DELETE_TODO"),
    switchMap(({payload}: any) => 
      firestore()
      .collection('todos')
      .doc(payload.id)
      .delete()
      .then(()=> 
        ({type: "DELETE_TODO", payload}))
    )
)