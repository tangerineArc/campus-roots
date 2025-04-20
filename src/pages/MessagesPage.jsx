import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import MessagesPane from "../components/MessagesPane.jsx";
import MessagesSidebar from "../components/MessagesSidebar.jsx";
import Sidebar from "../components/Sidebar.jsx";

import { useAuth } from "../contexts/auth-context.jsx";

import styles from "../styles/messages-page.module.css";

const socket = io(import.meta.env.VITE_API_SERVER_URL, {
  withCredentials: true,
});

const messageExists = (messageList, incomingMessage) =>
  messageList.some((msg) => msg.id === incomingMessage.id);

export default function MessagesPage() {
  const { user } = useAuth();

  const messageInput = useRef(null);

  const [receiverId, setReceiverId] = useState(null);
  const [receiverName, setReceiverName] = useState(null);
  const [receiverAvatar, setReceiverAvatar] = useState(null);

  const [messagesMap, setMessagesMap] = useState({});

  useEffect(() => {
    socket.emit("register", user.id);
  }, [user]);

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      const { senderId } = msg;

      setMessagesMap((prev) => {
        const currMessages = prev[receiverId] || [];
        if (messageExists(currMessages, msg)) return prev;

        return {
          ...prev,
          [senderId]: [...currMessages, msg],
        };
      });
    });

    return () => {
      socket.off("receive-message");
    };
  }, [receiverId]);

  const sendMessage = () => {
    if (!receiverId || !messageInput.current.value.trim()) return;

    const msg = {
      senderId: user.id,
      receiverId,
      text: messageInput.current.value.trim(),
    };

    socket.emit("send-message", msg);

    setMessagesMap((prev) => {
      msg.time = new Date();
      msg.id = crypto.randomUUID();

      const currMessages = prev[receiverId] || [];
      if (messageExists(currMessages, msg)) return prev;

      return {
        ...prev,
        [receiverId]: [...currMessages, msg],
      };
    });

    messageInput.current.value = "";
  };

  const handleSelectConversation = (id, name, avatar) => {
    setReceiverId(id);
    setReceiverName(name);
    setReceiverAvatar(avatar);

    setMessagesMap({});
  };

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.mainContent}>
        <MessagesSidebar handleSelectConversation={handleSelectConversation} />

        <div className={styles.chatContainer}>
          {receiverId === null && (
            <div className={styles.blank}>
              <h2>Campus-roots</h2>
              <p>Select a chat to start messaging</p>
            </div>
          )}

          {receiverId && (
            <MessagesPane
              messageInputRef={messageInput}
              latestMessages={messagesMap[receiverId] || []}
              receiverId={receiverId}
              receiverName={receiverName}
              receiverAvatar={receiverAvatar}
              sendMessage={sendMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
