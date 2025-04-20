import { Send } from "lucide-react";
import { any, array, func, oneOfType, shape, string } from "prop-types";
import { useEffect, useRef } from "react";

import defaultProfilePic from "../assets/default-profile-picture.jpg";

import { useAuth } from "../contexts/auth-context.jsx";

import useFetch from "../hooks/use-fetch.js";

import styles from "../styles/messages-pane.module.css";

import formatTime from "../utils/time-formatter.js";

const options = { credentials: "include" };

export default function MessagesPane({
  messageInputRef,
  latestMessages,
  receiverId,
  receiverName,
  receiverAvatar,
  sendMessage,
}) {
  const { user } = useAuth();

  const bottomRef = useRef(null);

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_SERVER_URL}/user/messages/${receiverId}`,
    options
  );

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, latestMessages]);

  if (loading) {
    return <p>fetching data...</p>;
  }

  if (error) {
    return <p>failed to fetch...</p>;
  }

  return (
    <>
      <div className={styles.chatHeader}>
        <img
          src={receiverAvatar || defaultProfilePic}
          className={styles.profileImage}
        />
        <span className={styles.name}>{receiverName}</span>
      </div>

      <div className={styles.chatMessages}>
        {data?.messages?.concat(latestMessages).map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.senderId === user.id
                ? styles.sentMessage
                : styles.receivedMessage
            }`}
          >
            {message.text}
            <span
              className={`${
                message.senderId === user.id ? styles.timeSent : styles.time
              }`}
            >
              {formatTime(message.time)}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className={styles.messageInput}>
        <input
          type="text"
          placeholder="Type a message..."
          ref={messageInputRef}
          onKeyDown={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>
          <Send size={20} />
        </button>
      </div>
    </>
  );
}

MessagesPane.propTypes = {
  messageInputRef: oneOfType([func, shape({ current: any })]),
  latestMessages: array.isRequired,
  receiverId: string.isRequired,
  receiverName: string.isRequired,
  receiverAvatar: string,
  sendMessage: func.isRequired,
};
