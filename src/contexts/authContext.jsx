
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';


export const authContext = createContext();

export default function AuthContextProvider({children}){

    const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem("token") !=  null);
        console.log("isLoggedIn", isLoggedIn);

    useEffect(()=>{
        if(localStorage.getItem('token') != null){
            VerifyToken()
        }
    }, [])

    function VerifyToken(){
        axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken",{
            headers:{
                token: localStorage.getItem("token")
            }
        }).then((res)=>{
            console.log("res", res);
        }).catch((err)=>{
            console.log(err);
            localStorage.removeItem('token')
            setisLoggedIn(false)
        })
    }
        
    return <authContext.Provider value={{isLoggedIn, setisLoggedIn}}>
        {children}
    </authContext.Provider>
}