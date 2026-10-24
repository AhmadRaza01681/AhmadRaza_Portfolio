// Default site content. Admin panel edits are saved in the browser; export data.js from the admin panel to publish them.
const DEFAULT_DATA = {
 "profile": {
  "name": "Ahmad Raza",
  "badge": "AI Teaching Assistant at GIFT University",
  "headline": "Data scientist and researcher building AI that reads medical scans and explains its answers.",
  "intro": "Based in Gujranwala, Pakistan. My work covers deep learning for brain tumour and Alzheimer’s detection, explainable AI, and the full-stack apps that put models in front of people.",
  "caption": "BS Computer Science, GIFT University",
  "email": "ahmadraza.official88@gmail.com",
  "linkedin": "http://www.linkedin.com/in/ahmad-raza-a19393187/",
  "github": "https://github.com/YOUR-USERNAME",
  "photo": "photo.jpg"
 },
 "blocks": [
  {
   "id": "stats",
   "type": "stats",
   "title": "Highlights",
   "items": [
    {
     "title": "97.5%",
     "text": "brain tumour detection accuracy"
    },
    {
     "title": "94%",
     "text": "Alzheimer’s detection accuracy"
    },
    {
     "title": "4",
     "text": "research papers"
    },
    {
     "title": "38%",
     "text": "landing page conversion lift"
    }
   ]
  },
  {
   "id": "about",
   "type": "text",
   "title": "About",
   "items": [
    {
     "text": "I study Computer Science at GIFT University (CGPA 3.54/4) and teach AI there as a teaching assistant. My research covers 3D CNNs, explainable AI for kidney disease, and cyber threat mitigation. I also run technology as CTO of a trading company, so I care about models that work in production, not only in notebooks."
    }
   ]
  },
  {
   "id": "projects",
   "type": "cards",
   "title": "Projects",
   "items": [
    {
     "title": "Neuro-Insight: brain tumour and Alzheimer’s detection",
     "meta": "AI/ML",
     "text": "Deep learning and machine learning models trained on BraTS 2017–2020 MRI data, preprocessed with NiBabel. Reached 97.5% accuracy for tumours and 94% for Alzheimer’s, and 99% after optimising the tumour architecture. A React and Node.js interface lets users upload an MRI and get an automated result from a Flask model service.",
     "tags": [
      "TensorFlow",
      "PyTorch",
      "Scikit-Learn",
      "React",
      "Node.js",
      "Flask"
     ],
     "link": "https://github.com/YOUR-USERNAME/neuro-insight"
    },
    {
     "title": "CivixAI: civic reporting portal",
     "meta": "AI/ML",
     "text": "Vision AI classifies complaint photos and rates severity. RAG adds context-aware answers. Issues are mapped by GPS and routed to government departments, with Urdu and English support.",
     "tags": [
      "Next.js",
      "TypeScript",
      "RAG",
      "PostgreSQL",
      "Docker"
     ],
     "link": "https://github.com/YOUR-USERNAME/civixai"
    },
    {
     "title": "Bridgelet: peer-to-peer collaboration",
     "meta": "Web",
     "text": "Cross-platform Electron app for real-time video, screen sharing and messaging, with room management and participant controls over secure WebRTC connections.",
     "tags": [
      "Electron",
      "WebRTC",
      "Socket.io",
      "React"
     ],
     "link": "https://github.com/YOUR-USERNAME/bridgelet"
    },
    {
     "title": "Company management software",
     "meta": "Data",
     "text": "Django system for accounts, salaries and inventory, with Power BI and Excel dashboards. Automated reporting cut report generation time by about 30%.",
     "tags": [
      "Django",
      "MySQL",
      "Power BI",
      "Excel"
     ],
     "link": ""
    },
    {
     "title": "Kido Learn: inclusive learning app",
     "meta": "Mobile",
     "text": "Final year project for deaf and hard-of-hearing children: animated lessons, a chatbot, voice recognition, a digital whiteboard and games, plus parent features.",
     "tags": [
      "Flutter",
      "Dart",
      "Firebase"
     ],
     "link": "https://github.com/YOUR-USERNAME/kido-learn"
    },
    {
     "title": "UTAMS: university transport attendance",
     "meta": "Web",
     "text": "PHP and MySQL system for transport registration, attendance and paid status, with Google Sign-In, email validation and automated notifications.",
     "tags": [
      "PHP",
      "MySQL",
      "Google Sign-In"
     ],
     "link": ""
    }
   ]
  },
  {
   "id": "research",
   "type": "list",
   "title": "Research and publications",
   "items": [
    {
     "title": "Attention Driven Triple Path Residual 3D CNN for Efficient Brain Tumor Detection",
     "meta": "M. Talha, A. Raza, M. A. Nasim",
     "text": "Completed"
    },
    {
     "title": "Adaptive Cyber Threat Mitigation in Edge Federation using AI Models",
     "meta": "M. H. Cheema, A. Raza",
     "text": "Completed"
    },
    {
     "title": "All about the Era of the GPU",
     "meta": "A. Raza, M. L. Ahmad, F. U. Mustafa",
     "text": "Completed"
    },
    {
     "title": "Explainable AI (XAI) for Chronic Kidney Diseases Diagnosis and Interpretation",
     "meta": "M. T. Yaqoob, A. Raza",
     "text": "In progress"
    }
   ]
  },
  {
   "id": "experience",
   "type": "timeline",
   "title": "Experience",
   "items": [
    {
     "title": "AI Teaching Assistant, GIFT University",
     "meta": "Nov 2023 – present",
     "text": "Teach AI with Python through hands-on labs. Wrote manuals on CSP, BFS, DFS, Simple AI and Streamlit, and applied outcome-based education (QOBE) to lesson plans."
    },
    {
     "title": "CTO, New Start Modern Trading LLC, Muscat, Oman",
     "meta": "Sep 2024 – Mar 2025",
     "text": "Led technology strategy, a team of engineers, custom software for inventory, sales and customer relations, and cybersecurity initiatives."
    },
    {
     "title": "Data Analyst, SS Consultants",
     "meta": "Jan 2021 – Oct 2022",
     "text": "Defined marketing KPIs in Power BI and SQL, lifting landing page conversion by 38%. Led four analysts, and A/B tests brought in 15% more leads. A redesigned data model improved predictions by 12%."
    },
    {
     "title": "React Native Developer, The Web Jobs",
     "meta": "Oct 2023 – Nov 2023",
     "text": "Built mobile interfaces with React Native and Redux, connected Firebase and MySQL backends, and reviewed code."
    },
    {
     "title": "IELTS and PTE Trainer, Foreign Languages Club, Lahore",
     "meta": "Dec 2018 – Oct 2019",
     "text": "Taught all four IELTS components, built individual study plans and tracked progress with practice tests."
    }
   ]
  },
  {
   "id": "certs",
   "type": "awards",
   "title": "Certifications",
   "items": [
    {
     "title": "Python for Data Science, AI and Development",
     "meta": "IBM on Coursera",
     "text": "Python fundamentals, data structures, OOP, NumPy, Pandas, REST APIs and web scraping.",
     "link": "https://www.coursera.org/account/accomplishments/verify/EZQM1U9WCE32"
    },
    {
     "title": "Generative AI: Introduction and Applications",
     "meta": "IBM on Coursera",
     "text": "Prompt engineering, in-context learning, chains and agents. Built GenAI apps with Flask.",
     "link": "https://www.coursera.org/account/accomplishments/verify/J7EUMO05D6XI"
    },
    {
     "title": "Data Visualization and Dashboards with Excel and Cognos",
     "meta": "IBM on Coursera",
     "text": "Advanced Excel charts and interactive Excel and Cognos Analytics dashboards.",
     "link": "https://www.coursera.org/account/accomplishments/verify/5YB2VZK8UG30"
    },
    {
     "title": "Excel Basics for Data Analysis",
     "meta": "IBM on Coursera",
     "text": "Formulas, data cleaning, filters, lookups and pivot tables.",
     "link": "https://www.coursera.org/account/accomplishments/verify/QJXYVZE41L9A"
    },
    {
     "title": "Introduction to Data Analytics",
     "meta": "IBM on Coursera",
     "text": "The analytics process, data wrangling, mining, visualization and storytelling.",
     "link": "https://www.coursera.org/account/accomplishments/verify/D2R81QDS4KRG"
    },
    {
     "title": "Introduction to Cybersecurity Careers",
     "meta": "Coursera",
     "text": "Server-side concepts, APIs, databases and client-server architecture.",
     "link": "https://www.credly.com/badges/f032f5f4-8f0e-4fe1-a865-61a090901fea/"
    },
    {
     "title": "Excel Training Bootcamp: Advanced Data Analytics and Automation",
     "meta": "GIFT University, Center for Emerging Technologies",
     "text": "Pivot tables, Power Query, VBA, dashboards and automation.",
     "link": ""
    },
    {
     "title": "IELTS 6.5 and PTE 64",
     "meta": "Foreign Languages Club, 2018 and 2021",
     "text": "IELTS overall 6.5. PTE overall 64: Listening 62, Reading 67, Speaking 68, Writing 63.",
     "link": ""
    }
   ]
  },
  {
   "id": "achievements",
   "type": "awards",
   "title": "Achievements",
   "items": [
    {
     "title": "SEE Pakistan World Startup Championship",
     "meta": "Jul 2024, NICAT Islamabad",
     "text": "Project and research recognition at the championship, held at the National Incubation Center for Aerospace Technologies.",
     "link": ""
    },
    {
     "title": "Guest speaker, AI Video Generation workshop",
     "meta": "Jan 2024, GIFT University SSAIC",
     "text": "Invited speaker at the Social Sciences Artificial Intelligence Club workshop.",
     "link": ""
    },
    {
     "title": "Flutter App Development Workshop, Advanced",
     "meta": "Jun 2025, YCPS Society",
     "text": "Advanced mobile development with Flutter at GIFT University.",
     "link": ""
    },
    {
     "title": "Flutter App Development Workshop, Fundamentals",
     "meta": "Feb 2024, YCPS Society",
     "text": "Flutter fundamentals at GIFT University.",
     "link": ""
    },
    {
     "title": "National Gold Medalist, All Boards National Athletic Championship",
     "meta": "Nov 2017, Pakistan Sports Board",
     "text": "Gold medal at the Islamabad Sports Complex.",
     "link": ""
    },
    {
     "title": "Deputy House Captain, Iqbal House",
     "meta": "Aug 2018, Cadet College Rawalpindi",
     "text": "Student leadership role at the college.",
     "link": ""
    },
    {
     "title": "Most Cooperative Student Award",
     "meta": "Apr 2014, Garrison Academy Senior Campus",
     "text": "Recognised for cooperation, teamwork and collaboration.",
     "link": ""
    }
   ]
  },
  {
   "id": "skills",
   "type": "skills",
   "title": "Skills",
   "items": [
    {
     "title": "Machine learning",
     "text": "TensorFlow, PyTorch, NumPy, Pandas, Matplotlib, image preprocessing, deep learning"
    },
    {
     "title": "Programming",
     "text": "Python, Java, JavaScript, C#"
    },
    {
     "title": "Web and apps",
     "text": "React, Next.js, Node.js, Tailwind CSS, HTML, CSS, Flutter"
    },
    {
     "title": "Data and research",
     "text": "Data analysis, visualisation, statistics, experimental research, model evaluation"
    },
    {
     "title": "Databases",
     "text": "MySQL, MongoDB, Firebase, SQL"
    },
    {
     "title": "Environments and tools",
     "text": "Linux, CUDA, GPU setup, Jupyter, Git, VS Code, LaTeX, Figma"
    }
   ]
  }
 ]
};
