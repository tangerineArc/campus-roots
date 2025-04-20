import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth-context.jsx';
import styles from '../styles/profile-page.module.css';
import AchievementsSection from './AchievementsSection.jsx';
import EducationSection from './EducationSection.jsx';
import ExperienceSection from './ExperienceSection.jsx';
import ProfileSection from './ProfileSection.jsx';
import SideBar from './Sidebar';
import SkillsSection from './SkillsSection.jsx';

function ProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const req_url = import.meta.env.VITE_API_SERVER_URL + `/user/${user.id}`;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(req_url, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProfileData(data.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data. Please try again later.');
      }
    };

    fetchProfile();
  }, [user?.id, req_url]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!profileData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      <SideBar />
      <main className={styles.main}>
        <ProfileSection userProfileData={profileData} />
        <ExperienceSection userProfileData={profileData} />
        <EducationSection userProfileData={profileData} />
        <SkillsSection userProfileData={profileData} />
        <AchievementsSection userProfileData={profileData} />
      </main>
    </div>
  );
}

export default ProfilePage;