import styles from '../styles/profile-page.module.css';
import AchievementsSection from './AchievementsSection.jsx';
import EducationSection from './EducationSection.jsx';
import ExperienceSection from './ExperienceSection.jsx';
import ProfileSection from './ProfileSection.jsx';
import SideBar from './Sidebar';
import SkillsSection from './SkillsSection.jsx';

function ProfilePage() {
  return (
    <div className={styles.app}>
        <SideBar />
        <main className={styles.main}>
          <ProfileSection />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
          <AchievementsSection />
        </main>
      </div>
  );
}

export default ProfilePage;