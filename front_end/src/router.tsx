import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import AdminRoutes from "./pages/AdminRoutes";

import{ ModernBookPage} from "./pages/BookManagment";

import { ModernReaderPage } from "./pages/ReadersManagment";
import SettingsPage from "./pages/SettingPage";
import ViewAllUsersPage from "./pages/UserSignUp";
import FullPageLayout from "./pages/FullPageLayout";
import LendingPage from "./pages/LendingPage";
import LendingDialog from "./components/LendingDialod";







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
          {path:"/lending",element :<LendingPage />},
         

         
         ]
       },

        {
            element: <FullPageLayout />, 
            children: [
              { path: "/setting", element: <SettingsPage /> },
              { path: "/users", element: <ViewAllUsersPage /> },
            ],
          },
      
      
    ],
 },
])

export default router


