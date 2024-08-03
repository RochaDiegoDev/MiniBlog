import { useState } from "react";
import styles from "./Home.module.css";
import { myCollection } from "../../firebase/collection";

//hooks
import { useNavigate, Link } from "react-router-dom";
import { useFetchDocument } from "../../Hooks/useFetchDocument";
import { PostDetail } from "../../components/PostDetail";

export const Home = () => {
    const [query, setQuery] = useState("");
    const { document: posts, loading } = useFetchDocument(myCollection.post);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query) {
            return navigate(`/search?q=${query}`);
        }
    };

    return (
        <div className={styles.home}>
            <h1>Veja os nossos posts mais recentes </h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input
                    type="text"
                    placeholder="Ou busque por tags..."
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-dark">Pesquisa </button>
            </form>

            <div>
                {loading && <p>Carregando...</p>}
                {posts &&
                    posts.map((post) => (
                        <PostDetail key={post.id} post={post} />
                    ))}
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Nao foram encontrados os Posts</p>
                        <Link to="/posts/create" className="btn">
                            Criar Primeiro Post
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
