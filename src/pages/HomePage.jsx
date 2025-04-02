import Filter from "../components/Filter.jsx";
import Post from "../components/Post.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SecondarySidebar from "../components/SecondarySidebar.jsx";
import Sidebar from "../components/Sidebar.jsx";

import posts from "../data/posts-data.js";

import styles from "../styles/home-page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Sidebar currSelection="feed" />

      <main className={styles.main}>
        <nav className={styles.nav}>
          <SearchBar />
          <div>
            <Filter items={["top", "recent", "relevant"]} />
          </div>
        </nav>

        <div className={styles.feed}>
          {posts.map((post) => (
            <Post key={post.id} data={post} />
          ))}
        </div>
      </main>

      <SecondarySidebar />
    </div>
  );
}
