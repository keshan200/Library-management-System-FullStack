import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import AdminRoutes from "./pages/AdminRoutes";



const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
       {path:"/", element: <Login /> },
       {path:"/login", element: <Login /> },
      

       {
         element:<AdminRoutes />,
         children:[
          {path:"/dashboard", element: <Dashboard /> },

         ]

       }
      
      
    ],
 },
])

export default router