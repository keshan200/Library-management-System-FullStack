import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import AdminRoutes from "./pages/AdminRoutes";

import{ ModernBookPage} from "./pages/BookManagment";

import { ModernReaderPage } from "./pages/ReadersManagment";
import SettingsPage from "./pages/SettingPage";





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
          {path:"/dashboard", element: <Dashboard />},
          {path:"/books", element: <ModernBookPage />},
          {path:"/members",element :<ModernReaderPage />},
          {path:"/setting",element : <SettingsPage />}
          
         ]

       }
      
      
    ],
 },
])

export default router


