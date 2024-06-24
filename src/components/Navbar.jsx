import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { activate } from "firebase/remote-config";

export const Navbar =() => {
    return(
        <nav className={styles.navbar}>
            <NavLink className={styles.brand} to = "/" >
                Mini <span>Blog</span>
            </NavLink>

            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/" className={({isActive}) => (isActive ? styles.active : "")}> HOME </NavLink>   
                </li>
                <li>
                    <NavLink to="/Login" className={({isActive}) => (isActive ? styles.active : "")}> Entrar  </NavLink>
                </li>
                <li>
                    <NavLink to="/Register" className={({isActive}) => (isActive ? styles.active : "")}> Cadastrar </NavLink>
                </li>
                <li>
                    <NavLink to="/About" className={({isActive}) => (isActive ? styles.active : "")}> SOBRE </NavLink>
                </li>
            </ul>
        </nav>
    )
};