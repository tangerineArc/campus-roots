import { Edit } from 'lucide-react';
import { useState } from 'react';
import profileData from "../data/profile-data.js";
import styles from '../styles/profile-section.module.css';
import Modal from './ModalSection.jsx';

const ProfileSection = () => {
  const [name, setName] = useState(profileData.name);
  const [about, setAbout] = useState(profileData.about);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempAbout, setTempAbout] = useState(about);

  const handleUpdate = () => {
    setName(tempName);
    setAbout(tempAbout);
    setIsModalOpen(false);
  };

  return (
    <section className={styles.profileSection}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          <img src={profileData.imageUrl} alt="Profile" />
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.about}>{about}</p>
        </div>
        <button className={styles.editButton} onClick={() => setIsModalOpen(true)}>
          <Edit size={18} />
        </button>
      </div>

      {isModalOpen && (
        <Modal title="Edit Profile" onClose={() => setIsModalOpen(false)}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="about">About</label>
            <input
              type="text"
              id="about"
              value={tempAbout}
              onChange={(e) => setTempAbout(e.target.value)}
            />
          </div>
          <div className={styles.modalActions}>
            <button className={styles.cancelButton} onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className={styles.updateButton} onClick={handleUpdate}>
              Update
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ProfileSection;