import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import styles from '../styles/section.module.css';
import Modal from './ModalSection.jsx';

const SkillsSection = ({ userProfileData }) => {
  const [skills, setSkills] = useState(userProfileData?.Skills || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const update_url = import.meta.env.VITE_API_SERVER_URL + `/user/skill/update`;
  const delete_url = import.meta.env.VITE_API_SERVER_URL + `/user/skill/delete`;

  const handleEditSkill = (id) => {
    const skill = skills.find(s => s.id === id);
    setEditingSkill(skill);
    setNewSkill(skill.SkillName);
  };

  const validateForm = () => {
    if (!newSkill.trim()) {
      setError('Skill name cannot be empty');
      return false;
    }
    return true;
  };

  const handleUpdateSkill = async () => {
    if (validateForm()) {
      const skillData = {
        SkillName: newSkill.trim()
      };

      try {
        const updatedSkills = editingSkill
          ? skills.map(skill =>
            skill.id === editingSkill.id
              ? {
                ...skill,
                ...skillData
              }
              : skill
          )
          : [...skills, {
            id: Date.now(),
            ...skillData
          }];

        const response = await fetch(update_url, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Skills: updatedSkills
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update skill');
        }

        const data = await response.json();
        setSkills(data.data.Skills || []);
        setEditingSkill(null);
        setNewSkill('');
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error updating skill:', error);
        setError('Failed to update skill. Please try again.');
      }
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      const updatedSkills = skills.filter(skill => skill.id !== id);

      const response = await fetch(delete_url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Skills: updatedSkills
        })
      });

      if (!response.ok) {
        throw new Error('Failed to delete skill');
      }

      const data = await response.json();
      setSkills(data.data.Skills || []);
    } catch (error) {
      console.error('Error deleting skill:', error);
      setError('Failed to delete skill. Please try again.');
    }
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
            {skill.SkillName}
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
                <span className={styles.skillName}>{skill.SkillName}</span>
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