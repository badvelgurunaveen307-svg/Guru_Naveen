// Single source of truth for personal info and project metadata.
// Projects/links come from: Guru_Naveen_Badvel_Data_Analyst_Resume.pdf + links supplied in the brief.

export const profile = {
  name: "Guru Naveen Badvel",
  role: "Data Analyst",
  tagline: "SQL • Excel • Power BI • Python",
  location: "Bengaluru, India",
  email: "badvelgurunaveen@gmail.com",
  phone: "+91 6301407022",
  linkedin: "https://www.linkedin.com/in/gurunaveenbadvel",
  github: "https://github.com/guruprince14",
  summary:
    "I am a Computer Science and Engineering (Data Science) graduate passionate about data analytics, business intelligence, and data-driven problem-solving. Skilled in Python, SQL, Excel, and Power BI, I have worked on projects involving transactional data analysis, customer behavior analysis, web-scraped data cleaning, interactive dashboard development, and predictive modeling. I enjoy transforming raw data into meaningful insights that help businesses identify trends, evaluate performance, and make informed decisions.",
};

export type Project = {
  id: string;
  title: string;
  tool: string;
  date?: string;
  category: "Analytics" | "BI Dashboards" | "Machine Learning";
  description: string;
  points: string[];
  tech: string[];
  url: string;
  linkType: "zip" | "repo";
};

export const projects: Project[] = [
  {
    id: "predictive",
    title: "Predictive Modelling on Web-Scraped Data",
    tool: "Python • Power BI",
    date: "Sep 2026",
    category: "Machine Learning",
    description: "Predictive analysis on 1,000+ web-scraped records with a Power BI results dashboard.",
    points: [
      "Collected and analyzed 1,000+ web-scraped records, handling missing values, duplicates and inconsistencies to improve data quality.",
      "Built a Power BI dashboard to visualize predictive model results, trends and key data patterns.",
    ],
    tech: ["Python", "Pandas", "Power BI", "Predictive Modeling"],
    url: "https://training-uploads.internshala.com/dlm-ds-v3/uploads/projects/v_4/5480667/3pnabgkkwor-1815367.zip",
    linkType: "zip",
  },
  {
    id: "mba",
    title: "Market Basket Analysis",
    tool: "Machine Learning",
    category: "Machine Learning",
    description: "Transactional data analysis to uncover products frequently bought together.",
    points: ["Analyzed transactional data to identify product associations and purchasing patterns."],
    tech: ["Python", "Association Rules"],
    url: "https://training-uploads.internshala.com/machine-learning-ds-v3/uploads/projects/v_4/5480665/immsb3kjahh-1094282.zip",
    linkType: "zip",
  },
  {
    id: "risk",
    title: "Financial Risk Analysis",
    tool: "Python",
    category: "Analytics",
    description: "Python-based data preparation and analysis of financial risk indicators.",
    points: ["Prepared and analyzed financial data in Python to surface risk-related patterns."],
    tech: ["Python", "Pandas", "NumPy"],
    url: "https://training-uploads.internshala.com/python-ds-v3/uploads/projects/v_4/5480663/ef2087d3gq1-645513.zip",
    linkType: "zip",
  },
  {
    id: "logistics",
    title: "Logistics Optimization for Delivery Routes",
    tool: "SQL",
    date: "Jun 2026",
    category: "Analytics",
    description: "SQL analysis of shipment data to identify delivery patterns, delays and efficiency.",
    points: [
      "Cleaned duplicate records, handled NULL values and resolved inconsistencies in logistics and shipment data.",
      "Interpreted logistics trends to identify opportunities for better route planning.",
    ],
    tech: ["SQL", "MySQL", "Joins", "Aggregations"],
    url: "https://training-uploads.internshala.com/sql-ds-v3/uploads/projects/v_4/5480664/c6o12x8ww8k-463083.zip",
    linkType: "zip",
  },
  {
    id: "retail",
    title: "Retail Customer Retention Analytics",
    tool: "Power BI",
    date: "May 2026",
    category: "BI Dashboards",
    description: "Interactive Power BI dashboard on customer behavior, loyalty and store performance.",
    points: [
      "Analyzed demographics, transactions, loyalty-program activity and store performance with Power BI and Power Query.",
      "Built an interactive dashboard with data modeling to compare customer and store performance.",
    ],
    tech: ["Power BI", "Power Query", "DAX", "Data Modeling"],
    url: "https://training-uploads.internshala.com/power-bi-ds-v3/uploads/projects/v_4/5480662/1rdeay9ilsp-1424079.zip",
    linkType: "zip",
  },
  {
    id: "rl-scheduling",
    title: "Energy-Efficient Task Scheduling in Edge–Cloud Environments",
    tool: "Reinforcement Learning",
    category: "Machine Learning",
    description: "Reinforcement-learning approach to energy-efficient task scheduling across edge and cloud.",
    points: ["Applied reinforcement learning to schedule tasks across edge–cloud resources with energy efficiency in mind."],
    tech: ["Python", "Reinforcement Learning"],
    url: "https://github.com/guruprince14/Energy-Efficient-Task-Scheduling-in-Edge-Cloud-Environments-Using-Reinforcement-Learning",
    linkType: "repo",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "SQL & Database", items: ["SQL", "MySQL", "Joins", "Aggregations", "Data Extraction"] },
  { group: "BI & Visualization", items: ["Power BI", "Power Query", "DAX"] },
  { group: "Excel", items: ["Advanced Excel", "Pivot Tables", "VLOOKUP", "Excel Formulas"] },
  { group: "Data Analysis", items: ["Data Cleaning", "Data Transformation", "ETL Processes", "Statistical Analysis", "Hypothesis Testing"] },
  { group: "Programming", items: ["Python", "Pandas", "NumPy"] },
  { group: "Analytics", items: ["Predictive Modeling", "Customer Segmentation", "Anomaly Detection"] },
];

export const certifications = [
  { title: "Data Science", issuer: "Internshala Training", date: "Feb 2026 – Sep 2026", detail: "Intro to Data Analytics; SQL for Data Analysis; Power BI; MS Excel; Python Data Preparation & Analysis", url: "https://trainings.internshala.com/s/v/3989579/245f4da3", image: undefined },
  { title: "Introduction to Data Analysis Using Python", issuer: "Google · Coursera", date: "May 2026 – Jun 2026", url: "https://coursera.org/share/5748bafb5bfa47e865395fe6e4e280da", image: undefined },
  { title: "Data Fundamentals", issuer: "IBM SkillsBuild", date: "Apr 2026", url: "https://www.credly.com/badges/32e77fa3-7fa5-4186-9afd-911ff5b958a2", image: undefined },
  { title: "Data Analytics", issuer: "ExcelR", date: "May 2025 – Sep 2025", url: "https://i.postimg.cc/4yHcqJb9/excel-R.png", image: undefined },
];

export const education = [
  { degree: "B.Tech, Computer Science & Engineering (Data Science)", school: "Dr. K.V. Subba Reddy Institute of Technology", years: "2022 – 2026", score: "CGPA 7.56/10" },
  { degree: "Senior Secondary (XII), BIEAP, Andhra Pradesh", school: "Sri Venkateswara Junior College", years: "2020 – 2022", score: "CGPA 7.90/10" },
];

export const achievements = [
  { title: "TCS CodeVita Season 13", stat: "Global Rank 10,006", detail: "Problem-solving, logical thinking and programming in a global competitive coding challenge." },
  { title: "JEE Main", stat: "81 Percentile", detail: "Analytical and quantitative skills in a national-level engineering entrance exam." },
];

export const emailConfig = {
  serviceId: import.meta.env["VITE_EMAILJS_SERVICE_ID"] || "service_uri98ji",
  templateId: import.meta.env["VITE_EMAILJS_TEMPLATE_ID"] || "template_p6dynwb",
  publicKey: import.meta.env["VITE_EMAILJS_PUBLIC_KEY"] || "lq11tkF7ar5OI1chN",
  toEmail: "badvelgurunaveen@gmail.com",
};
