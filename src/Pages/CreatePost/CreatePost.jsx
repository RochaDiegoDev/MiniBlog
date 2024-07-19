import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";


export const CreatePost = () => {
    const [title, setTitle]  = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return(
        <div className={styles.create_post}>
            <h2>Novo Post </h2>
            <p>Torne-se aquilo que nasceu para ser!!!</p>
            <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!!</p>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Titulo</span>
                    <input type="text" 
                    name="title" 
                    placeholder="Aqui sua imaginação vai Longe" 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    />
                </label>

                <label>
                    <span>URL DA Imagem</span>
                    <input type="text" 
                    name="imagem" 
                    placeholder="Aqui sua imaginação vai Longe" 
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                    />
                </label>

                <label>
                    <span>Conteudo</span>
                    <textarea name="Conteudo" 
                    required placeholder="Insira o Conteudo do Post"
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                    />
                </label>

                <label>
                    <span>TAGS</span>
                    <input type="text" 
                    name="tags" 
                    placeholder="Insira as tags separadas por virgula" 
                    onChange={(e) => setTags(e.target.value)}
                    value={tags}
                    />
                </label>

                <button className="btn">Cadastrar</button>
                {/* {!loading && <button className="btn">Cadastrar</button>}
                {loading && 
                <button className="btn" disabled> Aguarde...
                </button>}

                {error && <p className="error">{error}</p>} */}
            </form>

        </div>
    )
}