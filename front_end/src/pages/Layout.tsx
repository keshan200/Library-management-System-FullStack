import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/useAuth";
import LibraryLoading from "../components/LoadingAnime";

const Layout = () => {
 const {isAuthenticating,isLoggedIn} = useAuth()




 if(isAuthenticating){
  return <LibraryLoading />
  }


  const hideNavbar = location.pathname === "/" || location.pathname === "/login";


  return (
    <div className="h-screen overflow-hidden">
     
       {!hideNavbar && isLoggedIn &&(
        <div>
          <Navbar />
        </div>
      )}
      

      <main className="h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
