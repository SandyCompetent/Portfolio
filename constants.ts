import { Project, Experience, SkillCategory } from './types';

export const EMAIL = "sandy.competent@gmail.com";
export const GITHUB_URL = "https://github.com/SandyCompetent";
export const LINKEDIN_URL = "https://www.linkedin.com/in/sandy-competent/";
export const KAGGLE_URL = "https://www.kaggle.com/sandeepmalviya";
export const INSTAGRAM_URL = "https://www.instagram.com/sandeep.malviya.1999"; 

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
    description: 'Real-time Gesture Translation',
    valueProposition: 'Bridging communication gaps for the hearing impaired through instantaneous AI translation. Interprets complex hand gestures into text and speech in real-time.',
    achievement: 'Achieved 98% validation accuracy under varying lighting conditions.',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning'],
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000',
    details: 'This project serves as my MSc dissertation. The core architecture utilizes a custom Convolutional Neural Network (CNN) trained on a massive dataset of hand gestures. The system captures video frames, applies background subtraction and skin tone segmentation, and feeds the ROI into the model for prediction.',
    problem: 'Traditional communication aids for the hearing impaired are often intrusive, expensive, or rely on specialized hardware. There was a critical need for a non-contact, software-only solution.',
    challenges: 'The biggest hurdle was occlusion and rapid motion blur. I implemented a dynamic data augmentation pipeline (rotation, zoom, brightness shifts) to robustify the model against real-world variability.',
    complexity: 'Research Grade',
    linesOfCode: '4.5k+ LOC',
    architecture: ['CNN Custom Layers', 'OpenCV Pipeline', 'Real-time Stream'],
    codeSnippet: {
      language: 'python',
      code: `model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D(pool_size=(2, 2)),
    Dropout(0.25),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(num_classes, activation='softmax')
])`
    }
  },
  {
    id: '2',
    title: 'EEG/tDCS Signal Plotter',
    description: 'Biomedical Data Visualization',
    valueProposition: 'A high-frequency signal processing tool enabling neuroscientists to visualize brain activity in real-time. optimized for low-latency BLE data streams.',
    achievement: 'Reduced plotting latency by 40% for high-frequency data streams.',
    techStack: ['Python', 'BLE', 'Matplotlib', 'NumPy'],
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000',
    details: 'Developed for Marbles Pvt Ltd, this application interfaces with proprietary EEG hardware via Bluetooth Low Energy. It parses raw byte streams into microvolt values and renders them on a scrolling time-domain plot.',
    problem: 'Existing commercial tools were proprietary and lacked the flexibility to overlay tDCS stimulation markers on EEG data in real-time.',
    challenges: 'Handling packet loss over BLE and rendering 8 channels of 250Hz data without UI freeze. Used a producer-consumer thread pattern with a ring buffer.',
    complexity: 'High',
    linesOfCode: '8k+ LOC',
    architecture: ['Producer-Consumer', 'Ring Buffer', 'BLE Protocol'],
    codeSnippet: {
      language: 'python',
      code: `def handle_ble_data(self, data):
    # Parse raw bytes to uV
    values = struct.unpack('8f', data)
    
    # Thread-safe buffer update
    with self.data_lock:
        self.buffer = np.roll(self.buffer, -1, axis=0)
        self.buffer[-1] = values
        
    # Trigger UI update
    if self.frame_count % 5 == 0:
        self.canvas.draw_idle()`
    }
  },
  {
    id: '3',
    title: 'NovoCabs',
    description: 'Ride Hailing Platform',
    valueProposition: 'A seamless booking experience for urban commuters. Features real-time driver tracking, fare estimation, and a smooth 60fps ride interface.',
    achievement: 'Scaled to 10k+ active users with 99.9% crash-free sessions.',
    techStack: ['Flutter', 'Google Maps', 'Firebase', 'Redux'],
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000',
    details: 'Led the frontend architecture. The app uses a BLoC pattern for state management, ensuring distinct separation of business logic and UI. Integrated Google Maps Directions API for dynamic polyline rendering.',
    problem: 'The local market lacked a reliable cab service with transparent pricing and accurate ETAs.',
    challenges: 'Optimizing map rendering performance on low-end Android devices. Implemented marker clustering and throttled location updates to maintain high frame rates.',
    complexity: 'Very High',
    linesOfCode: '25k+ LOC',
    architecture: ['BLoC Pattern', 'Clean Architecture', 'Microservices Backend'],
    codeSnippet: {
      language: 'dart',
      code: `StreamBuilder<DriverLocation>( 
  stream: locationBloc.driverStream,
  builder: (context, snapshot) {
    if (!snapshot.hasData) return LoadingSpinner();
    return GoogleMap(
      markers: {
        Marker(
          markerId: MarkerId('driver'),
          position: snapshot.data.latLng,
          icon: carIcon,
          rotation: snapshot.data.heading
        )
      }
    );
  }
)`
    }
  },
  {
    id: '4',
    title: 'BlockPay',
    description: 'Crypto Payment Gateway',
    valueProposition: 'Democratizing crypto payments with a user-friendly mobile wallet. Simplifies complex blockchain transactions into a familiar "tap-to-pay" experience.',
    achievement: 'Integrated 3 major blockchains (ETH, SOL, MATIC) in a single unified UI.',
    techStack: ['Flutter', 'Web3', 'Solidity', 'Dart'],
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=1000',
    details: 'Built the client-side wallet interface. Handles private key management securely using secure storage, and interacts with smart contracts via RPC nodes.',
    problem: 'Crypto wallets are notoriously difficult for non-technical users to understand and use safely.',
    challenges: 'Abstracting gas fees and transaction confirmation times from the user. Created a "Gas Station" service to estimate and automate fee selection.',
    complexity: 'High',
    linesOfCode: '15k+ LOC',
    architecture: ['Web3 Integration', 'Secure Enclave', 'Event Driven']
  },
  {
    id: '5',
    title: 'ParcelApp',
    description: 'Logistics & Delivery',
    valueProposition: 'Full-cycle delivery management for local logistics. connects drivers, customers, and admins in a synchronized real-time ecosystem.',
    achievement: 'Implemented dynamic routing that reduced driver delivery times by 15%.',
    techStack: ['Flutter', 'Node.js', 'MongoDB', 'Socket.io'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000',
    details: 'A freelance full-stack project. I built the backend in Node.js to handle order dispatching and the frontend apps for drivers and customers. Uses Socket.io for live status updates.',
    problem: 'Small logistics firms relied on phone calls and spreadsheets, leading to lost parcels and inefficient routes.',
    challenges: 'Handling offline-first capabilities for drivers in areas with poor network coverage. Implemented a local sync queue that pushes updates when connectivity is restored.',
    complexity: 'High',
    linesOfCode: '18k+ LOC',
    architecture: ['MVC Backend', 'Offline-First Sync', 'WebSocket Stream']
  },
    {
    id: '6',
    title: 'Laundry Service App',
    description: 'On-Demand Services',
    valueProposition: 'Uber-for-Laundry. Schedule pickups, track wash status, and pay online in a few taps.',
    achievement: '4.8 star rating on Play Store across initial 500 downloads.',
    techStack: ['Kotlin', 'XML', 'Firebase', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1517677208171-0bc5e5299304?auto=format&fit=crop&q=80&w=1000',
    details: 'Native Android application built with Kotlin. Features a complex scheduling engine to match pickup slots with van capacity.',
    problem: 'Laundry chores consume weekends. People wanted a "set and forget" solution.',
    challenges: 'Managing complex state for order status (Pickup -> In Wash -> Drying -> Out for Delivery). Used Firebase Realtime Database triggers to update status automatically.',
    complexity: 'Medium',
    linesOfCode: '6k+ LOC',
    architecture: ['MVVM', 'Repository Pattern', 'Serverless']
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'education',
    role: 'MSc Data Science (Distinction)',
    company: 'University of Exeter',
    location: 'Exeter, UK',
    period: 'Sept 2024 - Sept 2025',
    description: [
      'Specialized in Computer Vision and Machine Learning. Dissertation: "Hand Sign Language Recognition using CNNs" (98% Accuracy).',
      'Awarded "The Exeter Award 2024-25" for extracurricular achievement.',
      'Active member of the Students\' Guild Marketing Advisory Board, enhancing digital student experiences.'
    ]
  },
  {
    id: 'bringthefood',
    role: 'Software Engineer Intern',
    company: 'BringTheFood',
    location: 'Birmingham, UK',
    period: 'Sept 2024 - Dec 2024',
    description: [
      'Optimized mobile application deployment pipelines for both iOS and Android platforms.',
      'Contributed 70+ hours to the development of a Flutter-based Point-of-Sale (POS) application used by 20+ restaurant clients.',
      'Managed release cycles for Apple App Store and Google Play Store compliance.'
    ]
  },
  {
    id: 'marbles',
    role: 'Software Engineer',
    company: 'Marbles Health',
    location: 'Gurugram, India',
    period: 'Dec 2022 - Aug 2024',
    description: [
      'Architected BLE and MQTT-based solutions for wearable medical devices, enabling real-time vitals monitoring.',
      'Developed complex Python visualization scripts for EEG and tDCS brain signal analysis.',
      'Optimized app performance to handle high-frequency data streams without UI lag.'
    ]
  },
  {
    id: 'novo',
    role: 'Software Development Engineer II',
    company: 'Novo Cabs',
    location: 'Srinagar, India',
    period: 'Sept 2021 - Oct 2023',
    description: [
      'Led the UI/UX overhaul for a ride-hailing platform scaling to 10k+ active users.',
      'Implemented real-time driver tracking using MQTT and optimized Google Maps API usage for cost efficiency.',
      'Integrated payment gateways and complex routing algorithms for accurate fare estimation.'
    ]
  },
  {
    id: 'chandorkar',
    role: 'Mobile App Developer',
    company: 'Chandorkar Technologies',
    location: 'Pune, India',
    period: 'Dec 2021 - Aug 2022',
    description: [
      'Built cross-platform FinTech applications using Flutter for iOS and Android.',
      'Integrated 25+ third-party APIs for financial services and real-time transaction tracking.',
      'Collaborated with backend teams to ensure secure data handling and efficient synchronization.'
    ]
  },
  {
    id: 'shadow',
    role: 'Mobile App Developer',
    company: 'Shadow Technology',
    location: 'Gurugram, India',
    period: 'July 2021 - Sept 2021',
    description: [
      'Developed "InkPin" and "Parcel" mobile apps from scratch using Flutter.',
      'Translated Adobe XD designs into pixel-perfect, responsive UI components.',
      'Implemented role-based access control (Customer, Artist, Admin) for complex workflows.'
    ]
  },
  {
    id: 'hosting',
    role: 'Android Developer',
    company: 'HostingDuty',
    location: 'Pune, India',
    period: 'Jan 2018 - Mar 2018',
    description: [
      'Early career focus on Augmented Reality (AR) using Unity and Vuforia Engine SDK.',
      'Developed native Android modules to overlay 3D wireframe models on real-world targets.'
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
    skills: ["AWS", "GCP", "Docker", "Git", "Firebase", "Google Maps API", "Unity"]
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