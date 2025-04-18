import { Edit } from 'lucide-react';
import { useRef, useState } from 'react';
import profileData from "../data/profile-data.js";
import styles from '../styles/profile-section.module.css';
import Modal from './ModalSection.jsx';

const ProfileSection = () => {
  const [name, setName] = useState(profileData.name);
  const [about, setAbout] = useState(profileData.about);
  const [imageUrl, setImageUrl] = useState(profileData.imageUrl);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempAbout, setTempAbout] = useState(about);
  const [tempImageUrl, setTempImageUrl] = useState(imageUrl);
  const fileInputRef = useRef(null);

  const handleUpdate = () => {
    setName(tempName);
    setAbout(tempAbout);
    setImageUrl(tempImageUrl);
    setIsModalOpen(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className={styles.profileSection}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          <img src={imageUrl} alt="Profile" />
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
            <label>Profile Picture</label>
            <div className={styles.imageUploadContainer}>
              <div className={styles.previewImage}>
                <img src={tempImageUrl} alt="Preview" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <button
                className={styles.uploadButton}
                onClick={() => fileInputRef.current.click()}
              >
                Change Photo
              </button>
            </div>
          </div>
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