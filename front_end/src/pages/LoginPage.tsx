import { IoLibrary } from "react-icons/io5";



const Login = () => {

  return(
    <> 
    <main className="w-screen h-screen bg-black ">
      <section className="w-screen h-screen bg-black flex justify-center items-center">
      
       <div className="h-3/4 w-5/6 bg-white flex">
        
           <section className=" p-8  flex flex-col justify-center items-center w-1/2 gap-8">
             <div className="flex flex-col gap-8 items-center">
                    <IoLibrary size={80} color="black" /> 
                 <h1 className="text-4xl font-bold text-center">Welcome Back !!</h1>
                 <h2 className="text-center">Please enter your credential to login</h2>
            </div>
        
             <div className="flex flex-col justify-center items-center gap-5">
               <input
                 type="text"
                 placeholder="Username"
                 className="border border-black rounded-md px-4 py-2 w-64 focus:outline-none focus:border-blue-500 "
               />

                <input
                 type="text"
                 placeholder="Password"
                 className="border border-black rounded-md px-4 py-2 w-64 focus:outline-none focus:border-blue-500"
               />
              
              <p className="text-left">Forgot Password ?</p>

             <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray transition duration-300 w-64">
             Login
             </button>


             </div>

           </section>
            
           <section className=" w-1/2  h-4/4 bg-black rounded-l-3xl flex flex-col justify-center items-center gap-5">
          
             <div className="flex flex-col gap-8 items-center">
                    <IoLibrary size={80} color="white" /> 
                 <h1 className="text-4xl text-white font-bold text-center">COLOMBO</h1>
                  <h1 className="text-4xl text-white font-bold text-center">LIBRARY</h1>
                
            </div>
             
           </section> 
       
       </div>
       
      </section>
        
    </main>
  
    </>

  )

}


export default Login