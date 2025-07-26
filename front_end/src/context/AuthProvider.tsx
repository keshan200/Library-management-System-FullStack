import { useEffect, useState } from "react"
import apiClient, { setHeader } from "../service/apiClient"
import router from "../router"
import { AuthContext } from "./AuthContext"

interface AuthProviderProps{
   children :React.ReactNode
}


export const AuthProvider  = ({children}:AuthProviderProps) => {
   
   const [isLoggedIn , setIsLoggedIn] = useState<boolean>(false)
   const [accessToken , setAccessToken] =  useState<string>("")
   const [isAuthenticating , setIsAuthenticating] =  useState<boolean>(true)
   

   const login  =  (token:string) => {
    setIsLoggedIn(true)
    setAccessToken(token)
   }
   
   const logout =  () => setIsLoggedIn(false)


   useEffect(()=>{
      setHeader(accessToken)
   },[accessToken])

  
   useEffect(() => {
    const tryRefresh =  async () => {
        try{
         
            const result =  await apiClient .post("/auth/refresh-token")
            setAccessToken(result.data.accessToken)
            setIsLoggedIn(true)

            const currentPath = window.location.pathname

            if(children === "/login" || currentPath === "/signup" || currentPath === "/"){
                console.log ("currentPath" , currentPath)
                router.navigate("/dashboard")
            }

        }catch(error:any){
              setAccessToken("")
              setIsLoggedIn(false)
        }finally{
            setIsAuthenticating(false)
        }
    }

    tryRefresh()
   },[])


    return<AuthContext.Provider value={{isLoggedIn,login,logout,isAuthenticating}}>{children}</AuthContext.Provider>

}