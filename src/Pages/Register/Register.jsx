import styles from "./Register.module.css";
import { useAutentication } from "../../Hooks/useAutentication";
import { useState, useEffect,  } from "react";

export const Register = () => {

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirme, setConfirme] = useState("")
    const [error, setError] = useState("")

    const {createUser, error: authError, loading} = useAutentication();

    const handleSubmit = async (e) => { //serve para nao enviar o formulario
        e.preventDefault();

        setError("");

            const user = {
                displayName,
                email,
                password
            };

            if(password !== confirme ) {
                setError("As senhas precisam ser iguais")
                return;
            }

            const res = await createUser(user)
            console.log(res);
    };

    useEffect(()=>{
        if(authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <div className={styles.register}>
            <h1>Cadastra-se para postar</h1>
            <p>Crie seu usuario e compartilhe sua historia</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input type="text"
                        name="displayName"
                        required placeholder="Nome do Usuario "
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)} />
                </label>

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
                        value={confirme}
                        onChange={(e) => setConfirme(e.target.value)} />
                </label>

                <label>
                    <span>Confirme:</span>
                    <input type="password"
                        name="confirmSenha"
                        required placeholder="Confirme sua Senha "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </label>

                {!loading && <button className="btn">Cadastrar</button>}
                {!loading && <button className="btn" disabled>Aguarde...</button>}

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}