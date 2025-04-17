import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import profileData from '../data/profile-data.js';
import styles from '../styles/section.module.css';
import Modal from './ModalSection.jsx';

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState(profileData.experience);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [newExperience, setNewExperience] = useState({
    company: '',
    role: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    isPresent: false
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  const validateForm = () => {
    const errors = {};
    
    if (!newExperience.company.trim()) {
      errors.company = 'Company name is required';
    }
    
    if (!newExperience.role.trim()) {
      errors.role = 'Role is required';
    }
    
    if (!newExperience.startMonth) {
      errors.startMonth = 'Start month is required';
    }
    
    if (!newExperience.startYear) {
      errors.startYear = 'Start year is required';
    } else if (isNaN(newExperience.startYear) || newExperience.startYear.length !== 4) {
      errors.startYear = 'Please enter a valid 4-digit year';
    }
    
    if (!newExperience.isPresent) {
      if (!newExperience.endMonth) {
        errors.endMonth = 'End month is required';
      }
      
      if (!newExperience.endYear) {
        errors.endYear = 'End year is required';
      } else if (isNaN(newExperience.endYear) || newExperience.endYear.length !== 4) {
        errors.endYear = 'Please enter a valid 4-digit year';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddExperience = () => {
    if (validateForm()) {
      setExperiences([
        ...experiences,
        {
          id: Date.now(),
          ...newExperience,
          startMonth: newExperience.startMonth,
          startYear : newExperience.startYear,
          endMonth : newExperience.endMonth,
          endYear : newExperience.endYear,
          isPresent : newExperience.isPresent,
          logo: newExperience.company.charAt(0)
        }
      ]);
      handleCloseModal();
    }
  };

  const handleEditExperience = (id) => {
    const experience = experiences.find(exp => exp.id === id);
    setEditingExperience(experience);
    
    const durationParts = experience.duration ? experience.duration.split(' - ') : [];
    const hasDuration = durationParts.length === 2;
    const startParts = hasDuration ? durationParts[0].split(' ') : [];
    const endParts = hasDuration ? durationParts[1].split(' ') : [];
    
    setNewExperience({
      company: experience.company,
      role: experience.role,
      startMonth: experience.startMonth || (startParts.length >= 2 ? startParts[0] : ''),
      startYear: experience.startYear || (startParts.length >= 2 ? startParts[1] : ''),
      endMonth: experience.endMonth || (endParts.length >= 2 && endParts[0] !== 'Present' ? endParts[0] : ''),
      endYear: experience.endYear || (endParts.length >= 2 && endParts[0] !== 'Present' ? endParts[1] : ''),
      isPresent: experience.isPresent || (hasDuration && durationParts[1] === 'Present')
    });
    
    setFormErrors({});
  };

  const handleUpdateExperience = () => {
    if (validateForm()) {
      if (editingExperience) {
        setExperiences(experiences.map(exp =>
          exp.id === editingExperience.id
            ? { 
                ...exp, 
                ...newExperience, 
                startMonth: newExperience.startMonth,
                startYear : newExperience.startYear,
                endMonth : newExperience.endMonth,
                endYear : newExperience.endYear,
                isPresent : newExperience.isPresent,
                logo: newExperience.company.charAt(0) 
              }
            : exp
        ));
      } else {
        handleAddExperience();
        return;
      }
      handleCloseModal();
    }
  };
  

  const handleDeleteExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const handlePresentToggle = (isChecked) => {
    setNewExperience({
      ...newExperience,
      isPresent: isChecked,
      endMonth: isChecked ? '' : newExperience.endMonth,
      endYear: isChecked ? '' : newExperience.endYear
    });
    
    if (isChecked) {
      setFormErrors({
        ...formErrors,
        endMonth: undefined,
        endYear: undefined
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExperience(null);
    setFormErrors({});
    setNewExperience({
      company: '',
      role: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      isPresent: false
    });
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
        {experiences.map((exp) => (
          <div key={exp.id} className={styles.card}>
            <div className={styles.cardLogo}>
              {exp.logo}
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{exp.company}</h3>
              <p className={styles.cardSubtitle}>{exp.role}</p>
              <p className={styles.cardDescription}>
                {exp.startMonth} {exp.startYear} - {exp.isPresent ? "Present" : `${exp.endMonth} ${exp.endYear}`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal title="Edit Experience" onClose={handleCloseModal}>
          <div className={styles.experienceList}>
            {experiences.map((exp) => (
              <div key={exp.id} className={styles.experienceItem}>
                <div className={styles.experienceInfo}>
                  <span className={styles.experienceCompany}>{exp.company}</span>
                  <span className={styles.experienceRole}>{exp.role}</span>
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
                value={newExperience.role}
                onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                className={formErrors.role ? styles.inputError : ''}
              />
              {formErrors.role && <div className={styles.errorMessage}>{formErrors.role}</div>}
            </div>
            
            <div className={styles.dateGroup}>
              <h4 className={styles.dateGroupTitle}>Start Date<span className={styles.required}>*</span></h4>
              <div className={styles.dateInputs}>
                <div className={styles.dateInput}>
                  <select
                    id="startMonth"
                    value={newExperience.startMonth}
                    onChange={(e) => setNewExperience({ ...newExperience, startMonth: e.target.value })}
                    className={formErrors.startMonth ? styles.inputError : ''}
                  >
                    <option value="">Month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  {formErrors.startMonth && <div className={styles.errorMessage}>{formErrors.startMonth}</div>}
                </div>
                
                <div className={styles.dateInput}>
                  <input
                    type="text"
                    id="startYear"
                    placeholder="YYYY"
                    maxLength="4"
                    value={newExperience.startYear}
                    onChange={(e) => setNewExperience({ ...newExperience, startYear: e.target.value })}
                    className={formErrors.startYear ? styles.inputError : ''}
                  />
                  {formErrors.startYear && <div className={styles.errorMessage}>{formErrors.startYear}</div>}
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
                      onChange={(e) => setNewExperience({ ...newExperience, endMonth: e.target.value })}
                      className={formErrors.endMonth ? styles.inputError : ''}
                      disabled={newExperience.isPresent}
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    {formErrors.endMonth && <div className={styles.errorMessage}>{formErrors.endMonth}</div>}
                  </div>
                  
                  <div className={styles.dateInput}>
                    <input
                      type="text"
                      id="endYear"
                      placeholder="YYYY"
                      maxLength="4"
                      value={newExperience.endYear}
                      onChange={(e) => setNewExperience({ ...newExperience, endYear: e.target.value })}
                      className={formErrors.endYear ? styles.inputError : ''}
                      disabled={newExperience.isPresent}
                    />
                    {formErrors.endYear && <div className={styles.errorMessage}>{formErrors.endYear}</div>}
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