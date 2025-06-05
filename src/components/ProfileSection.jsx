import { UserPen } from "lucide-react";
import { exact, string } from "prop-types";
import { useRef, useState } from "react";
import defaultProfilePic from "../assets/default-profile-picture.jpg";
import styles from "../styles/profile-section.module.css";
import Modal from "./Modal.jsx";

export default function ProfileSection({ currUserId, data }) {
  const [name, setName] = useState(data?.name || "");
  const [about, setAbout] = useState(data?.about || "");
  const [avatar, setAvatar] = useState(data?.avatar || defaultProfilePic);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState(name || "");
  const [tempAbout, setTempAbout] = useState(about || "");
  const [tempImageUrl, setTempImageUrl] = useState(data?.avatar || defaultProfilePic);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const base64String = canvas.toDataURL('image/jpeg', 0.7);
          setTempImageUrl(base64String);
          setAvatar(base64String);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      if (!tempName.trim()) {
        setError("Name cannot be empty.");
        return;
      }

      const profileData = {
        name: tempName.trim(),
        about: tempAbout.trim(),
        avatar: tempImageUrl,
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
        console.log(response);
      }

      const { user } = await response.json();
      setName(user.name);
      setAbout(user.about);
      setAvatar(user.avatar || defaultProfilePic);
      setIsModalOpen(false);
      setError("");
    } catch (err) {
      console.error(err);
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
              {about || (currUserId === data.id ? "write a catchy headline..." : "")}
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
            setError("");
          }}
        >
          <div className={styles.imageUploadContainer}>
            <img src={tempImageUrl} alt="Preview" className={styles.previewImage} />
            <input
              type="file"
              ref={fileInputRef}
              className={styles.fileInput}
              accept="image/*"
              onChange={handleAvatarChange}
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

          {error && <p className={styles.error}>{error}</p>}

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
