import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import "./App.css"

const App = ()=>{
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/profile" exact element={<Profile />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/register" exact element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;