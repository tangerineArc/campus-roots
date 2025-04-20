import { Edit } from 'lucide-react';
import { useRef, useState } from 'react';
import img from "../assets/default-profile-picture.jpg";
import styles from '../styles/profile-section.module.css';
import Modal from './ModalSection.jsx';

const ProfileSection = ({ userProfileData }) => {
  const [name, setName] = useState(userProfileData?.name || '');
  const [about, setAbout] = useState(userProfileData?.About || '');
  const [imageUrl, setImageUrl] = useState(userProfileData?.Avatar || img);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState(userProfileData?.name || '');
  const [tempAbout, setTempAbout] = useState(userProfileData?.About || '');
  const [tempImageUrl, setTempImageUrl] = useState(userProfileData?.Avatar || img);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const update_url = import.meta.env.VITE_API_SERVER_URL + `/user/profile`;

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

  const handleUpdateProfile = async () => {
    try {
      // Ensure the avatar is a valid data URL (only modify if needed)
      let avatarToSend = tempImageUrl;
      if (!tempImageUrl.startsWith("data:image/")) {
        throw new Error("Invalid image format. Please upload a valid image.");
      }

      const profileData = {
        name: tempName.trim(),
        About: tempAbout.trim(),
        Avatar: avatarToSend,
      };

      const response = await fetch(update_url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Server Response:', errorBody);
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setName(tempName);
      setAbout(tempAbout);
      setImageUrl(avatarToSend);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
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
        <Modal title="Edit Profile" onClose={() => {
          setIsModalOpen(false);
          setTempName(name);
          setTempAbout(about);
          setTempImageUrl(imageUrl);
        }}>
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
            <button className={styles.updateButton} onClick={handleUpdateProfile}>
              Update
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ProfileSection;
