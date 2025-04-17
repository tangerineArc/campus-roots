import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import profileData from '../data/profile-data.js';
import styles from '../styles/section.module.css';
import Modal from './ModalSection.jsx';

const AchievementsSection = () => {
  const [achievements, setAchievements] = useState(profileData.achievements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    month: '',
    year: '',
    description: ''
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formatDate = (month, year) => {
    return `${month.substring(0, 3)} ${year}`;
  };

  const validateForm = () => {
    const errors = {};
    
    if (!newAchievement.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!newAchievement.month) {
      errors.month = 'Month is required';
    }
    
    if (!newAchievement.year) {
      errors.year = 'Year is required';
    } else if (isNaN(newAchievement.year) || newAchievement.year.length !== 4) {
      errors.year = 'Please enter a valid 4-digit year';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddAchievement = () => {
    if (validateForm()) {
      const formattedDate = formatDate(newAchievement.month, newAchievement.year);
      
      setAchievements([
        ...achievements,
        {
          id: Date.now(),
          ...newAchievement,
          date: formattedDate,
          logo: newAchievement.title.charAt(0)
        }
      ]);
      
      setIsModalOpen(false);
      resetForm();
    }
  };

  const handleEditAchievement = (id) => {
    const achievement = achievements.find(ach => ach.id === id);
    setEditingAchievement(achievement);
    
    let month = '';
    let year = '';
    
    if (achievement.month && achievement.year) {
      month = achievement.month;
      year = achievement.year;
    } else if (achievement.date) {
      const dateParts = achievement.date.split(' ');
      if (dateParts.length >= 2) {
        const abbrevMonth = dateParts[0];
        month = months.find(m => m.startsWith(abbrevMonth)) || '';
        year = dateParts[1] || '';
      }
    }
    
    setNewAchievement({
      title: achievement.title,
      month: month,
      year: year,
      description: achievement.description || ''
    });
    
    setFormErrors({});
  };

  const handleUpdateAchievement = () => {
    if (validateForm()) {
      const formattedDate = formatDate(newAchievement.month, newAchievement.year);
      
      if (editingAchievement) {
        setAchievements(achievements.map(ach =>
          ach.id === editingAchievement.id
            ? { 
                ...ach, 
                ...newAchievement,
                date: formattedDate,
                logo: newAchievement.title.charAt(0)
              }
            : ach
        ));
      } else {
        handleAddAchievement();
        return;
      }
      setIsModalOpen(false);
      resetForm();
    }
  };

  const handleDeleteAchievement = (id) => {
    setAchievements(achievements.filter(ach => ach.id !== id));
  };

  const resetForm = () => {
    setEditingAchievement(null);
    setNewAchievement({
      title: '',
      month: '',
      year: '',
      description: ''
    });
    setFormErrors({});
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>ACHIEVEMENTS</h2>
        <button className={styles.editButton} onClick={() => setIsModalOpen(true)}>
          <Edit size={18} />
        </button>
      </div>

      <div className={styles.sectionContent}>
        {achievements.map((achievement) => (
          <div key={achievement.id} className={styles.card}>
            <div className={styles.cardLogo}>
              {achievement.logo}
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{achievement.title}</h3>
              <p className={styles.cardSubtitle}>{achievement.month} {achievement.year}</p>
              {achievement.description && (
                <p className={styles.cardDescription}>{achievement.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal title="Edit Achievements" onClose={handleCloseModal}>
          <div className={styles.achievementList}>
            {achievements.map((achievement) => (
              <div key={achievement.id} className={styles.achievementItem}>
                <div className={styles.achievementInfo}>
                  <span className={styles.achievementTitle}>{achievement.title}</span>
                  <span className={styles.achievementSubtitle}>{achievement.date}</span>
                </div>
                <div className={styles.achievementActions}>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleEditAchievement(achievement.id)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleDeleteAchievement(achievement.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.formTitle}>
              {editingAchievement ? 'Edit Achievement' : 'Add Achievement'}
            </h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="title">Title<span className={styles.required}>*</span></label>
              <input
                type="text"
                id="title"
                value={newAchievement.title}
                onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                className={formErrors.title ? styles.inputError : ''}
              />
              {formErrors.title && <div className={styles.errorMessage}>{formErrors.title}</div>}
            </div>
            
            <div className={styles.dateGroup}>
              <h4 className={styles.dateGroupTitle}>Date<span className={styles.required}>*</span></h4>
              <div className={styles.dateInputs}>
                <div className={styles.dateInput}>
                  <select
                    id="month"
                    value={newAchievement.month}
                    onChange={(e) => setNewAchievement({ ...newAchievement, month: e.target.value })}
                    className={formErrors.month ? styles.inputError : ''}
                  >
                    <option value="">Month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  {formErrors.month && <div className={styles.errorMessage}>{formErrors.month}</div>}
                </div>
                
                <div className={styles.dateInput}>
                  <input
                    type="text"
                    id="year"
                    placeholder="YYYY"
                    maxLength="4"
                    value={newAchievement.year}
                    onChange={(e) => setNewAchievement({ ...newAchievement, year: e.target.value })}
                    className={formErrors.year ? styles.inputError : ''}
                  />
                  {formErrors.year && <div className={styles.errorMessage}>{formErrors.year}</div>}
                </div>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="description">Description (Optional)</label>
              <input
                type="text"
                id="description"
                value={newAchievement.description}
                onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
              />
            </div>
            
            <button className={styles.addButton} onClick={handleUpdateAchievement}>
              {editingAchievement ? 'Update' : 'Add'} Achievement
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default AchievementsSection;