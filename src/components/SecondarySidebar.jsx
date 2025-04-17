import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profileData from "../data/profile-data";
import suggestedPeople from "../data/suggested-people-data";
import styles from "../styles/secondary-sidebar.module.css";

export default function SecondarySidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const time = new Date().getHours();
  const greeting = (time < 12 && time >= 4) ? "Good Morning" : (time < 16 && time >= 12) ? "Good Afternoon" : "Good Evening";

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setIsSidebarOpen(false);
    } else if (isRightSwipe) {
      setIsSidebarOpen(true);
    }
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth <= 768 && isSidebarOpen) {
        const sidebar = document.getElementById('secondary-sidebar');
        if (sidebar && !sidebar.contains(e.target)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <aside
      id="secondary-sidebar"
      className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.profileSection}>
        <div className={styles.profileImage}>
          <Link to="/profile">
            <img src={profileData.imageUrl} alt="Profile" />
          </Link>
        </div>
        <h1 className={styles.greeting}>{greeting} {profileData.name}</h1>
        <p className={styles.motto}>Continue Your Journey And Achieve Your Target</p>
      </div>

      <div className={styles.suggestionsSection}>
        <h2 className={styles.sectionTitle}>People You May Know</h2>
        <div className={styles.peopleList}>
          {suggestedPeople.map((person, index) => (
            <div key={index} className={styles.personCard}>
              <div className={styles.personInfo}>
                <div className={styles.personImage}>
                  <img src={person.imageUrl} alt={person.name} />
                </div>
                <div className={styles.personDetails}>
                  <h3>{person.name}</h3>
                  <p>{person.about}</p>
                </div>
              </div>
              <button className={styles.followButton}>Follow</button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
