import img from "../assets/prashant.png";

const profileData = {
  id: 1,
  name: "Abhinav Kumar",
  about: "IITP'27 AI'DS",
  imageUrl: img,
  experience: [
    {
      id: 1,
      company: "Google",
      role: "SDE - Full-time",
      startMonth: "Jan",
      startYear: "2023",
      endMonth: null,
      endYear: null,
      isPresent: true,
      logo: "G",
    },
  ],
  education: [
    {
      id: 1,
      institution: "Indian Institute of Technology Patna",
      degree: "Bachelor of Technology in Computer Science",
      startMonth: "August",
      startYear: "2023",
      endMonth: "May",
      endYear: "2027",
      isPresent: false,
      logo: "I",
    },
  ],
  skills: [
    { id: 1, name: "Competitive Programming" },
    { id: 2, name: "Web Development" },
    { id: 3, name: "Machine Learning" },
  ],
  achievements: [
    {
      id: 1,
      title: "ICPC World Finalist",
      month: "September",
      year: "2024",
      description: "Achieved a rank of 1 in the ICPC World Finals",
      logo: "I",
    },
    {
      id: 2,
      title: "JEE Advanced",
      month: "June",
      year: "2023",
      description: "AIR 1",
      logo: "J",
    },
  ],
};

export default profileData;
