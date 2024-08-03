import styles from "./Search.module.css";

//hooks
import { useFetchDocument } from "../../Hooks/useFetchDocument";
import { useQuery } from "../../Hooks/useQuery";

//componentes
import { PostDetail } from "../../components/PostDetail";
import { Link } from "react-router-dom";

export const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const { documens: posts } = useFetchDocument("posts", search);

    return (
        <div className={StyleSheet.search_container}>
            <h2>Search</h2>
            <div>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Nao foram encontrados posts em sua busca..</p>
                        <Link to="/" className="btn btn-dark">
                            Voltar
                        </Link>
                    </div>
                )}
                {posts &&
                    posts.map((post) => (
                        <PostDetail key={post.id} post={post} />
                    ))}
            </div>
        </div>
    );
};
