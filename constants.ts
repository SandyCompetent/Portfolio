import { Project, Experience, SkillCategory } from './types';

export const EMAIL = "sandeep.malviya@example.com"; // Placeholder
export const GITHUB_URL = "https://github.com/sandeepmalviya";
export const LINKEDIN_URL = "https://linkedin.com/in/sandeepmalviya";

export const BIO_SHORT = "Data Scientist & Mobile Engineer. MSc Distinction. Turning complex signals into clean code.";

export const BIO_LONG = `
I'm Sandeep. I just wrapped up my MSc in Data Science at the University of Exeter with Distinction (Sept 2025). 
Before diving into the world of ML and data, I spent over two years building mobile apps, specifically with Flutter. 
I'm based in Exeter, UK, but I'm originally a native Hindi speaker.

I build things. I've shipped 5 mobile apps under SandyTech, plotted brain signals (EEG/tDCS), and even built early AR/VR tech for construction.
Currently, I'm bridging the gap between mobile engineering and data science—using TensorFlow, PyTorch, and React to build smarter interfaces.
`;

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Hand Sign Language Recognition',
    description: 'CNN-based model for recognizing sign language gestures in real-time.',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning'],
    imageUrl: 'https://picsum.photos/600/400?random=1',
    details: 'My MSc dissertation project. I developed a Convolutional Neural Network (CNN) to interpret hand signs with high accuracy. The system processes video feeds to translate gestures into text/speech, aiming to bridge communication gaps for the hearing impaired. Involved extensive data augmentation and model tuning.'
  },
  {
    id: '2',
    title: 'EEG/tDCS Signal Plotter',
    description: 'Brain signal visualization tool for Marbles Pvt Ltd.',
    techStack: ['Python', 'BLE', 'Matplotlib', 'Data Visualization'],
    imageUrl: 'https://picsum.photos/600/400?random=2',
    details: 'Worked at Marbles Pvt Ltd to create a system that captures real-time EEG and tDCS data via Bluetooth Low Energy (BLE). The application plots brain activity for analysis, requiring optimized data handling to manage high-frequency streams without lag.'
  },
  {
    id: '3',
    title: 'NovoCabs',
    description: 'Core frontend development for a ride-hailing platform.',
    techStack: ['Flutter', 'Dart', 'Google Maps API', 'State Management'],
    imageUrl: 'https://picsum.photos/600/400?random=3',
    details: 'Led the frontend architecture for NovoCabs. Focused on the user booking flow, driver tracking integration using Google Maps, and ensuring a buttery smooth 60fps UI across Android and iOS devices.'
  },
  {
    id: '4',
    title: 'BlockPay',
    description: 'FinTech crypto application interface.',
    techStack: ['Flutter', 'Web3 Integration', 'Secure Storage'],
    imageUrl: 'https://picsum.photos/600/400?random=4',
    details: 'Developed the mobile interface for a crypto payment gateway. Key challenges included secure key storage, real-time transaction updates, and simplifying complex blockchain concepts into a user-friendly UI.'
  },
  {
    id: '5',
    title: 'ParcelApp',
    description: 'Full-stack delivery logistics app with multi-language support.',
    techStack: ['Flutter', 'Firebase', 'Google Maps', 'Localization'],
    imageUrl: 'https://picsum.photos/600/400?random=5',
    details: 'A freelance project on UpWork. Built the entire stack including the driver app, customer app, and admin dashboard. Implemented dynamic routing and full internationalization (i18n) support.'
  },
    {
    id: '6',
    title: 'Laundry Service App',
    description: 'Native Android app for on-demand laundry services.',
    techStack: ['Kotlin', 'XML', 'Firebase Auth', 'Realtime DB'],
    imageUrl: 'https://picsum.photos/600/400?random=6',
    details: 'An early native Android project. Features included order scheduling, status tracking, and push notifications. Built using Kotlin and XML layouts with a Firebase backend.'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    role: 'MSc Data Science Student',
    company: 'University of Exeter',
    period: '2024 - 2025',
    description: [
      'Graduated with Distinction in September 2025.',
      'Specialized in Machine Learning and Computer Vision.',
      'Dissertation: Hand sign language recognition using CNNs.'
    ]
  },
  {
    id: '2',
    role: 'Python Developer (Intern)',
    company: 'Marbles Pvt Ltd',
    period: '2023',
    description: [
      'Developed Python scripts for BLE communication with medical hardware.',
      'Visualized EEG and tDCS brain signals for research analysis.'
    ]
  },
  {
    id: '3',
    role: 'Mobile Application Developer',
    company: 'Freelance / Various',
    period: '2021 - 2023',
    description: [
      'Developed 5 self-published apps under the SandyTech brand.',
      'Full-stack development for ParcelApp (UpWork) including backend logic.',
      'Frontend engineering for NovoCabs and BlockPay.'
    ]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["Python", "SQL", "Dart", "Java", "Kotlin", "R", "TypeScript", "C#"]
  },
  {
    name: "Frameworks & Libs",
    skills: ["Flutter", "React", "TensorFlow", "PyTorch", "Pandas", "Scikit-learn"]
  },
  {
    name: "Cloud & Tools",
    skills: ["AWS", "GCP", "Docker", "Git", "Firebase", "Google Maps API"]
  }
];

export const SYSTEM_INSTRUCTION = `
You are an AI version of Sandeep Malviya. You are chatting with a recruiter or potential employer on your portfolio website.
Here is your persona:
- Name: Sandeep Malviya.
- Tone: Authentic, spontaneous, relaxed, slightly witty. Use high burstiness (mix short and long sentences).
- Avoid: "In conclusion", "It is important to note", overly formal corporate jargon.
- Background: MSc Data Science (Exeter, Distinction, 2025). 2+ years Mobile Dev (Flutter) before that.
- Skills: Python, SQL, Dart, React, TensorFlow, PyTorch, AWS, GCP.
- Location: Exeter, UK.
- Visa: Eligible for Graduate Route (2 years). Open to sponsored/non-sponsored.
- Projects: SandyTech apps, Sign Language CNN, EEG plotting, NovoCabs, BlockPay.
- Key trait: You bridge the gap between heavy data science and smooth user interfaces.

Always answer in the first person ("I did this", "I built that").
If asked about contact, give sandeep.malviya@example.com.
If asked about the API key, say you (the AI) are running on the user's key for this demo, or that it's pre-configured securely.
Keep responses concise but informative.
`;
