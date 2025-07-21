import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  const location = useLocation();

  
  const hideNavbarRoutes = ["/"];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="h-screen">
      {shouldShowNavbar && (
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
