import styles from "../styles/homepage-students.module.css";
import Post from "./Post";
import SideBar from "./SideBar";

const HomePageStudents = () => {
  return (

    <div className={styles.background}>

      {/* sidebar */}
      <SideBar></SideBar>

      <main className={styles.feed}>

        {/* SEARCH BAR */}
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Search..." className={styles.searchBar} />
        </div>

        {/* NOTIFICATION SECTION */}
        {/* <div className={styles.notifications}>
          <div className={styles.notificationCard}>
            <div className={styles.iconContainer}>
              <FaBell className={styles.notificationIcon} />
            </div>
            <div className={styles.notificationContent}>
              <span>2/8 Watched</span>
              <p><strong>Product Design</strong></p>
            </div>
            <div className={styles.moreOptions}>•••</div>
          </div>

          <div className={styles.notificationCard}>
            <div className={styles.iconContainer}>
              <FaBell className={styles.notificationIcon} />
            </div>
            <div className={styles.notificationContent}>
              <span>2/8 Watched</span>
              <p><strong>Product Design</strong></p>
            </div>
            <div className={styles.moreOptions}>•••</div>
          </div>

          <div className={styles.notificationCard}>
            <div className={styles.iconContainer}>
              <FaBell className={styles.notificationIcon} />
            </div>
            <div className={styles.notificationContent}>
              <span>2/8 Watched</span>
              <p><strong>Product Design</strong></p>
            </div>
            <div className={styles.moreOptions}>•••</div>
          </div>
        </div> */}

        {/* POST SECTION */}
        <div className={styles.post}>

          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>

        </div>
      </main>
    </div>
  );
};

export default HomePageStudents;
