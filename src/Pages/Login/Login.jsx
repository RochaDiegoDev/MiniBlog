import styles from "./Login.module.css";

import { useAutentication } from "../../Hooks/useAutentication";
import { useState, useEffect,  } from "react";

export const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login, error: authError, loading} = useAutentication();

    const handleSubmit = async (e) => { //serve para nao enviar o formulario
        e.preventDefault();

        setError("");

            const user = {
                email,
                password,
            };

            const res = await login(user);
            console.log(res);
    };

    useEffect(()=>{
        if(authError) {
            setError(authError);
        }
    }, [authError]);


    return (

        <div className={styles.login}>
            <h1>Entrar</h1>
            <p>Faça o login para poder utilizar o sistema</p>
            <form onSubmit={handleSubmit}>

                <label>
                    <span>Email:</span>
                    <input type="E-mail"
                        name="email"
                        required placeholder="Digite seu E-mail "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label>
                    <span>Senha:</span>
                    <input type="password"
                        name="Senha"
                        required placeholder="insira sua Senha "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </label>



                {!loading && <button className="btn">Entrar</button>}
                {loading && <button className="btn"
                    disabled> Aguarde...</button>
                }

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}