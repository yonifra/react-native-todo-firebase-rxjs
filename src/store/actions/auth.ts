type Action = {
    type:string;
    payload:any;
}

export const setAuth= (payload: any): Action=> ({type:"SET_AUTH", payload});