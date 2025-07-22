import { Outlet } from "react-router-dom"
import Sidebar from "../components/SideBar"


const AdminRoutes =  () => {
    
    return(
       <div className = 'flex h-screen overflow-hidden'>
           
           <div className = 'flex-shirnk-0'>
                <Sidebar />
           </div>

           <div className = 'flex-1 overflow-y-auto bg-gray-50'>
                <Outlet />
           </div>
           

       </div>
    )


}

export default AdminRoutes