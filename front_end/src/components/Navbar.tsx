import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Navbar = () => {
 

 return (
    <nav className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl border-b border-purple-500/20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo Section */}
          <div className='flex items-center space-x-3'>
            <div className='flex-shrink-0 flex items-center space-x-2'>
              <div className='bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl shadow-lg'>
              { /*icon*/}
              </div>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
                Gadget Vault
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-3'>
           
              <button
               
                className='group relative inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg hover:shadow-purple-500/25'
              >
            
                <span>Login</span>
              </button>
             
              <div className='flex items-center space-x-3'>
                <button
                 
                  className='group relative inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg'
                >
                
                  <span>Dashboard</span>
                </button>
                
                <div className='h-6 w-px bg-slate-600'></div>
                
                <button
                 
                  className='group relative inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg hover:shadow-red-500/25'
                >
                 
                  <span>Logout</span>
                </button>
              </div>
           
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
            
              className='relative inline-flex items-center justify-center p-2 rounded-lg text-purple-300 hover:text-white hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-all duration-200'
              aria-label="Toggle mobile menu"
            >
             
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
      
          <div className='md:hidden'>
            <div className='px-2 pt-4 pb-6 space-y-3 border-t border-purple-500/20 bg-slate-900/50 backdrop-blur-sm rounded-b-2xl'>
            
                <button
               
                  className='flex items-center space-x-3 w-full text-left bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg'
                >
                  
                  <span>Login</span>
                </button>
          
                <>
                  <button
                   
                    className='flex items-center space-x-3 w-full text-left bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg'
                  >
                 
                    <span>Dashboard</span>
                  </button>
                  
                  <button
                   
                    className='flex items-center space-x-3 w-full text-left bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg'
                  >
                    
                    <span>Logout</span>
                  </button>
                </>

  
            </div>
          </div>
       
      </div>
    </nav>
  );
}

export default Navbar
