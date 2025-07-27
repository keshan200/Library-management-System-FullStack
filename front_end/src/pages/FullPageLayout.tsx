import { Outlet } from "react-router-dom";

 const FullPageLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      

      <div className="flex-1 overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}


export default FullPageLayout