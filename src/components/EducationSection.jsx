import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import profileData from '../data/profile-data.js';
import styles from '../styles/section.module.css';
import Modal from './ModalSection.jsx';

const EducationSection = () => {
  const [educations, setEducations] = useState(profileData.education);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
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

    if (!newEducation.institution.trim()) {
      errors.institution = 'Institution name is required';
    }

    if (!newEducation.degree.trim()) {
      errors.degree = 'Degree is required';
    }

    if (!newEducation.startMonth) {
      errors.startMonth = 'Start month is required';
    }

    if (!newEducation.startYear) {
      errors.startYear = 'Start year is required';
    } else if (isNaN(newEducation.startYear) || newEducation.startYear.length !== 4) {
      errors.startYear = 'Please enter a valid 4-digit year';
    }

    if (!newEducation.isPresent) {
      if (!newEducation.endMonth) {
        errors.endMonth = 'End month is required';
      }

      if (!newEducation.endYear) {
        errors.endYear = 'End year is required';
      } else if (isNaN(newEducation.endYear) || newEducation.endYear.length !== 4) {
        errors.endYear = 'Please enter a valid 4-digit year';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddEducation = () => {
    if (validateForm()) {
      setEducations([
        ...educations,
        {
          id: Date.now(),
          ...newEducation,
          logo: newEducation.institution.charAt(0)
        }
      ]);
      setNewEducation({
        institution: '',
        degree: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        isPresent: false
      });
      setFormErrors({});
    }
  };

  const handleEditEducation = (id) => {
    const education = educations.find(edu => edu.id === id);
    setEditingEducation(education);

    const durationParts = education.duration ? education.duration.split(' - ') : [];
    const hasDuration = durationParts.length === 2;
    const startParts = hasDuration ? durationParts[0].split(' ') : [];
    const endParts = hasDuration ? durationParts[1].split(' ') : [];

    const educationData = {
      institution: education.institution,
      degree: education.degree,
      isPresent: education.isPresent || (hasDuration && durationParts[1] === 'Present')
    };

    if (education.startMonth) {
      educationData.startMonth = education.startMonth;
    } else if (startParts.length >= 2) {
      const fullMonthName = months.find(month => month.startsWith(startParts[0]));
      educationData.startMonth = fullMonthName || '';
    } else {
      educationData.startMonth = '';
    }

    educationData.startYear = education.startYear || (startParts.length >= 2 ? startParts[1] : '');

    if (!educationData.isPresent) {
      if (education.endMonth) {
        educationData.endMonth = education.endMonth;
      } else if (endParts.length >= 2 && endParts[0] !== 'Present') {
        const fullMonthName = months.find(month => month.startsWith(endParts[0]));
        educationData.endMonth = fullMonthName || '';
      } else {
        educationData.endMonth = '';
      }
      educationData.endYear = education.endYear || (endParts.length >= 2 && endParts[0] !== 'Present' ? endParts[1] : '');
    } else {
      educationData.endMonth = '';
      educationData.endYear = '';
    }

    setNewEducation(educationData);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleUpdateEducation = () => {
    if (validateForm()) {
      if (editingEducation) {
        setEducations(educations.map(edu =>
          edu.id === editingEducation.id
            ? {
              ...edu,
              ...newEducation,
              logo: newEducation.institution.charAt(0)
            }
            : edu
        ));
        setEditingEducation(null);
      } else {
        handleAddEducation();
      }
      setIsModalOpen(false);
    }
  };

  const handleDeleteEducation = (id) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const handlePresentToggle = (isChecked) => {
    setNewEducation({
      ...newEducation,
      isPresent: isChecked,
      endMonth: isChecked ? '' : newEducation.endMonth,
      endYear: isChecked ? '' : newEducation.endYear
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
    setEditingEducation(null);
    setFormErrors({});
    setNewEducation({
      institution: '',
      degree: '',
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
        <h2 className={styles.sectionTitle}>EDUCATION</h2>
        <button className={styles.editButton} onClick={() => {
          setEditingEducation(null);
          setIsModalOpen(true);
          setNewEducation({
            institution: '',
            degree: '',
            startMonth: '',
            startYear: '',
            endMonth: '',
            endYear: '',
            isPresent: false
          });
        }}>
          <Edit size={18} />
        </button>
      </div>

      <div className={styles.sectionContent}>
        {educations.map((edu) => (
          <div key={edu.id} className={styles.card}>
            <div className={styles.cardLogo}>
              {edu.logo}
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{edu.institution}</h3>
              <p className={styles.cardSubtitle}>{edu.degree}</p>
              <p className={styles.cardDescription}>
                {edu.startMonth} {edu.startYear} - {edu.isPresent ? "Present" : `${edu.endMonth} ${edu.endYear}`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal title="Edit Education" onClose={handleCloseModal}>
          <div className={styles.educationList}>
            {educations.map((edu) => (
              <div key={edu.id} className={styles.educationItem}>
                <div className={styles.educationInfo}>
                  <span className={styles.educationInstitution}>{edu.institution}</span>
                  <span className={styles.educationDegree}>{edu.degree}</span>
                </div>
                <div className={styles.educationActions}>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleEditEducation(edu.id)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleDeleteEducation(edu.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.formTitle}>
              {editingEducation ? 'Edit Education' : 'Add Education'}
            </h3>

            <div className={styles.formGroup}>
              <label htmlFor="institution">Institution<span className={styles.required}>*</span></label>
              <input
                type="text"
                id="institution"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                className={formErrors.institution ? styles.inputError : ''}
              />
              {formErrors.institution && <div className={styles.errorMessage}>{formErrors.institution}</div>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="degree">Degree<span className={styles.required}>*</span></label>
              <input
                type="text"
                id="degree"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                className={formErrors.degree ? styles.inputError : ''}
              />
              {formErrors.degree && <div className={styles.errorMessage}>{formErrors.degree}</div>}
            </div>

            <div className={styles.dateGroup}>
              <h4 className={styles.dateGroupTitle}>Start Date<span className={styles.required}>*</span></h4>
              <div className={styles.dateInputs}>
                <div className={styles.dateInput}>
                  <select
                    id="startMonth"
                    value={newEducation.startMonth}
                    onChange={(e) => setNewEducation({ ...newEducation, startMonth: e.target.value })}
                    className={formErrors.startMonth ? styles.inputError : ''}
                  >
                    <option value="">Month</option>
                    {months.map((month) => (
                      <option key={`start-${month}`} value={month}>{month}</option>
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
                    value={newEducation.startYear}
                    onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
                    className={formErrors.startYear ? styles.inputError : ''}
                  />
                  {formErrors.startYear && <div className={styles.errorMessage}>{formErrors.startYear}</div>}
                </div>
              </div>
            </div>

            <div className={styles.dateGroup}>
              <div className={styles.dateGroupHeader}>
                <h4 className={styles.dateGroupTitle}>End Date{!newEducation.isPresent && <span className={styles.required}>*</span>}</h4>
                <div className={styles.presentCheckbox}>
                  <input
                    type="checkbox"
                    id="isPresent"
                    checked={newEducation.isPresent}
                    onChange={(e) => handlePresentToggle(e.target.checked)}
                  />
                  <label htmlFor="isPresent">Present</label>
                </div>
              </div>

              {!newEducation.isPresent && (
                <div className={styles.dateInputs}>
                  <div className={styles.dateInput}>
                    <select
                      id="endMonth"
                      value={newEducation.endMonth}
                      onChange={(e) => setNewEducation({ ...newEducation, endMonth: e.target.value })}
                      className={formErrors.endMonth ? styles.inputError : ''}
                      disabled={newEducation.isPresent}
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option key={`end-${month}`} value={month}>{month}</option>
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
                      value={newEducation.endYear}
                      onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
                      className={formErrors.endYear ? styles.inputError : ''}
                      disabled={newEducation.isPresent}
                    />
                    {formErrors.endYear && <div className={styles.errorMessage}>{formErrors.endYear}</div>}
                  </div>
                </div>
              )}
            </div>

            <button className={styles.addButton} onClick={handleUpdateEducation}>
              {editingEducation ? 'Update' : 'Add'} Education
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default EducationSection;