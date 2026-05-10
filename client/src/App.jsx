import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";


function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location.pathname]);

  return (
    <div className="bg-white">
     
      <AllRoutes />
      
    </div>
  );
}

export default App;
