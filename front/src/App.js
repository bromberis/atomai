import React, { useState, useCallback } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import NavigationMobile from "./components/navigation/NavigationMobile";

import { debounce } from "lodash";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  function handleResize() {
    setWidth(window.innerWidth);
  }
  const handler = useCallback(debounce(handleResize, 100), []);
  window.addEventListener("resize", () => handler());

  return (
    <>
      {width > 815 ? (
        <>
          <div className="row">
            <div className="col-2 p-0 position-fixed">
              <Navigation />
            </div>

            <div className="col-lg-10 offset-lg-2 log-md-10 offset-md-1 ">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-12 p-0 ">
              <NavigationMobile />
            </div>
            <div className="col-12">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
