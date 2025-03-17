import profilePic from "../assets/prashant.png";
import styles from "../styles/homepage-alumni.module.css"; // Import CSS Module
import Post from "./Post"; // Import Post Component
import SearchBar from "./SearchBar";
import SideBar from "./SideBar"; // Import SideBar Component

const HomePageAlumni = () => {
  return (
    <div className={styles.page}>

      {/* SideBar */}
      <SideBar />

      {/* Main Content */}
      <div className={styles.content}>

        <SearchBar />

        {/* Donation Banner */}
        <div className={styles.donationBanner}>
          <p>
            Your alma mater shaped your journey—now, you can shape someone else's. A small gift can fund
          </p>
          <p>scholarships, enhance research, and create
            opportunities for the next generation of IIT Patna graduates.</p>
          <button className={styles.donateButton}>Donate Now →</button>
        </div>

        {/* START A POST */}
        <div className={styles.startPost}>
          <img
            src={profilePic}
            alt="User Avatar"
            className={styles.avatar}
          />
          <input type="text" placeholder="Start a Post..." className={styles.postInput} />
        </div>

        {/* POST SECTION */}
        <div className={styles.post}>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>

        </div>
      </div>
    </div>
  );
};

export default HomePageAlumni;
