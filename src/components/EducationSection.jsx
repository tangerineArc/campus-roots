import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth-context.jsx';
import styles from '../styles/section.module.css';
import Modal from './ModalSection.jsx';

const EducationSection = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [educations, setEducations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    isPresent: false
  });
  const req_url = import.meta.env.VITE_API_SERVER_URL + `/user/${user?.id}`;
  const update_url = import.meta.env.VITE_API_SERVER_URL + `/user/education/update`;
  const delete_url = import.meta.env.VITE_API_SERVER_URL + `/user/education/delete`;

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
        setEducations(data.data.Education || []);
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

  const handleEditEducation = (id) => {
    const education = educations.find(edu => edu.id === id);
    setEditingEducation(education);

    const startDate = parseDate(education.StartDate);
    const endDate = parseDate(education.EndDate);

    setNewEducation({
      institution: education.Institution,
      degree: education.Degree,
      startMonth: startDate.month,
      startYear: startDate.year,
      endMonth: endDate.month,
      endYear: endDate.year,
      isPresent: education.isPresent
    });

    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleUpdateEducation = async () => {
    if (validateForm()) {
      const educationData = {
        Institution: newEducation.institution.trim(),
        Degree: newEducation.degree.trim(),
        StartDate: formatDateForDB(newEducation.startMonth, newEducation.startYear),
        EndDate: newEducation.isPresent ? null : formatDateForDB(newEducation.endMonth, newEducation.endYear),
        isPresent: newEducation.isPresent
      };

      try {
        const updatedEducations = editingEducation
          ? educations.map(edu =>
            edu.id === editingEducation.id
              ? {
                ...edu,
                ...educationData,
                logo: newEducation.institution.charAt(0)
              }
              : edu
          )
          : [...educations, {
            id: Date.now(),
            ...educationData,
            logo: newEducation.institution.charAt(0)
          }];

        const response = await fetch(update_url, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Education: updatedEducations
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update education');
        }

        const data = await response.json();
        setEducations(data.data.Education || []);
        setIsModalOpen(false);
        resetForm();
      } catch (error) {
        console.error('Error updating education:', error);
        setError('Failed to update education. Please try again.');
      }
    }
  };

  const handleDeleteEducation = async (id) => {
    try {
      const updatedEducations = educations.filter(edu => edu.id !== id);

      const response = await fetch(delete_url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Education: updatedEducations
        })
      });

      if (!response.ok) {
        throw new Error('Failed to delete education');
      }

      const data = await response.json();
      setEducations(data.data.Education || []);
    } catch (error) {
      console.error('Error deleting education:', error);
      setError('Failed to delete education. Please try again.');
    }
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

  const resetForm = () => {
    setEditingEducation(null);
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
        {educations.map((edu) => {
          const startDate = parseDate(edu.StartDate);
          const endDate = parseDate(edu.EndDate);

          return (
            <div key={edu.id} className={styles.card}>
              <div className={styles.cardLogo}>
                {edu.Institution.charAt(0)}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{edu.Institution}</h3>
                <p className={styles.cardSubtitle}>{edu.Degree}</p>
                <p className={styles.cardDescription}>
                  {startDate.month} {startDate.year} - {edu.isPresent ? "Present" : `${endDate.month} ${endDate.year}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <Modal title="Edit Education" onClose={handleCloseModal}>
          <div className={styles.educationList}>
            {educations.map((edu) => (
              <div key={edu.id} className={styles.educationItem}>
                <div className={styles.educationInfo}>
                  <span className={styles.educationInstitution}>{edu.Institution}</span>
                  <span className={styles.educationDegree}>{edu.Degree}</span>
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
