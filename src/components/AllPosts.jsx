import { ArrowDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/auth-context";
import useFetch from "../hooks/use-fetch";
import styles from "../styles/profile-page-sections.module.css";
import Post from "./Post.jsx";

const AllPosts = ({ userId }) => {
  const [showPosts, setShowPosts] = useState(false);
  const { user } = useAuth();
  const options = { credentials: "include" };
  const { data, loading, error } = useFetch(`${import.meta.env.VITE_API_SERVER_URL}/posts/${userId}`, options);

  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  return (
    <section className={styles.main}>
      <div className={styles.title} onClick={togglePosts} style={{ cursor: 'pointer' }}>
        <span>Show All Posts</span>
        {showPosts ? <ArrowDown /> : <ArrowRight />}
      </div>
      <div
        style={{
          height: showPosts ? 'auto' : '0',
          opacity: showPosts ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <div className={styles.feed}>
          {data?.posts?.map((post) => (
            <Post key={post.id} data={post} className={styles.post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllPosts;