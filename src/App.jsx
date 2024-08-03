//Pages
import { Home } from "./Pages/Home/Home";
import { About } from "./Pages/About/About";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { CreatePost } from "./Pages/CreatePost/CreatePost";
import { Dasbord } from "./Pages/Dashboard/Dashbord";
import { Search } from "./Pages/Search/Search";
import { Post } from "./Pages/Post/Post";
import { EditePost } from "./Pages/EditPost/EditePost";

import PropTypes from "prop-types";

//Context
import { AuthProvider } from "./context/AuthContext";

//Componentes
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//Hooks
import { useState, useEffect } from "react";
import { useAutentication } from "./Hooks/useAutentication";

function App() {
    const [user, setUser] = useState(undefined);
    const { auth } = useAutentication();

    const loadingUser = user === undefined;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, [auth]);

    if (loadingUser) {
        return <p>Carregando...</p>;
    }

    console.log(user);
    return (
        <div className="App">
            <AuthProvider value={{ user }}>
                <BrowserRouter>
                    <Navbar />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/About" element={<About />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/posts/:id" element={<Post />} />
                            <Route
                                path="/Login"
                                element={
                                    !user ? <Login /> : <Navigate to="/" />
                                }
                            />
                            <Route
                                path="/Register"
                                element={
                                    !user ? <Register /> : <Navigate to="/" />
                                }
                            />
                            <Route
                                path="/posts/edite/:id"
                                element={
                                    user ? (
                                        <EditePost />
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />

                            <Route
                                path="/post/create"
                                element={
                                    user ? (
                                        <CreatePost />
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />

                            <Route
                                path="/dashbord"
                                element={
                                    user ? (
                                        <Dasbord />
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

App.propTypes = {
    children: PropTypes.string,
};

export default App;
