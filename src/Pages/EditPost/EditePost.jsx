import styles from "./EditePost.module.css";
import { myCollection } from "../../firebase/collection";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../Hooks/useUpdateDocument";
import { useConteudoPost } from "../../Hooks/useConteudoPost";

export const EditePost = () => {
    const { id } = useParams();

    const { document: post } = useConteudoPost(myCollection.post, id);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);

            const textTags = post.tagsArray.join(", ");

            setTags(textTags);
        }
    }, [post]);

    const { user } = useAuthValue();

    const { updateDocument, response } = useUpdateDocument(myCollection.post);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clicou aqui");
        setFormError("");

        // valido a imagem do URL
        try {
            new URL(image);
        } catch (error) {
            setFormError("a Imagem precisa ser uma URL.");
        }
        // create tags array
        const tagsArray = tags.split(",").map((tag) => tag.trim());

        // check all os valores
        if (!title || !image || !tags || !body) {
            setFormError("Por favor, preecha todos os campos!!");
        }

        if (formError) return;

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
        };

        updateDocument(id, data);

        // redirect to home page
        navigate("/dashbord");
    };

    console.log(response);
    return (
        <div className={styles.edite_post}>
            <h2>Editando Post {title}</h2>
            <p>Altere os dados do post como desejar</p>
            {post && (
                <>
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
                        <p className="preview_title">
                            Preview da Imagem atual:
                        </p>
                        <img
                            className={styles.preview_title}
                            src={post.image}
                            alt={post.tile}
                        />
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
                            <button className="btn">Editar !!</button>
                        )}
                        {response.loading && (
                            <button className="btn" disabled>
                                Aguarde...
                            </button>
                        )}
                        {(response.error || formError) && (
                            <p className="error">
                                {response.error || formError}
                            </p>
                        )}
                    </form>
                </>
            )}
        </div>
    );
};
