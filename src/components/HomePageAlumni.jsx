import { useState } from "react";
import Popup from "reactjs-popup";

import Filter from "./Filter.jsx";
import Post from "./Post.jsx";
import Sidebar from "./Sidebar.jsx";
import SearchBar from "./SearchBar.jsx";
import SecondarySidebar from "./SecondarySidebar.jsx";

import profilePic from "../assets/prashant.png";

import posts from "../data/posts-data.js";

import styles from "../styles/homepage-alumni.module.css";

export default function HomePageAlumni() {
  const [isPopupOpen, setPopupOpen] = useState(false);

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

        <div className={styles.donationBanner}>
          <p>
            Your alma mater shaped your journey—now, you can shape someone
            else&apos;s. A small gift can fund
          </p>
          <p>
            scholarships, enhance research, and create opportunities for the
            next generation of IIT Patna graduates.
          </p>
          <button className={styles.donateButton}>Donate Now →</button>
        </div>

        <div className={styles.startPost}>
          <img src={profilePic} alt="User Avatar" className={styles.avatar} />
          <button
            className={styles.postInput}
            onClick={() => setPopupOpen(true)}
          >
            Start a Post...
          </button>
        </div>

        <Popup open={isPopupOpen} onClose={() => setPopupOpen(false)} modal>
          <div className={styles.overlay}>
            <div className={styles.popupContent}>
              <button
                className={styles.closeButton}
                onClick={() => setPopupOpen(false)}
              >
                <span style={{ color: "black" }}>✖</span>
              </button>
              <textarea
                className={styles.textInput}
                placeholder="What's on your mind?"
              />
              <label className={styles.attachButton}>
                📎 Attach
                <input type="file" accept="image/*,video/*" />
              </label>
              <button className={styles.sendButton}>🚀 Post</button>
            </div>
          </div>
        </Popup>

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
