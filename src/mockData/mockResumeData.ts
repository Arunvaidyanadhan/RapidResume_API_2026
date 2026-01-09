const mockResumeData = {
  personal: {
    firstName: "Alex",
    lastName: "Johnson",
    title: "Software Engineer",
    email: "alex.johnson@example.com",
    phone: "+91-9000000000",
    linkedin: "https://linkedin.com/in/alexjohnson",
    profileImage: "https://i.pravatar.cc/150?img=32",
    address: "Bengaluru, India"
  },

  summary:
    "Results-driven software professional with experience building scalable web applications. Strong foundation in frontend and backend development, problem-solving, and collaborative teamwork. Passionate about writing clean code and delivering user-focused solutions.",

  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "HTML5",
    "CSS3",
    "Node.js",
    "Express",
    "REST APIs",
    "MongoDB",
    "Git",
  ],

  experience: [
    {
      employer: "Tech Solutions Pvt Ltd",
      jobTitle: "Software Engineer",
      startDate: "Jan 2022",
      endDate: "",
      current: true,
      description:
        "• Developed and maintained web applications using React and Node.js.\n• Collaborated with designers and product teams to deliver features.\n• Improved application performance and fixed production bugs.\n• Participated in code reviews and agile ceremonies."
    },
    {
      employer: "Digital Systems",
      jobTitle: "Junior Developer",
      startDate: "Jul 2020",
      endDate: "Dec 2021",
      current: false,
      description:
        "• Assisted in frontend development using HTML, CSS, and JavaScript.\n• Built reusable UI components.\n• Integrated REST APIs.\n• Supported testing and documentation."
    }
  ],

  projects: [
    {
      name: "Online Resume Builder",
      description:
        "Web application that allows users to create professional resumes with live preview and PDF export.",
      link: "https://example.com/project-one"
    },
    {
      name: "Task Management App",
      description:
        "Simple task management application with authentication and role-based access.",
      link: "https://example.com/project-two"
    }
  ],

  education: [
    {
      degree: "Bachelor of Engineering",
      fieldOfStudy: "Computer Science",
      school: "State University",
      startDate: "2016",
      endDate: "2020",
      grade: "8.2 CGPA"
    }
  ],

  certifications: [
    {
      name: "Web Development Certification",
      issuer: "Online Learning Platform",
      year: "2023"
    }
  ],

  achievements: [
    "Recognized for consistent performance and teamwork",
    "Completed multiple successful project deliveries"
  ],

  languages: [
    "English (Professional)",
    "Hindi (Conversational)"
  ],

  hobbies: [
    "Reading",
    "Problem solving",
    "Learning new technologies"
  ]
};

export default mockResumeData;
