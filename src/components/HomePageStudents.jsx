import React from "react";
import styles from "../styles/homepage-students.module.css";
import profilePic from "../assets/profile.jpeg"; 
import postPic from "../assets/post_pic.png"; 
import { 
  FaHome, FaUserFriends, FaEnvelope, FaUser, 
  FaCog, FaSignOutAlt, FaBell, FaThumbsUp, 
  FaComment, FaShare, FaPaperPlane 
} from "react-icons/fa";

const HomePageStudents = () => {
  return (

    //  SIDEBAR
    <div className={styles.background}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>COURSUÉ</div>
        <nav className={styles.menu}>
          <a href="#" className={styles.active}><FaHome /> Feed</a>
          <a href="#"><FaUserFriends /> Connections</a>
          <a href="#"><FaEnvelope /> Messages</a>
          <a href="#"><FaUser /> Profile</a>
        </nav>
        <div className={styles.bottomMenu}>
          <a href="#"><FaCog /> Settings</a>
          <a href="/" className={styles.logout}><FaSignOutAlt /> Logout</a>
        </div>
      </aside>

      <main className={styles.feed}>

        {/* SEARCH BAR */}

        <div className={styles.searchBar}>
          <input type="text" placeholder="Search..." />
        </div>

         {/* NOTIFICATION SECTION */}
        <div className={styles.notifications}>
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
</div>

        {/* POST SECTION */}
        <div className={styles.post}>  

          <div className={styles.postHeader}>
            <img src={profilePic} alt="Panda Media" />
            <div className={styles.postInfo}>
              <h3>Panda Media</h3>
              <span>326 abonnés • 20h</span>
            </div>
          </div>
          <p>
            <strong>[Fun facts]</strong> Did you know that red pandas were given the name ‘panda’ first, roughly fifty years before the black and white variety?
            <br />
            <span className={styles.hashtags}>#panda #funfact #redpanda</span>
          </p>
          <img
            className={styles.postImage}
            src={postPic}
            alt="Red Panda"/>
          <div className={styles.postActions}>
            <button><FaThumbsUp /> Like</button>
            <button><FaComment /> Comment</button>
            <button><FaShare /> Share</button>
            <button><FaPaperPlane /> Send</button>
          </div>

          <div className={styles.postHeader}>
            <img src={profilePic} alt="Panda Media" />
            <div className={styles.postInfo}>
              <h3>Panda Media</h3>
              <span>326 abonnés • 20h</span>
            </div>
          </div>
          <p>
            <strong>[Fun facts]</strong> Did you know that red pandas were given the name ‘panda’ first, roughly fifty years before the black and white variety?
            <br />
            <span className={styles.hashtags}>#panda #funfact #redpanda</span>
          </p>
          <img
            className={styles.postImage}
            src={postPic}
            alt="Red Panda"/>
          <div className={styles.postActions}>
            <button><FaThumbsUp /> Like</button>
            <button><FaComment /> Comment</button>
            <button><FaShare /> Share</button>
            <button><FaPaperPlane /> Send</button>
          </div>

          <div className={styles.postHeader}>
            <img src={profilePic} alt="Panda Media" />
            <div className={styles.postInfo}>
              <h3>Panda Media</h3>
              <span>326 abonnés • 20h</span>
            </div>
          </div>
          <p>
            <strong>[Fun facts]</strong> Did you know that red pandas were given the name ‘panda’ first, roughly fifty years before the black and white variety?
            <br />
            <span className={styles.hashtags}>#panda #funfact #redpanda</span>
          </p>
          <img
            className={styles.postImage}
            src={postPic}
            alt="Red Panda"/>
          <div className={styles.postActions}>
            <button><FaThumbsUp /> Like</button>
            <button><FaComment /> Comment</button>
            <button><FaShare /> Share</button>
            <button><FaPaperPlane /> Send</button>
          </div>
          
          <div className={styles.postHeader}>
            <img src={profilePic} alt="Panda Media" />
            <div className={styles.postInfo}>
              <h3>Panda Media</h3>
              <span>326 abonnés • 20h</span>
            </div>
          </div>
          <p>
            <strong>[Fun facts]</strong> Did you know that red pandas were given the name ‘panda’ first, roughly fifty years before the black and white variety?
            <br />
            <span className={styles.hashtags}>#panda #funfact #redpanda</span>
          </p>
          <img
            className={styles.postImage}
            src={postPic}
            alt="Red Panda"/>
          <div className={styles.postActions}>
            <button><FaThumbsUp /> Like</button>
            <button><FaComment /> Comment</button>
            <button><FaShare /> Share</button>
            <button><FaPaperPlane /> Send</button>
          </div>


          <div className={styles.postHeader}>
            <img src={profilePic} alt="Panda Media" />
            <div className={styles.postInfo}>
              <h3>Panda Media</h3>
              <span>326 abonnés • 20h</span>
            </div>
          </div>
          <p>
            <strong>[Fun facts]</strong> Did you know that red pandas were given the name ‘panda’ first, roughly fifty years before the black and white variety?
            <br />
            <span className={styles.hashtags}>#panda #funfact #redpanda</span>
          </p>
          <img
            className={styles.postImage}
            src={postPic}
            alt="Red Panda"/>
          <div className={styles.postActions}>
            <button><FaThumbsUp /> Like</button>
            <button><FaComment /> Comment</button>
            <button><FaShare /> Share</button>
            <button><FaPaperPlane /> Send</button>
          </div>


          <div className={styles.postHeader}>
            <img src={profilePic} alt="Panda Media" />
            <div className={styles.postInfo}>
              <h3>Panda Media</h3>
              <span>326 abonnés • 20h</span>
            </div>
          </div>
          <p>
            <strong>[Fun facts]</strong> Did you know that red pandas were given the name ‘panda’ first, roughly fifty years before the black and white variety?
            <br />
            <span className={styles.hashtags}>#panda #funfact #redpanda</span>
          </p>
          <img
            className={styles.postImage}
            src={postPic}
            alt="Red Panda"/>
          <div className={styles.postActions}>
            <button><FaThumbsUp /> Like</button>
            <button><FaComment /> Comment</button>
            <button><FaShare /> Share</button>
            <button><FaPaperPlane /> Send</button>
          </div>


          <div className={styles.postHeader}>
            <img src={profilePic} alt="Panda Media" />
            <div className={styles.postInfo}>
              <h3>Panda Media</h3>
              <span>326 abonnés • 20h</span>
            </div>
          </div>
          <p>
            <strong>[Fun facts]</strong> Did you know that red pandas were given the name ‘panda’ first, roughly fifty years before the black and white variety?
            <br />
            <span className={styles.hashtags}>#panda #funfact #redpanda</span>
          </p>
          <img
            className={styles.postImage}
            src={postPic}
            alt="Red Panda"/>
          <div className={styles.postActions}>
            <button><FaThumbsUp /> Like</button>
            <button><FaComment /> Comment</button>
            <button><FaShare /> Share</button>
            <button><FaPaperPlane /> Send</button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default HomePageStudents;
