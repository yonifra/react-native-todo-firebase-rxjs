import firestore from '@react-native-firebase/firestore';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const getTodosEpic = (action$: any, store: any) => 
  action$.pipe(
    ofType("REQUEST_TODOS"),
    switchMap(() => 
      firestore()
      .collection(`users`)
      .doc(store.value.auth.user.uid)
      .collection(`todos`)
      .orderBy("createAt", "desc")
      .get()
      .then(response => {
        let payload: any = []
        response.forEach((doc) => 
        payload.push({
          ...doc.data(),
          fireId: doc.id
        }))
        return ({type: "SET_TODOS", payload})
      })
    )
)

export const addTodoEpic =  (action$: any, store: any) => 
  action$.pipe(
    ofType("ADD_TODO"),
    switchMap(({payload}: any) => 
      firestore()
      .collection(`users`)
      .doc(store.value.auth.user.uid)
      .collection(`todos`)
      .add(payload)
      .then(({id: fireId}: any)=> {
        Object.assign(payload,{fireId})
        return ({type: "SUCCESS_ADD_TODO", payload})
      })
    )
)

export const editTodoEpic =  (action$: any, store: any) => 
  action$.pipe(
    ofType("UPDATE_TODO"),
    switchMap(({payload}: any) => 
      firestore()
      .collection(`users`)
      .doc(store.value.auth.user.uid)
      .collection(`todos`)
      .doc(payload.fireId)
      .update(payload)
      .then(()=> 
        ({type: "SUCCESS_UPDATE_TODO"}))
    )
)

export const deleteTodoEpic =  (action$: any, store: any) => 
  action$.pipe(
    ofType("DELETE_TODO"),
    switchMap(({payload}: any) => 
      firestore()
      .collection(`users`)
      .doc(store.value.auth.user.uid)
      .collection(`todos`)
      .doc(payload.fireId)
      .delete()
      .then(()=> 
        ({type: "SUCCESS_DELETE_TODO"}))
    )
)