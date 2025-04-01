import styles from "../styles/homepage-students.module.css";
import Post from "./Post";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";

const HomePageStudents = () => {
  return (
    <div className={styles.background}>
      <SideBar />
      <div className={styles.mainContent}>
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>
        <div className={styles.postContainer}>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
};

export default HomePageStudents;