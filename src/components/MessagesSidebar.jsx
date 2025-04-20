import { CircleCheck, Dot, MessageSquarePlus } from "lucide-react";
import { func } from "prop-types";
import { useState } from "react";

import SearchBar from "./SearchBar.jsx";

import defaultProfilePic from "../assets/default-profile-picture.jpg";

import useFetch from "../hooks/use-fetch.js";

import styles from "../styles/messages-sidebar.module.css";

import formatTime from "../utils/time-formatter.js";

const options = { credentials: "include" };

export default function MessagesSidebar({ handleSelectConversation }) {
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_SERVER_URL}/user/conversations`,
    options
  );

  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className={styles.container}>
      <SearchBar />

      <button className={styles.newBtn}>
        <MessageSquarePlus className={styles.newMsgIcon} />
        New Conversation
      </button>

      <div className={styles.mainContainer}>
        {loading ? (
          <p>fetching data...</p>
        ) : error ? (
          <p>failed to fetch...</p>
        ) : (
          data?.conversations?.map((conversation) => (
            <button
              key={conversation.id}
              className={`${styles.messageCard} ${
                activeChat === conversation.id ? styles.active : ""
              }`}
              onClick={() => {
                handleSelectConversation(conversation.otherUserId, conversation.name, conversation.avatar);
                setActiveChat(conversation.id);
              }}
            >
              <img
                src={conversation.avatar || defaultProfilePic}
                className={styles.profileImage}
              />

              {conversation.role === "ALUMNUS" && (
                <CircleCheck className={styles.verifiedIcon} />
              )}

              <div className={styles.messageDetails}>
                <div className={styles.messageHeader}>
                  <span className={styles.name}>{conversation.name}</span>
                  <span className={styles.time}>
                    {formatTime(conversation.time)}
                  </span>
                </div>

                <div className={styles.messageBody}>
                  <span className={styles.messageText}>
                    {conversation.text}
                  </span>
                  <Dot className={styles.status} />
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

MessagesSidebar.propTypes = {
  handleSelectConversation: func.isRequired,
};
