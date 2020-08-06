import {createContext} from 'react'

export default createContext({
    auth:{
    user_id: null,
    name: null,
    isAuth: false,
    loading: false,
    error: null
    },
    signin: () =>{},
    signinInit: ()=>{},
    signout:()=>{},
    acquire: ()=>{}
})