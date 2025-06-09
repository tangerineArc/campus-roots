import { Edit, Trash2 } from "lucide-react";
import { array, exact, string } from "prop-types";
import { useState } from "react";
import { useAuth } from "../contexts/auth-context.jsx";

import Modal from "./Modal.jsx";

import styles from "../styles/profile-page-sections.module.css";

export default function SkillsSection({ data, curUserId }) {
  const [skills, setSkills] = useState(data?.skills || []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({ label: "" });

  const [error, setError] = useState();
  const { user } = useAuth();

  const handleEditSkill = (id) => {
    const skill = skills.find((s) => s.id === id);
    setEditingSkill(skill);
    setNewSkill({ label: skill.label });
  };

  const handleDeleteSkill = async (id) => {
    try {
      const updatedSkills = skills.filter(skill => skill.id !== id);

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/user/skills`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skills: updatedSkills,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete skill");
      }

      const data = await response.json();
      setSkills(data?.user?.skills);
    } catch (error) {
      console.error(error);
      setError("Failed to delete skill. Please try again.");
    }
  };

  const handleUpdateSkill = async () => {
    try {
      if (!newSkill.label?.trim()) {
        setError("Skill name is required");
        return;
      }

      const updatedSkills = editingSkill
        ? skills.map((skill) =>
          skill.id === editingSkill.id ? { ...skill, ...newSkill } : skill
        )
        : [...skills, newSkill];

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/user/skills`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skills: updatedSkills,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update skill");
      }

      const data = await response.json();
      setSkills(data?.user?.skills);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      setError("Failed to update skill. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
    setNewSkill({ label: "" });
    setError("");
  };

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <p className={styles.title}>Skills</p>
        {curUserId === user.id && <button className={styles.edit} onClick={() => setIsModalOpen(true)}>
          <Edit />
        </button>}
      </div>

      <div className={styles.skillContent}>
        {skills.map((skill) => (
          <div key={skill.id} className={styles.skillItem}>
            {skill.label}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal title="Edit Skills" onClose={handleCloseModal}>
          {skills.length !== 0 && (
            <div className={styles.list}>
              {skills.map((skill) => (
                <div key={skill.id} className={styles.listItem}>
                  <span className={styles.listOrg}>{skill.label}</span>
                  <div className={styles.listActions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleEditSkill(skill.id)}
                    >
                      <Edit />
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleDeleteSkill(skill.id)}
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
              {editingSkill ? "Edit Skill" : "Add Skill"}
            </h3>
            <div className={styles.formGroup}>
              <label htmlFor="skill">Skill Name</label>
              <input
                type="text"
                id="skill"
                value={newSkill.label || ""}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, label: e.target.value })
                }
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.addButton} onClick={handleUpdateSkill}>
              {editingSkill ? "Update" : "Add"} Skill
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}

SkillsSection.propTypes = {
  data: exact({ id: string, skills: array }),
};
