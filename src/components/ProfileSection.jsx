import { Edit } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import img from "../assets/default-profile-picture.jpg";
import { useAuth } from '../contexts/auth-context.jsx';
import styles from '../styles/profile-section.module.css';
import Modal from './ModalSection.jsx';

const ProfileSection = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [imageUrl, setImageUrl] = useState(img);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempAbout, setTempAbout] = useState('');
  const [tempImageUrl, setTempImageUrl] = useState(img);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [newProfile, setNewProfile] = useState({
    name: '',
    about: '',
    avatar: img
  });

  const req_url = import.meta.env.VITE_API_SERVER_URL + `/user/${user?.id}`;
  const update_url = import.meta.env.VITE_API_SERVER_URL + `/user/profile`;

  const handleUpdate = () => {
    handleUpdateProfile();
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

      console.log("Sending profileData:", profileData); // DEBUG LOG

      const response = await fetch(update_url, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(profileData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorBody = await response.text(); // Get server response text
        console.error('Server Response:', errorBody);
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setProfileData(data.data);
      setName(tempName);
      setAbout(tempAbout);
      setImageUrl(avatarToSend);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };


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

        let data = await response.json();
        data = data.data;

        const avatarUrl = data.Avatar?.startsWith('data:image')
          ? data.Avatar
          : `data:image/jpeg;base64,${data.Avatar}`;

        setProfileData(data);
        setName(data.name || '');
        setAbout(data.About || '');
        setImageUrl(avatarUrl || img);
        setTempName(data.name || '');
        setTempAbout(data.About || '');
        setTempImageUrl(avatarUrl || img);
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
