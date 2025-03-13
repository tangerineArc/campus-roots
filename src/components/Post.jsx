import styles from "../styles/post.module.css";
import { 
  FaHome, FaUserFriends, FaEnvelope, FaUser, 
  FaCog, FaSignOutAlt, FaBell, FaThumbsUp, 
  FaComment, FaShare, FaPaperPlane 
} from "react-icons/fa";
import profilePic from "../assets/profile.jpeg"; 
import postPic from "../assets/post_pic.png"; 

export default function Post() {
  return (<div>

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

            </div> );
}