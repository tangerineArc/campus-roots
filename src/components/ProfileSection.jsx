import { UserPen } from "lucide-react";
import { exact, string } from "prop-types";
import { useRef, useState } from "react";

import Modal from "./Modal.jsx";

import defaultProfilePic from "../assets/default-profile-picture.jpg";

import styles from "../styles/profile-section.module.css";

export default function ProfileSection({ currUserId, data }) {
  const [name, setName] = useState(data?.name || "");
  const [about, setAbout] = useState(data?.about || "");
  const [avatar, setAvatar] = useState(data?.avatar || defaultProfilePic);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tempName, setTempName] = useState(name || "");
  const [tempAbout, setTempAbout] = useState(about || "");
  const [tempImageUrl, setTempImageUrl] = useState(avatar || "");

  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  const handleUpdateProfile = async () => {
    try {
      const profileData = {
        name: tempName.trim(),
        about: tempAbout.trim(),
        avatar: data?.avatar,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/user/profile`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const { user } = await response.json();

      setName(user.name);
      setAbout(user.about);
      setAvatar(user.avatar || defaultProfilePic);

      setIsModalOpen(false);
    } catch {
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.main}>
        <div className={styles.info}>
          <img src={avatar} alt="Profile" className={styles.avatar} />
          <div className={styles.text}>
            <p className={styles.name}>{name}</p>
            <p className={styles.about}>
              {about ||
                (currUserId === data.id ? "write a catchy headline..." : "")}
            </p>
          </div>
        </div>
        <button className={styles.edit} onClick={() => setIsModalOpen(true)}>
          <UserPen />
        </button>
      </div>

      {isModalOpen && (
        <Modal
          title="Edit Profile"
          onClose={() => {
            setIsModalOpen(false);
            setTempName(name);
            setTempAbout(about);
            setTempImageUrl(avatar);
          }}
        >
          <div className={styles.imageUploadContainer}>
            <img src={tempImageUrl} className={styles.previewImage} />
            <input
              type="file"
              ref={fileInputRef}
              className={styles.fileInput}
            />
            <button
              className={styles.uploadButton}
              onClick={() => fileInputRef.current.click()}
            >
              Change Photo
            </button>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="about" className={styles.label}>
              About
            </label>
            <input
              type="text"
              id="about"
              value={tempAbout}
              onChange={(e) => setTempAbout(e.target.value)}
              className={styles.input}
            />
          </div>

          <button className={styles.updateButton} onClick={handleUpdateProfile}>
            Update
          </button>
        </Modal>
      )}
    </section>
  );
}

ProfileSection.propTypes = {
  currUserId: string,
  data: exact({ id: string, name: string, about: string, avatar: string }),
};
