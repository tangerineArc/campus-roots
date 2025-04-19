import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth-context.jsx';
import styles from '../styles/section.module.css';
import Modal from './ModalSection.jsx';

const AchievementsSection = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);
  const [newAchievement, setNewAchievement] = useState({
    Title: '',
    Month: '',
    Year: '',
    Description: ''
  });

  const req_url = import.meta.env.VITE_API_SERVER_URL + `/user/${user?.id}`;
  const update_url = import.meta.env.VITE_API_SERVER_URL + `/user/achievements/update`;
  const delete_url = import.meta.env.VITE_API_SERVER_URL + `/user/achievements/delete`;

  const parseDate = (dateString) => {
    if (!dateString) return { month: '', year: '' };
    const date = new Date(dateString);
    return {
      month: date.toLocaleString('default', { month: 'long' }),
      year: date.getFullYear().toString()
    };
  };

  const formatDateForDB = (month, year) => {
    if (!month || !year) return null;
    const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;
    const paddedMonth = monthIndex.toString().padStart(2, '0');
    return `${year}-${paddedMonth}-01T00:00:00.000Z`;
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

        const data = await response.json();
        setProfileData(data.data);
        setAchievements(data.data.Achievements || []);
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

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const validateForm = () => {
    const errors = {};

    if (!newAchievement.Title.trim()) {
      errors.Title = 'Title is required';
    }

    if (!newAchievement.Month) {
      errors.Month = 'Month is required';
    }

    if (!newAchievement.Year) {
      errors.Year = 'Year is required';
    } else if (isNaN(newAchievement.Year) || newAchievement.Year.length !== 4) {
      errors.Year = 'Please enter a valid 4-digit year';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditAchievement = (id) => {
    const achievement = achievements.find(ach => ach.id === id);
    setEditingAchievement(achievement);

    const date = parseDate(achievement.Date);

    setNewAchievement({
      Title: achievement.Title,
      Month: date.month,
      Year: date.year,
      Description: achievement.Description || ''
    });

    setFormErrors({});
  };

  const handleUpdateAchievement = async () => {
    if (validateForm()) {
      const achievementData = {
        Title: newAchievement.Title.trim(),
        Description: newAchievement.Description.trim(),
        Date: formatDateForDB(newAchievement.Month, newAchievement.Year)
      };

      try {
        const updatedAchievements = editingAchievement
          ? achievements.map(ach =>
            ach.id === editingAchievement.id
              ? {
                ...ach,
                ...achievementData,
                logo: newAchievement.Title.charAt(0)
              }
              : ach
          )
          : [...achievements, {
            id: Date.now(),
            ...achievementData,
            logo: newAchievement.Title.charAt(0)
          }];

        const response = await fetch(update_url, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Achievements: updatedAchievements
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update achievement');
        }

        const data = await response.json();
        setAchievements(data.data.Achievements || []);
        setEditingAchievement(null);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error updating achievement:', error);
        setError('Failed to update achievement. Please try again.');
      }
    }
  };

  const handleDeleteAchievement = async (id) => {
    try {
      const updatedAchievements = achievements.filter(ach => ach.id !== id);

      const response = await fetch(delete_url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Achievements: updatedAchievements
        })
      });

      if (!response.ok) {
        throw new Error('Failed to delete achievement');
      }

      const data = await response.json();
      setAchievements(data.data.Achievements || []);
    } catch (error) {
      console.error('Error deleting achievement:', error);
      setError('Failed to delete achievement. Please try again.');
    }
  };

  const resetForm = () => {
    setEditingAchievement(null);
    setNewAchievement({
      Title: '',
      Month: '',
      Year: '',
      Description: ''
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
        {achievements.map((achievement) => {
          const date = parseDate(achievement.Date);
          return (
            <div key={achievement.id} className={styles.card}>
              <div className={styles.cardLogo}>
                {achievement.Title.charAt(0)}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{achievement.Title}</h3>
                <p className={styles.cardSubtitle}>{date.month} {date.year}</p>
                {achievement.Description && (
                  <p className={styles.cardDescription}>{achievement.Description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <Modal title="Edit Achievements" onClose={handleCloseModal}>
          <div className={styles.achievementList}>
            {achievements.map((achievement) => (
              <div key={achievement.id} className={styles.achievementItem}>
                <div className={styles.achievementInfo}>
                  <span className={styles.achievementTitle}>{achievement.Title}</span>
                  <span className={styles.achievementSubtitle}>
                    {parseDate(achievement.Date).month} {parseDate(achievement.Date).year}
                  </span>
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
                value={newAchievement.Title}
                onChange={(e) => setNewAchievement({ ...newAchievement, Title: e.target.value })}
                className={formErrors.Title ? styles.inputError : ''}
              />
              {formErrors.Title && <div className={styles.errorMessage}>{formErrors.Title}</div>}
            </div>

            <div className={styles.dateGroup}>
              <h4 className={styles.dateGroupTitle}>Date<span className={styles.required}>*</span></h4>
              <div className={styles.dateInputs}>
                <div className={styles.dateInput}>
                  <select
                    id="month"
                    value={newAchievement.Month}
                    onChange={(e) => setNewAchievement({ ...newAchievement, Month: e.target.value })}
                    className={formErrors.Month ? styles.inputError : ''}
                  >
                    <option value="">Month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  {formErrors.Month && <div className={styles.errorMessage}>{formErrors.Month}</div>}
                </div>

                <div className={styles.dateInput}>
                  <input
                    type="text"
                    id="year"
                    placeholder="YYYY"
                    maxLength="4"
                    value={newAchievement.Year}
                    onChange={(e) => setNewAchievement({ ...newAchievement, Year: e.target.value })}
                    className={formErrors.Year ? styles.inputError : ''}
                  />
                  {formErrors.Year && <div className={styles.errorMessage}>{formErrors.Year}</div>}
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description (Optional)</label>
              <input
                type="text"
                id="description"
                value={newAchievement.Description}
                onChange={(e) => setNewAchievement({ ...newAchievement, Description: e.target.value })}
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