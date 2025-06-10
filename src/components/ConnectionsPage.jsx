import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context.jsx";
import useFetch from "../hooks/use-fetch.js";
import styles from "../styles/connections.module.css";
import SearchBar from "./SearchBar.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Connections() {
  const { user } = useAuth();
  const options = { credentials: "include" };
  const { data, loading, error } = useFetch(`${import.meta.env.VITE_API_SERVER_URL}/user/connections/${user.id}`, options);
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.connections) {
      setConnections(data.connections);
    }
  }, [data]);

  const handleAccept = async (user2Id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/user/connections/accept/${user.id}/${user2Id}`,
        {
          method: 'PUT',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to accept connection');
      }

      setConnections(prevConnections =>
        prevConnections.map(connection =>
          connection.user.id === user2Id
            ? { ...connection, status: 'ACCEPTED' }
            : connection
        )
      );
    } catch (error) {
      console.error('Error accepting connection:', error);
    }
  };

  const handleReject = async (user2Id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/user/connections/remove/${user.id}/${user2Id}`,
        {
          method: 'PUT',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete connection');
      }

      setConnections(prevConnections =>
        prevConnections.filter(connection => connection.user.id !== user2Id)
      );
    } catch (error) {
      console.error('Error rejecting connection:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.connectionList}>
        <SearchBar />

        {connections.map((connection, index) => (
          <div key={index} className={styles.connectionCard}>
            <img
              src={connection.user.avatar}
              alt={connection.user.name}
              className={styles.profileImage}
            />
            <div className={styles.details}>
              <button onClick={() => navigate(`/profile/${connection.user.id}`)}>
                <h3 className={styles.name}>{connection.user.name}</h3>
                <p className={styles.description}>{connection.user.about}</p>
              </button>
            </div>
            {connection.status === "ACCEPTED" && <button className={styles.messageButton}>Message</button>}
            {connection.status === "PENDING" && (
              <div className={styles.buttonContainer}>
                <button className={styles.rejectButton} onClick={() => handleReject(connection.user.id)}>Reject</button>
                <button className={styles.messageButton} onClick={() => handleAccept(connection.user.id)}>Accept</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
