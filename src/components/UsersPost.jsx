import { useAuth } from "../contexts/auth-context";
import useFetch from "../hooks/use-fetch";
import styles from "../styles/home-page.module.css";
import Post from "./Post.jsx";

const RenderUsersPost = () => {
  const { user } = useAuth();
  const options = { credentials: "include" };
  const { data, loading, error } = useFetch(`${import.meta.env.VITE_API_SERVER_URL}/posts/${user.id}`, options);

  return (
    <div className={styles.feed}>
      {data?.posts?.map((post) => (
        <Post key={post.id} data={post} className={styles.post} />
      ))}
    </div>
  );
};

export default RenderUsersPost;