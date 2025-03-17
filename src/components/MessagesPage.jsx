import { FaCheckCircle } from "react-icons/fa";
import img from "../assets/prashant.png";
import styles from "../styles/messages-page.module.css";
import SearchBar from "./SearchBar";
import Sidebar from "./SideBar";

const messages = [
  { id: 1, name: "Arnav Reddy", text: "Lorem Ipsum Is Simply Dummy Text Of The", time: "9:45 AM", image: img, verified: true, unread: 0 },
  { id: 2, name: "Prashant", text: "Lorem Ipsum Is Simply Dummy Text Of The", time: "9:45 AM", image: img, verified: false, unread: 0 },
  { id: 3, name: "Prashant", text: "Lorem Ipsum Is Simply Dummy Text Of The", time: "9:45 AM", image: img, verified: false, unread: 0 },
  { id: 4, name: "Prashant", text: "Lorem Ipsum Is Simply Dummy Text Of The", time: "9:45 AM", image: img, verified: false, unread: 1 },
  { id: 5, name: "Prashant", text: "Lorem Ipsum Is Simply Dummy Text Of The", time: "9:45 AM", image: img, verified: false, unread: 1 },
  { id: 6, name: "Prashant", text: "Lorem Ipsum Is Simply Dummy Text Of The", time: "9:45 AM", image: img, verified: true, unread: 1 },
];

const MessagesPage = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <SearchBar />

        {/* Messages List */}
        <div className={styles.messagesList}>
          {messages.map((msg) => (
            <div key={msg.id} className={styles.messageCard}>
              {/* Profile Image */}
              <img src={msg.image} alt={msg.name} className={styles.profileImage} />

              {/* Message Details */}
              <div className={styles.messageDetails}>
                <div className={styles.messageHeader}>
                  <span className={styles.name}>{msg.name}</span>
                  {msg.verified && <FaCheckCircle className={styles.verifiedIcon} />}
                </div>
                <span className={styles.messageText}>{msg.text}</span>
              </div>

              {/* Time & Unread Messages */}
              <div className={styles.messageMeta}>
                <span className={styles.time}>{msg.time}</span>
                {msg.unread > 0 && <span className={styles.unreadCount}>{msg.unread}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
