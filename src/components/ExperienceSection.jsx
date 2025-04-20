import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import styles from '../styles/section.module.css';
import Modal from './ModalSection.jsx';

const ExperienceSection = ({ userProfileData }) => {
  const [experiences, setExperiences] = useState(userProfileData?.Experiences || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [newExperience, setNewExperience] = useState({
    company: '',
    Role: '',
    StartDate: '',
    EndDate: '',
    isPresent: false,
    endMonth: '',
    endYear: '',
    startMonth: '',
    startYear: ''
  });
  const update_url = import.meta.env.VITE_API_SERVER_URL + `/user/experience/update`;
  const delete_url = import.meta.env.VITE_API_SERVER_URL + `/user/experience/delete`;

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

  const handleEndDateChange = (month, year) => {
    setNewExperience(prev => ({
      ...prev,
      endMonth: month,
      endYear: year,
      EndDate: month && year ? formatDateForDB(month, year) : ''
    }));
  };

  const handlePresentToggle = (isChecked) => {
    setNewExperience(prev => ({
      ...prev,
      isPresent: isChecked,
      EndDate: null,
      endMonth: '',
      endYear: ''
    }));

    if (isChecked) {
      setFormErrors(prev => ({
        ...prev,
        EndDate: undefined
      }));
    }
  };

  const handleStartDateChange = (month, year) => {
    setNewExperience(prev => ({
      ...prev,
      startMonth: month,
      startYear: year,
      StartDate: formatDateForDB(month, year)
    }));
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const validateForm = () => {
    const errors = {};

    if (!newExperience.company.trim()) {
      errors.company = 'Company name is required';
    }

    if (!newExperience.Role.trim()) {
      errors.Role = 'Role is required';
    }

    if (!newExperience.StartDate) {
      errors.StartDate = 'Start date is required';
    }

    if (!newExperience.isPresent && !newExperience.EndDate) {
      errors.EndDate = 'End date is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditExperience = (id) => {
    const experience = experiences.find(exp => exp.id === id);
    setEditingExperience(experience);

    const startDate = parseDate(experience.StartDate);
    const endDate = parseDate(experience.EndDate);

    setNewExperience({
      company: experience.company,
      Role: experience.Role,
      StartDate: experience.StartDate,
      EndDate: experience.EndDate,
      isPresent: experience.isPresent,
      endMonth: endDate.month,
      endYear: endDate.year,
      startMonth: startDate.month,
      startYear: startDate.year
    });

    setFormErrors({});
  };

  const handleUpdateExperience = async () => {
    if (validateForm()) {
      const experienceData = {
        company: newExperience.company.trim(),
        Role: newExperience.Role.trim(),
        StartDate: newExperience.StartDate,
        EndDate: newExperience.isPresent ? null : newExperience.EndDate,
        isPresent: newExperience.isPresent
      };

      try {
        const updatedExperiences = editingExperience
          ? experiences.map(exp =>
            exp.id === editingExperience.id
              ? {
                ...exp,
                ...experienceData,
                logo: newExperience.company.charAt(0)
              }
              : exp
          )
          : [...experiences, {
            id: Date.now(),
            ...experienceData,
            logo: newExperience.company.charAt(0)
          }];

        const response = await fetch(update_url, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Experiences: updatedExperiences
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update experience');
        }

        const data = await response.json();
        setExperiences(data.data.Experiences || []);
        setIsModalOpen(false);
        resetForm();
      } catch (error) {
        console.error('Error updating experience:', error);
        setError('Failed to update experience. Please try again.');
      }
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      const updatedExperiences = experiences.filter(exp => exp.id !== id);

      const response = await fetch(delete_url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Experiences: updatedExperiences
        })
      });

      if (!response.ok) {
        throw new Error('Failed to delete experience');
      }

      const data = await response.json();
      setExperiences(data.data.Experiences || []);
    } catch (error) {
      console.error('Error deleting experience:', error);
      setError('Failed to delete experience. Please try again.');
    }
  };

  const resetForm = () => {
    setEditingExperience(null);
    setNewExperience({
      company: '',
      Role: '',
      StartDate: '',
      EndDate: '',
      isPresent: false,
      endMonth: '',
      endYear: '',
      startMonth: '',
      startYear: ''
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
        <h2 className={styles.sectionTitle}>EXPERIENCE</h2>
        <button className={styles.editButton} onClick={() => setIsModalOpen(true)}>
          <Edit size={18} />
        </button>
      </div>

      <div className={styles.sectionContent}>
        {experiences.map((exp) => {
          const startDate = parseDate(exp.StartDate);
          const endDate = parseDate(exp.EndDate);
          return (
            <div key={exp.id} className={styles.card}>
              <div className={styles.cardLogo}>
                {exp.company.charAt(0)}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{exp.company}</h3>
                <p className={styles.cardSubtitle}>{exp.Role}</p>
                <p className={styles.cardDescription}>
                  {startDate.month} {startDate.year} - {exp.isPresent ? 'Present' : `${endDate.month} ${endDate.year}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <Modal title="Edit Experience" onClose={handleCloseModal}>
          <div className={styles.experienceList}>
            {experiences.map((exp) => (
              <div key={exp.id} className={styles.experienceItem}>
                <div className={styles.experienceInfo}>
                  <span className={styles.experienceCompany}>{exp.company}</span>
                  <span className={styles.experienceRole}>{exp.Role}</span>
                </div>
                <div className={styles.experienceActions}>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleEditExperience(exp.id)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleDeleteExperience(exp.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.formTitle}>
              {editingExperience ? 'Edit Experience' : 'Add Experience'}
            </h3>

            <div className={styles.formGroup}>
              <label htmlFor="company">Company<span className={styles.required}>*</span></label>
              <input
                type="text"
                id="company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                className={formErrors.company ? styles.inputError : ''}
              />
              {formErrors.company && <div className={styles.errorMessage}>{formErrors.company}</div>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role">Role<span className={styles.required}>*</span></label>
              <input
                type="text"
                id="role"
                value={newExperience.Role}
                onChange={(e) => setNewExperience({ ...newExperience, Role: e.target.value })}
                className={formErrors.Role ? styles.inputError : ''}
              />
              {formErrors.Role && <div className={styles.errorMessage}>{formErrors.Role}</div>}
            </div>

            <div className={styles.dateGroup}>
              <h4 className={styles.dateGroupTitle}>Start Date<span className={styles.required}>*</span></h4>
              <div className={styles.dateInputs}>
                <div className={styles.dateInput}>
                  <select
                    id="startMonth"
                    value={newExperience.startMonth}
                    onChange={(e) => handleStartDateChange(e.target.value, newExperience.startYear)}
                    className={formErrors.StartDate ? styles.inputError : ''}
                  >
                    <option value="">Month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  {formErrors.StartDate && <div className={styles.errorMessage}>{formErrors.StartDate}</div>}
                </div>

                <div className={styles.dateInput}>
                  <input
                    type="text"
                    id="startYear"
                    placeholder="YYYY"
                    maxLength="4"
                    value={newExperience.startYear}
                    onChange={(e) => handleStartDateChange(newExperience.startMonth, e.target.value)}
                    className={formErrors.StartDate ? styles.inputError : ''}
                  />
                  {formErrors.StartDate && <div className={styles.errorMessage}>{formErrors.StartDate}</div>}
                </div>
              </div>
            </div>

            <div className={styles.dateGroup}>
              <div className={styles.dateGroupHeader}>
                <h4 className={styles.dateGroupTitle}>End Date{!newExperience.isPresent && <span className={styles.required}>*</span>}</h4>
                <div className={styles.presentCheckbox}>
                  <input
                    type="checkbox"
                    id="isPresent"
                    checked={newExperience.isPresent}
                    onChange={(e) => handlePresentToggle(e.target.checked)}
                  />
                  <label htmlFor="isPresent">Present</label>
                </div>
              </div>

              {!newExperience.isPresent && (
                <div className={styles.dateInputs}>
                  <div className={styles.dateInput}>
                    <select
                      id="endMonth"
                      value={newExperience.endMonth}
                      onChange={(e) => handleEndDateChange(e.target.value, newExperience.endYear)}
                      className={formErrors.EndDate ? styles.inputError : ''}
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    {formErrors.EndDate && <div className={styles.errorMessage}>{formErrors.EndDate}</div>}
                  </div>

                  <div className={styles.dateInput}>
                    <input
                      type="text"
                      id="endYear"
                      placeholder="YYYY"
                      maxLength="4"
                      value={newExperience.endYear}
                      onChange={(e) => handleEndDateChange(newExperience.endMonth, e.target.value)}
                      className={formErrors.EndDate ? styles.inputError : ''}
                    />
                    {formErrors.EndDate && <div className={styles.errorMessage}>{formErrors.EndDate}</div>}
                  </div>
                </div>
              )}
            </div>

            <button className={styles.addButton} onClick={handleUpdateExperience}>
              {editingExperience ? 'Update' : 'Add'} Experience
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ExperienceSection;