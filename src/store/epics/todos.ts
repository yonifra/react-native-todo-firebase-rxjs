import firestore from '@react-native-firebase/firestore';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const getTodosEpic = (action$: any) => 
  action$.pipe(
    ofType("REQUEST_TODOS"),
    switchMap(() => 
      firestore()
      .collection('todos')
      .orderBy("createAt", "desc")
      .get()
      .then(response => {
        let payload: any = []
        response.forEach((doc) => 
        payload.push({
          ...doc.data(),
          id: doc.id
        }))
        return ({type: "SET_TODOS", payload})
      })
    )
)

export const addTodoEpic = (action$: any) => 
  action$.pipe(
    ofType("ADD_TODO"),
    switchMap(({payload}: any) => 
      firestore()
      .collection('todos')
      .add(payload)
      .then(({id}: any)=> {
        Object.assign(payload,{id})
        return ({type: "SUCCESS_ADD_TODO", payload})
      })
    )
)

export const editTodoEpic = (action$: any) => 
  action$.pipe(
    ofType("UPDATE_TODO"),
    switchMap(({payload}: any) => 
      firestore()
      .collection('todos')
      .doc(payload.id)
      .update(payload)
      .then(()=> 
        ({type: "SUCCESS_UPDATE_TODO"}))
    )
)

export const deleteTodoEpic = (action$: any) => 
  action$.pipe(
    ofType("DELETE_TODO"),
    switchMap(({payload}: any) => 
      firestore()
      .collection('todos')
      .doc(payload.id)
      .delete()
      .then(()=> 
        ({type: "SUCCESS_DELETE_TODO"}))
    )
)