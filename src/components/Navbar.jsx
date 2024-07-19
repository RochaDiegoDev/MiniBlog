import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { activate } from "firebase/remote-config";
import { useAutentication } from "../Hooks/useAutentication";
import { useAuthValue } from "../context/AuthContext";


export const Navbar = () => {
    const { user } = useAuthValue();
    const {logout} = useAutentication();

    return (
        <nav className={styles.navbar}>
            <NavLink className={styles.brand} to="/" >
                Mini <span>Blog</span>
            </NavLink>

            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/"
                        className={({ isActive }) => (isActive ? styles.active : "")}>
                            Home
                    </NavLink>
                </li>

                {!user && (
                    <>
                    <li>
                    <NavLink to="/login"
                        className={({ isActive }) => (isActive ? styles.active : "")}>
                            Entrar 
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/register"
                        className={({ isActive }) => (isActive ? styles.active : "")}>
                            Cadastrar 
                    </NavLink>
                </li>
                    </>
                )}

                
                {user && (
                    <>
                    <li>
                        <NavLink to="/post/create"
                            className={({ isActive }) => (isActive ? styles.active : "")}>
                             Novo Post
                        </NavLink>
                    </li>

                    
                                      
                    <li>
                        <NavLink to="/dashbord"
                            className={({ isActive }) => (isActive ? styles.active : "")}> 
                            DashBord 
                        </NavLink>
                    </li>
                </>
                )}

                <li>
                    <NavLink to="/About"
                        className={({ isActive }) => (isActive ? styles.active : "")}> 
                        Sobre
                    </NavLink>
                </li>

                {user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                )}
            </ul>
        </nav>
    )
};