import Post from "../components/Post.jsx";

import Filter from "../components/Filter.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SecondarySidebar from "../components/SecondarySidebar.jsx";
import Sidebar from "../components/Sidebar.jsx";

import styles from "../styles/homepage.module.css";

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
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </main>

      <SecondarySidebar />
    </div>
  );
};
