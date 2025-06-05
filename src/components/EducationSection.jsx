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

export default function EducationSection({ data }) {
  const { user } = useAuth();

  const [allEducation, setAllEducation] = useState(data?.education || []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingEducation, setEditingEducation] = useState();
  const [newEducation, setNewEducation] = useState({
    school: "",
    degree: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
  });

  const [error, setError] = useState("");

  const handleEditExperience = (id) => {
    const education = allEducation.find((edu) => edu.id === id);
    setEditingEducation(education);
    setNewEducation({ ...education });
  };

  const handleDeleteEducation = async (id) => {
    try {
      const updatedEducation = allEducation.filter(edu => edu.id !== id);

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/user/education`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            education: updatedEducation,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete education");
      }

      const data = await response.json();
      setAllEducation(data?.user?.education);
    } catch (error) {
      console.error(error);
      setError("Failed to delete education. Please try again.");
    }
  };

  const handleUpdateEducation = async () => {
    try {
      if (!newEducation.school?.trim() || !newEducation.degree?.trim() ||
        !newEducation.startMonth || !newEducation.startYear) {
        setError("School, degree, start month and start year are required");
        return;
      }

      const updatedEducation = editingEducation
        ? allEducation.map((edu) =>
          edu.id === editingEducation.id ? { ...edu, ...newEducation } : edu
        )
        : [...allEducation, newEducation];

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/user/education`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            education: updatedEducation,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update education");
      }

      const data = await response.json();
      setAllEducation(data?.user?.education);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      setError("Failed to update education. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEducation(null);
    setNewEducation({
      school: "",
      degree: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
    });
    setError("");
  };

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <p className={styles.title}>Education</p>
        <button className={styles.edit} onClick={() => setIsModalOpen(true)}>
          <Edit />
        </button>
      </div>

      <div className={styles.content}>
        {allEducation.map(
          ({
            id,
            school,
            degree,
            startMonth,
            startYear,
            endMonth,
            endYear,
          }) => (
            <div key={id} className={styles.card}>
              <div className={styles.cardLogo}>{school[0].toUpperCase()}</div>

              <div className={styles.cardInfo}>
                <p className={styles.cardTitle}>{school}</p>
                <p className={styles.cardSubtitle}>{degree}</p>
                <p className={styles.cardDescription}>
                  {`${startMonth.slice(0, 3)} ${startYear}`} -{" "}
                  {endMonth ? `${endMonth.slice(0, 3)} ${endYear}` : "Present"}
                </p>
              </div>
            </div>
          )
        )}
        {allEducation.length === 0 &&
          (data.id === user.id ? "Add an education" : "No education added")}
      </div>

      {isModalOpen && (
        <Modal title="Edit Education" onClose={handleCloseModal}>
          {allEducation.length !== 0 && (
            <div className={styles.list}>
              {allEducation.map((edu) => (
                <div key={edu.id} className={styles.listItem}>
                  <div className={styles.listInfo}>
                    <span className={styles.listOrg}>{edu.school}</span>
                    <Dot className={styles.dot} />
                    <span className={styles.listRole}>{edu.degree}</span>
                  </div>
                  <div className={styles.listActions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleEditExperience(edu.id)}
                    >
                      <Edit />
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleDeleteEducation(edu.id)}
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
              {editingEducation ? "Edit Education" : "Add Education"}
            </h3>

            <div className={styles.formGroup}>
              <label htmlFor="school">School</label>
              <input
                type="text"
                id="school"
                value={newEducation.school}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, school: e.target.value })
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="degree">Degree</label>
              <input
                type="text"
                id="degree"
                value={newEducation.degree}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, degree: e.target.value })
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label>Start Date</label>
              <div className={styles.dateInputs}>
                <select
                  value={newEducation.startMonth}
                  onChange={(e) =>
                    setNewEducation({
                      ...newEducation,
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
                  type="number"
                  placeholder="Year"
                  value={newEducation.startYear}
                  onChange={(e) =>
                    setNewEducation({
                      ...newEducation,
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
                  value={newEducation.endMonth}
                  onChange={(e) =>
                    setNewEducation({
                      ...newEducation,
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
                  type="number"
                  placeholder="Year"
                  value={newEducation.endYear}
                  onChange={(e) =>
                    setNewEducation({
                      ...newEducation,
                      endYear: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button className={styles.addButton} onClick={handleUpdateEducation}>
              {editingEducation ? "Update" : "Add"} Education
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}

EducationSection.propTypes = {
  data: exact({
    id: string,
    education: array,
  }),
};
