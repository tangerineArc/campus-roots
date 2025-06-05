import { Dot, Edit, Trash2 } from "lucide-react";
import { array, exact, string } from "prop-types";
import { useState } from "react";

import Modal from "./Modal.jsx";

import { useAuth } from "../contexts/auth-context.jsx";

import styles from "../styles/profile-page-sections.module.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AchievementsSection({ data }) {
  const { user } = useAuth();

  const [achievements, setAchievements] = useState(data?.achievements || []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingAchievement, setEditingAchievement] = useState(null);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    month: "",
    year: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleEditAchievement = (id) => {
    const achievement = achievements.find((ach) => ach.id === id);
    setEditingAchievement(achievement);
    setNewAchievement({ ...achievement });
  };

  const handleDeleteAchievement = async (id) => {
    try {
      const updatedAchievements = achievements.filter(ach => ach.id !== id);

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/user/achievements`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            achievements: updatedAchievements,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete achievement");
      }

      const data = await response.json();
      setAchievements(data?.user?.achievements);
    } catch (error) {
      console.error(error);
      setError("Failed to delete achievement. Please try again.");
    }
  };

  const handleUpdateAchievement = async () => {
    try {
      if (!newAchievement.title?.trim() || !newAchievement.month || !newAchievement.year) {
        setError("Title, month and year are required");
        return;
      }

      const updatedAchievements = editingAchievement
        ? achievements.map((ach) =>
          ach.id === editingAchievement.id ? { ...ach, ...newAchievement } : ach
        )
        : [...achievements, newAchievement];

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/user/achievements`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            achievements: updatedAchievements,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update achievement");
      }

      const data = await response.json();
      setAchievements(data?.user?.achievements);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      setError("Failed to update achievement. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAchievement(null);
    setNewAchievement({
      title: "",
      month: "",
      year: "",
      description: "",
    });
    setError("");
  };

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <p className={styles.title}>Achievements</p>
        <button className={styles.edit} onClick={() => setIsModalOpen(true)}>
          <Edit />
        </button>
      </div>

      <div className={styles.content}>
        {achievements.map(({ id, title, month, year, description }) => (
          <div key={id} className={styles.card}>
            <div className={styles.cardLogo}>{title[0].toUpperCase()}</div>
            <div className={styles.cardInfo}>
              <p className={styles.cardTitle}>{title}</p>
              <p className={styles.cardSubtitle}>
                {month} {year}
              </p>
              {description && (
                <p className={styles.cardDescription}>{description}</p>
              )}
            </div>
          </div>
        ))}
        {achievements.length === 0 &&
          (data.id === user.id
            ? "Add an achievement"
            : "No achievements added")}
      </div>

      {isModalOpen && (
        <Modal title="Edit Achievements" onClose={handleCloseModal}>
          {achievements.length !== 0 && (
            <div className={styles.list}>
              {achievements.map((ach) => (
                <div key={ach.id} className={styles.listItem}>
                  <div className={styles.listInfo}>
                    <span className={styles.listOrg}>{ach.title}</span>
                    <Dot className={styles.dot} />
                    <span className={styles.listRole}>
                      {ach.month} {ach.year}
                    </span>
                  </div>
                  <div className={styles.listActions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleEditAchievement(ach.id)}
                    >
                      <Edit />
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleDeleteAchievement(ach.id)}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.formSection}>
            <h3 className={styles.formTitle}>
              {editingAchievement ? "Edit Achievement" : "Add Achievement"}
            </h3>

            <div className={styles.formGroup}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={newAchievement.title}
                onChange={(e) =>
                  setNewAchievement({ ...newAchievement, title: e.target.value })
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label>Date</label>
              <div className={styles.dateInputs}>
                <select
                  value={newAchievement.month}
                  onChange={(e) =>
                    setNewAchievement({
                      ...newAchievement,
                      month: e.target.value,
                    })
                  }
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Year"
                  value={newAchievement.year}
                  onChange={(e) =>
                    setNewAchievement({
                      ...newAchievement,
                      year: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description (Optional)</label>
              <input
                type="text"
                id="description"
                value={newAchievement.description}
                onChange={(e) =>
                  setNewAchievement({
                    ...newAchievement,
                    description: e.target.value,
                  })
                }
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button className={styles.addButton} onClick={handleUpdateAchievement}>
              {editingAchievement ? "Update" : "Add"} Achievement
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}

AchievementsSection.propTypes = {
  data: exact({ id: string, achievements: array }),
};
