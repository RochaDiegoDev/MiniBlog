import styles from "./Dashbord.module.css";

import { Link } from "react-router-dom";

//Hooks

import { useFetchDocument } from "../../Hooks/useFetchDocument";
import { useAuthValue } from "../../context/AuthContext";
import { useDeleteDocument } from "../../Hooks/useDeleteDocument";
//import { collection } from "firebase/firestore";

export const Dasbord = () => {
    const { user } = useAuthValue();
    const uid = user.uid;

    //post do usuario

    const { document: posts, loading } = useFetchDocument("posts", null, uid);

    const { deleteDocument } = useDeleteDocument("posts");

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className={styles.dashboard}>
            <h2>DashBord </h2>
            <p>Gerencie os seus Post</p>
            {posts && posts.length === 0 ? (
                <div className={styles.noposts}>
                    <p>Nao foram encontrados Posts</p>
                    <Link to="/posts/create" className="btn">
                        Criar primeiro Post
                    </Link>
                </div>
            ) : (
                <>
                    <div className={styles.post_header}>
                        <span>Titulo</span>
                        <span>Ações</span>
                    </div>

                    {posts &&
                        posts.map((post) => (
                            <div className={styles.post_row} key={post.id}>
                                <p>{post.title}</p>
                                <div>
                                    <Link
                                        to={`/posts/${post.id}`}
                                        className="btn btn-outline"
                                    >
                                        Ver
                                    </Link>
                                    <Link
                                        to={`/posts/edite/${post.id}`}
                                        className="btn btn-outline"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => deleteDocument(post.id)}
                                        className="btn btn_outline btn-danger"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                </>
            )}
        </div>
    );
};
