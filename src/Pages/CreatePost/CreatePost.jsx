import styles from "./CreatePost.module.css";
import { myCollection } from "../../firebase/collection";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocuments } from "../../Hooks/useInsertDocuments";

export const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    const { user } = useAuthValue();

    const { insertedDocument, response } = useInsertDocuments(
        myCollection.post,
    );

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");

        // valido a imagem do URL
        try {
            new URL(image);
        } catch (error) {
            setFormError("a Imagem precisa ser uma URL.");
        }
        // create tags array
        const tagsArray = tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase());

        // check all os valores
        if (!title || !image || !tags || !body) {
            setFormError("Por favor, preecha todos os campos!!");
        }

        if (formError) return;

        insertedDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            //createdBy: user.displayName
        });

        // redirect to home page
        navigate("/");
    };

    return (
        <div className={styles.create_post}>
            <h2>Novo Post </h2>
            <p>Torne-se aquilo que nasceu para ser!!!</p>
            <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!!</p>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Titulo</span>
                    <input
                        type="text"
                        name="text"
                        required
                        placeholder="Aqui sua imaginação vai Longe"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>

                <label>
                    <span>URL DA Imagem</span>
                    <input
                        type="text"
                        name="imagem"
                        required
                        placeholder="Aqui sua imaginação vai Longe"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>

                <label>
                    <span>Conteudo</span>
                    <textarea
                        name="Conteudo"
                        required
                        placeholder="Insira o Conteudo do Post"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    />
                </label>

                <label>
                    <span>TAGS</span>
                    <input
                        type="text"
                        name="tags"
                        placeholder="Insira as tags separadas por virgula"
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>

                {!response.loading && (
                    <button className="btn">Criar Post !!</button>
                )}
                {response.loading && (
                    <button className="btn" disabled>
                        Aguarde...
                    </button>
                )}
                {(response.error || formError) && (
                    <p className="error">{response.error || formError}</p>
                )}
            </form>
        </div>
    );
};
