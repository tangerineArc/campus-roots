import React from "react";
import SideBar from "./SideBar";
import Post from "./Post";
import styles from "../styles/homepage-alumni.module.css";
import profilePic from "../assets/prashant.png";

const HomePageAlumni = () => {
  return (
    <div className={styles.background}>
      <SideBar />
      <div className={styles.mainContent}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchContainer}>
            <input type="text" placeholder="Search..." className={styles.searchBar} />
          </div>
        </div>

        <div className={styles.donationBanner}>
          <p>
            Your alma mater shaped your journey—now, you can shape someone else's. A small gift can fund 
          </p>
          <p>scholarships, enhance research, and create
          opportunities for the next generation of IIT Patna graduates.</p>
          <button className={styles.donateButton}>Donate Now →</button>
        </div>

        <div className={styles.startPost}>
          <img
            src={profilePic}
            alt="User Avatar"
            className={styles.avatar}
          />
          <input type="text" placeholder="Start a Post..." className={styles.postInput} />
        </div>

        <div className={styles.postContainer}>  
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
};

export default HomePageAlumni;