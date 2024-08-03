import styles from "./Post.module.css";
import { myCollection } from "../../firebase/collection";

//hooks
import { useParams } from "react-router-dom";
import { useConteudoPost } from "../../Hooks/useConteudoPost";

export const Post = () => {
    const { id } = useParams();

    const { document: post, loading } = useConteudoPost(myCollection.post, id);

    return (
        <div className={styles.post_container}>
            {loading && <p> carregando post ...</p>}
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} />
                    <p>{post.body}</p>
                    <h3>Este post trata sobre:</h3>
                    <div className={styles.tags}>
                        {post.tagsArray.map((tag) => (
                            <p key={tag}>
                                <span>#</span>
                                {tag}
                            </p>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
