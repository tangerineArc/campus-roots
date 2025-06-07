import AchievementsSection from "../components/AchievementsSection.jsx";
import AllPosts from "../components/AllPosts.jsx";
import EducationSection from "../components/EducationSection.jsx";
import ExperienceSection from "../components/ExperienceSection.jsx";
import ProfileSection from "../components/ProfileSection.jsx";
import SideBar from "../components/Sidebar.jsx";
import SkillsSection from "../components/SkillsSection.jsx";

import { useAuth } from "../contexts/auth-context.jsx";

import useFetch from "../hooks/use-fetch.js";

import styles from "../styles/profile-page.module.css";

const options = { credentials: "include" };

export default function ProfilePage() {
  const { user } = useAuth();

  const {
    data: profileData,
    loading,
    error,
  } = useFetch(
    `${import.meta.env.VITE_API_SERVER_URL}/user/${user.id}`,
    options
  );

  if (loading) {
    return <p>Fetching data...</p>;
  }

  if (error) {
    return <p>Failed to fetch...</p>;
  }

  if (!profileData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <SideBar />

      <main className={styles.main}>
        <ProfileSection
          currUserId={user.id}
          data={{
            id: profileData.user.id,
            name: profileData.user.name,
            about: profileData.user.about,
            avatar: profileData.user.avatar,
          }}
        />
        <ExperienceSection
          data={{
            id: profileData.user.id,
            experiences: profileData.user.experiences,
          }}
        />
        <EducationSection
          data={{
            id: profileData.user.id,
            education: profileData.user.education,
          }}
        />
        <SkillsSection
          data={{
            id: profileData.user.id,
            skills: profileData.user.skills,
          }}
        />
        <AchievementsSection
          data={{
            id: profileData.user.id,
            achievements: profileData.user.achievements,
          }}
        />
        <AllPosts />
      </main>
    </div>
  );
}
