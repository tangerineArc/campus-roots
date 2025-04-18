import { ArrowLeft, CheckCircle, Send } from "lucide-react";
import { useEffect, useState } from 'react';
// import conversations from "../data/conversations-data";
// import messages from "../data/messages-data";
import styles from "../styles/messages-page.module.css";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import Cookies from 'js-cookie';

const MessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chat, setChat] = useState(false);
  const [converseId, setConverseId] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [conversations, setconversations] = useState([]);
  const [messages, setmessages] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredconversations = conversations.filter(session =>
    (session.name?.toLowerCase() || "").includes(searchQuery?.toLowerCase() || "") ||
    (session.lastText?.toLowerCase() || "").includes(searchQuery?.toLowerCase() || "")
  );

  const filteredMessages = messages
    .filter(msg => msg.id === converseId)
    .sort((a, b) => new Date(`1970/01/01 ${a.time}`) - new Date(`1970/01/01 ${b.time}`));

  const openchat = (id) => {
    setChat(true);
    setConverseId(id);
  };

  const closeChat = () => {
    setChat(false);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Here you would typically send the message to your backend
      setMessageInput('');
    }
  };

  const currentConversation = conversations.find(c => c.id === converseId);

  // IMPORTING CHATS FROM DATABASE FOR CURRENT USER
  useEffect(() => {
    async function fun() {
      try {
        const response = await fetch("http://localhost:3000/users/messages", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const { formattedConversations, formattedMessages } = await response.json();
        
        setmessages(formattedMessages);
        setconversations(formattedConversations);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fun();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <div className={`${styles.messagesList} ${chat && isMobile ? styles.hidden : ''}`}>
          <SearchBar />

          {filteredconversations.map((msg) => (
            <button
              key={msg.id}
              className={styles.messageCard}
              onClick={() => openchat(msg.id)}
            >
              <img
                src={msg.image}
                alt={msg.name}
                className={styles.profileImage}
              />

              <div className={styles.messageDetails}>
                <div className={styles.messageHeader}>
                  <span className={styles.name}>{msg.name}</span>
                  {msg.verified && (
                    <CheckCircle className={styles.verifiedIcon} />
                  )}
                </div>
                <span className={styles.messageText}>{msg.lastText}</span>
              </div>

              <div className={styles.messageMeta}>
                <span className={styles.time}>{msg.time}</span>
              </div>
            </button>
          ))}
        </div>

        <div className={`${styles.chatContainer} ${chat ? styles.active : ''}`}>
          {chat && currentConversation ? (
            <>
              <div className={styles.chatHeader}>
                {isMobile && (
                  <button
                    onClick={closeChat}
                    className={styles.backButton}
                  >
                    <ArrowLeft size={20} color="#54656f" />
                  </button>
                )}
                <img
                  src={currentConversation.image}
                  alt={currentConversation.name}
                  className={styles.profileImage}
                />
                <div className={styles.messageDetails}>
                  <div className={styles.messageHeader}>
                    <span className={styles.name}>{currentConversation.name}</span>
                    {currentConversation.verified && (
                      <CheckCircle className={styles.verifiedIcon} />
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.chatMessages}>
                {filteredMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`${styles.message} ${msg.sender === "You" ? styles.sentMessage : styles.receivedMessage
                      }`}
                  >
                    {msg.text}
                    <span className={`${msg.sender === "You" ? styles.timeSent : styles.time
                      }`}>{msg.time}</span>
                  </div>
                ))}
              </div>

              <div className={styles.messageInput}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>
                  <Send size={20} />
                </button>
              </div>
            </>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#667781',
              textAlign: 'center',
              padding: '2rem'
            }}>
              <h2>Campus-roots</h2>
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
