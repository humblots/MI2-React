import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Groups from './pages/Groups';
import Musicians from './pages/Musicians';
import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap";
import Login from "./pages/Login";

function App() {
    const [user, setUser] = useState("");

    // Permet d'avoir un state user partagé entre toutes les pages
    // Ce state est défini par Login lorsque les bons logins sont entrés
    let handleLogin = function (user) {
        setUser(user);
    }

    return (
        <Router>
            <div id="main-container">
                <Navbar user={user} />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/musicians' element={<Musicians user={user} />} />
                    <Route path='/groups' element={<Groups user={user} />} />
                    <Route path='/login' element={<Login user={user} onSubmit={handleLogin} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
