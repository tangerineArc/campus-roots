import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/default-profile-picture.jpg";
import { useAuth } from '../contexts/auth-context.jsx';
import suggestedPeople from "../data/suggested-people-data";
import styles from "../styles/secondary-sidebar.module.css";

const SecondarySidebar = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const req_url = import.meta.env.VITE_API_SERVER_URL + `/user/${user?.id}`;
  const minSwipeDistance = 50;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(req_url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data. Please try again later.');
      }
    };

    fetchProfile();
  }, [user?.id, req_url]);

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

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!profileData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const currentHour = new Date().getHours();
  var firstName = "";
  var fullName = profileData.user.name;
  for (let i = 0; i < fullName.length; i++) {
    if (fullName[i] == ' ') break;
    else firstName += fullName[i];
  }
  const greeting = (currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening") + ` ` + firstName;

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
            <img src={profileData.user.avatar || img} alt="Profile" />
          </Link>
        </div>
        <h1 className={styles.greeting}>{greeting}</h1>
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
              <button className={styles.followButton}>Connect</button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SecondarySidebar;
