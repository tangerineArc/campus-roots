import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import styles from '../styles/section.module.css';
import Modal from './ModalSection.jsx';
import profileData from '../data/profile-data.js';

const SkillsSection = () => {
  const [skills, setSkills] = useState(profileData.skills);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([
        ...skills,
        {
          id: Date.now(),
          name: newSkill
        }
      ]);
      setNewSkill('');
    }
  };

  const handleEditSkill = (id) => {
    const skill = skills.find(s => s.id === id);
    setEditingSkill(skill);
    setNewSkill(skill.name);
  };

  const handleUpdateSkill = () => {
    if (editingSkill && newSkill.trim()) {
      setSkills(skills.map(s =>
        s.id === editingSkill.id
          ? { ...s, name: newSkill }
          : s
      ));
      setEditingSkill(null);
    } else {
      handleAddSkill();
    }
    setNewSkill('');
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>SKILLS</h2>
        <button className={styles.editButton} onClick={() => setIsModalOpen(true)}>
          <Edit size={18} />
        </button>
      </div>

      <div className={styles.sectionContent}>
        {skills.map((skill) => (
          <div key={skill.id} className={styles.skillItem}>
            {skill.name}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal title="Edit Skills" onClose={() => {
          setIsModalOpen(false);
          setEditingSkill(null);
          setNewSkill('');
        }}>
          <div className={styles.skillsList}>
            {skills.map((skill) => (
              <div key={skill.id} className={styles.skillListItem}>
                <span className={styles.skillName}>{skill.name}</span>
                <div className={styles.skillActions}>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleEditSkill(skill.id)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleDeleteSkill(skill.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.formTitle}>
              {editingSkill ? 'Edit Skill' : 'Add Skill'}
            </h3>
            <div className={styles.formGroup}>
              <label htmlFor="skill">Skill Name</label>
              <input
                type="text"
                id="skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
            </div>
            <button className={styles.addButton} onClick={handleUpdateSkill}>
              {editingSkill ? 'Update' : 'Add'} Skill
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default SkillsSection;