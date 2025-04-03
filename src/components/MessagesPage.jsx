import { CheckCircle, Send, ArrowLeft } from "lucide-react";
import img from "../assets/prashant.png";
import styles from "../styles/messages-page.module.css";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import { useState, useEffect } from 'react';

const conversations = [
  { id: 1, name: "Arnav Reddy", lastText: "Just chilling!", time: "9:42 AM", image: img, verified: true },
  { id: 2, name: "Prashant", lastText: "Great! See you then.", time: "8:33 AM", image: img, verified: true },
  { id: 3, name: "Riya", lastText: "Okay, let me know once you're done.", time: "7:25 AM", image: img, verified: true },
  { id: 4, name: "Vikram", lastText: "Cool, see you there!", time: "6:22 PM", image: img, verified: true },
  { id: 5, name: "Neha", lastText: "Let's submit it tomorrow.", time: "3:10 PM", image: img, verified: false },
];

const messages = [
  { id: 3, sender: "Riya", text: "Hey, did you check the notes?", time: "7:20 AM" },
  { id: 1, sender: "Arnav Reddy", text: "Hey, how are you?", time: "9:40 AM" },
  { id: 4, sender: "Vikram", text: "Are we meeting at 5?", time: "6:15 PM" },
  { id: 2, sender: "Prashant", text: "Hey, are you coming today?", time: "8:30 AM" },
  { id: 5, sender: "Neha", text: "Did you complete the project?", time: "3:00 PM" },
  { id: 1, sender: "You", text: "I'm good, you?", time: "9:41 AM" },
  { id: 3, sender: "You", text: "Not yet, I'll check in a bit.", time: "7:21 AM" },
  { id: 2, sender: "You", text: "Yeah, I'll be there by 10.", time: "8:32 AM" },
  { id: 5, sender: "You", text: "Almost done, just finalizing.", time: "3:05 PM" },
  { id: 4, sender: "You", text: "Yes, let's meet at the cafe.", time: "6:20 PM" },
  { id: 1, sender: "Arnav Reddy", text: "Just chilling!", time: "9:42 AM" },
  { id: 3, sender: "Riya", text: "Okay, let me know once you're done.", time: "7:25 AM" },
  { id: 2, sender: "Prashant", text: "Great! See you then.", time: "8:33 AM" },
  { id: 4, sender: "Vikram", text: "Cool, see you there!", time: "6:22 PM" },
  { id: 5, sender: "Neha", text: "Let's submit it tomorrow.", time: "3:10 PM" },
];

const MessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chat, setChat] = useState(false);
  const [converseId, setConverseId] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
                    <span className={styles.time}>{msg.time}</span>
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
