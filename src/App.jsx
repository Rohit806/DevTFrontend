import { useState } from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./Components/body";
import Login from "./Components/Login";

import "./App.css";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      {/* <h1 className="underline">Hello</h1> */}
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
             <Route path="/profile" element={"profile"} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
