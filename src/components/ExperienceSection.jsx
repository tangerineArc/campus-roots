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

export default function ExperienceSection({ data }) {
  const { user } = useAuth();

  const [experiences, setExperiences] = useState(data?.experiences || []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingExperience, setEditingExperience] = useState();
  const [newExperience, setNewExperience] = useState({
    organization: "",
    title: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
  });

  const [error, setError] = useState();

  const handleEditExperience = (id) => {
    const experience = experiences.find((exp) => exp.id === id);
    setEditingExperience(experience);

    setNewExperience({
      organization: experience.organization,
      title: experience.title,
      startMonth: experience.startMonth,
      startYear: experience.startYear,
      endMonth: experience.endMonth,
      endYear: experience.endYear,
    });
  };

  const handleUpdateExperience = async () => {
    try {
      const updatedExperiences = editingExperience
        ? experiences.map((exp) =>
            exp.id === editingExperience.id ? { ...exp, ...newExperience } : exp
          )
        : [...experiences, newExperience];

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/user/experiences`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            experiences: updatedExperiences,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update experience");
      }

      const data = await response.json();
      setExperiences(data?.user?.experiences);
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setError("Failed to update experience. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExperience(null);
    setNewExperience({
      organization: "",
      title: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
    });
  };

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <p className={styles.title}>Experience</p>
        <button className={styles.edit} onClick={() => setIsModalOpen(true)}>
          <Edit />
        </button>
      </div>

      <div className={styles.content}>
        {experiences.map(
          ({
            id,
            organization,
            title,
            startMonth,
            startYear,
            endMonth,
            endYear,
          }) => (
            <div key={id} className={styles.card}>
              <div className={styles.cardLogo}>
                {organization[0].toUpperCase()}
              </div>

              <div className={styles.cardInfo}>
                <p className={styles.cardTitle}>{organization}</p>
                <p className={styles.cardSubtitle}>{title}</p>
                <p className={styles.cardDescription}>
                  {`${startMonth.slice(0, 3)} ${startYear}`} -{" "}
                  {endMonth ? `${endMonth.slice(0, 3)} ${endYear}` : "Present"}
                </p>
              </div>
            </div>
          )
        )}
        {experiences.length === 0 &&
          (data.id === user.id ? "Add an experience" : "No experiences added")}
      </div>

      {isModalOpen && (
        <Modal title="Edit Experiences" onClose={handleCloseModal}>
          {experiences.length !== 0 && (
            <div className={styles.list}>
              {experiences.map(({ id, organization, title }) => (
                <div key={id} className={styles.listItem}>
                  <div className={styles.listInfo}>
                    <span className={styles.listOrg}>{organization}</span>
                    <Dot />
                    <span className={styles.listRole}>{title}</span>
                  </div>
                  <div className={styles.listActions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleEditExperience(id)}
                    >
                      <Edit />
                    </button>
                    <button className={styles.actionButton}>
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.formSection}>
            <p className={styles.formTitle}>
              {editingExperience ? "Update Experience" : "Add New Experience"}
            </p>

            <div className={styles.formGroup}>
              <label htmlFor="organization">Organization</label>
              <input
                type="text"
                id="organization"
                value={newExperience.organization}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    organization: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="title">Job Title</label>
              <input
                type="text"
                id="title"
                value={newExperience.title}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, title: e.target.value })
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label>Start Date</label>
              <div className={styles.dateInputs}>
                <select
                  id="startMonth"
                  value={newExperience.startMonth}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      startMonth: e.target.value,
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
                  type="text"
                  id="startYear"
                  placeholder="YYYY"
                  maxLength="4"
                  value={newExperience.startYear}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      startYear: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>End Date</label>
              <div className={styles.dateInputs}>
                <select
                  id="endMonth"
                  value={newExperience.endMonth || ""}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      endMonth: e.target.value,
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
                  type="text"
                  id="endYear"
                  placeholder="YYYY"
                  maxLength="4"
                  value={newExperience.endYear || ""}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      endYear: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <button
              className={styles.addButton}
              onClick={handleUpdateExperience}
            >
              {editingExperience ? "Update" : "Add"} Experience
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}

ExperienceSection.propTypes = {
  data: exact({ id: string, experiences: array }),
};
