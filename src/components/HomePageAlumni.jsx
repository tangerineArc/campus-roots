import SideBar from "./Sidebar.jsx";
import Post from "./Post";
import styles from "../styles/homepage-alumni.module.css";
import profilePic from "../assets/prashant.png";
import Popup from 'reactjs-popup';
import { useState } from 'react';

const HomePageAlumni = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

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
            Your alma mater shaped your journey—now, you can shape someone else&apos;s. A small gift can fund
          </p>
          <p>scholarships, enhance research, and create
            opportunities for the next generation of IIT Patna graduates.</p>
          <button className={styles.donateButton}>Donate Now →</button>
        </div>

        {/* POST BUTTON */}
        <div className={styles.startPost}>
          <img
            src={profilePic}
            alt="User Avatar"
            className={styles.avatar}
          />
          <button className={styles.postInput} onClick={() => setPopupOpen(true)}>
            Start a Post...
          </button>
        </div>

        {/* POST POPUP */}

        <Popup open={isPopupOpen} onClose={() => setPopupOpen(false)} modal>
          <div className={styles.overlay}>
            <div className={styles.popupContent}>
              <button className={styles.closeButton} onClick={() => setPopupOpen(false)}>
                <span style={{ color: 'black' }}>✖</span>
              </button>
              <textarea className={styles.textInput} placeholder="What's on your mind?" />
              <label className={styles.attachButton}>
                📎 Attach
                <input type="file" accept="image/*,video/*" />
              </label>
              <button className={styles.sendButton}>🚀 Post</button>
            </div>
          </div>
        </Popup>

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
