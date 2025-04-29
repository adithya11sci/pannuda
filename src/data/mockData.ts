
export type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  image: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  enrollmentStatus: 'Open' | 'Closed' | 'In Progress';
  units: Unit[];
};

export type Unit = {
  id: number;
  title: string;
  description: string;
  content: Content[];
};

export type Content = {
  id: number;
  type: 'video' | 'reading' | 'quiz';
  title: string;
  description: string;
  content: string; // URL for video, text content for reading, or quiz data
  duration?: string;
  videoCaption?: string; // For videos only, to support captions
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  enrolledCourses?: string[];
};

export const users: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'student',
    avatar: '/placeholder.svg',
    enrolledCourses: ['physics', 'chemistry'],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'teacher',
    avatar: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: '/placeholder.svg',
  },
];

export const courses: Course[] = [
  {
    id: 'physics',
    title: 'Introduction to Physics',
    description: 'Learn the fundamental principles of physics including mechanics, thermodynamics, waves, and electricity.',
    instructor: 'Dr. Richard Feynman',
    image: '/placeholder.svg',
    duration: '8 weeks',
    level: 'Beginner',
    category: 'Science',
    enrollmentStatus: 'Open',
    units: [
      {
        id: 1,
        title: 'Unit 1: Mechanics',
        description: 'Study of motion, forces, energy, and momentum.',
        content: [
          {
            id: 101,
            type: 'video',
            title: 'Introduction to Mechanics',
            description: 'An overview of mechanical principles',
            content: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
            duration: '10:00',
            videoCaption: 'Welcome to mechanics! In this video, we will explore the fundamental principles that govern motion and forces in our universe. We will start by discussing Newton\'s laws of motion and how they can be applied to understand everyday phenomena.'
          },
          {
            id: 102,
            type: 'reading',
            title: 'Newton\'s Laws of Motion',
            description: 'Detailed explanation of the three laws',
            content: `# Newton's Laws of Motion

## First Law (Law of Inertia)
An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an unbalanced force.

## Second Law (F = ma)
The acceleration of an object depends on the mass of the object and the amount of force applied.

## Third Law (Action-Reaction)
For every action, there is an equal and opposite reaction.

These laws form the foundation of classical mechanics and describe the relationship between the motion of an object and the forces acting on it.`,
          },
          {
            id: 103,
            type: 'quiz',
            title: 'Mechanics Quiz',
            description: 'Test your understanding of mechanics',
            content: JSON.stringify({
              questions: [
                {
                  question: "What does Newton's First Law describe?",
                  options: ["Gravity", "Inertia", "Acceleration", "Reaction forces"],
                  answer: 1
                },
                {
                  question: "The formula F = ma represents which law?",
                  options: ["First law", "Second law", "Third law", "Law of conservation of energy"],
                  answer: 1
                }
              ]
            })
          }
        ]
      },
      {
        id: 2,
        title: 'Unit 2: Thermodynamics',
        description: 'Study of heat, energy, and work.',
        content: [
          {
            id: 201,
            type: 'video',
            title: 'Introduction to Thermodynamics',
            description: 'Basic concepts of heat and energy',
            content: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
            duration: '10:00',
            videoCaption: 'In this video, we introduce the basic concepts of thermodynamics. We will discuss heat transfer, energy conservation, and the laws of thermodynamics that govern these processes.'
          },
          {
            id: 202,
            type: 'reading',
            title: 'Laws of Thermodynamics',
            description: 'The four fundamental laws',
            content: `# Laws of Thermodynamics

## Zeroth Law
If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other.

## First Law (Conservation of Energy)
Energy cannot be created or destroyed, only transferred or converted from one form to another.

## Second Law (Entropy)
The total entropy of an isolated system always increases over time.

## Third Law
As the temperature approaches absolute zero, the entropy of a system approaches a constant minimum.

These laws describe how thermal energy is converted to and from other forms of energy and how it affects matter.`,
          }
        ]
      }
    ]
  },
  {
    id: 'chemistry',
    title: 'General Chemistry',
    description: 'Explore the principles of chemistry, including atoms, molecules, reactions, and chemical bonding.',
    instructor: 'Dr. Marie Curie',
    image: '/placeholder.svg',
    duration: '10 weeks',
    level: 'Beginner',
    category: 'Science',
    enrollmentStatus: 'Open',
    units: [
      {
        id: 1,
        title: 'Unit 1: Atomic Structure',
        description: 'Understanding the building blocks of matter',
        content: [
          {
            id: 301,
            type: 'video',
            title: 'Introduction to Atoms',
            description: 'The basic structure of atoms',
            content: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
            duration: '10:00',
            videoCaption: 'In this video, we explore the fundamental building blocks of matter: atoms. We will discuss the components of atoms, including protons, neutrons, and electrons, and how they determine the properties of elements.'
          },
          {
            id: 302,
            type: 'reading',
            title: 'Atomic Theory',
            description: 'Development of atomic theory through history',
            content: `# Atomic Theory Development

## Early Models
- Democritus (460-370 BCE): Proposed that matter consists of indivisible particles
- Dalton (1803): Proposed that elements consist of indivisible atoms

## Modern Understanding
- Thomson (1897): Discovered electrons, proposed the "plum pudding" model
- Rutherford (1911): Discovered the nucleus, proposed the planetary model
- Bohr (1913): Proposed electrons orbit the nucleus in specific energy levels
- Quantum mechanical model: Describes electrons as waves rather than particles

The modern understanding of atomic structure is fundamental to our comprehension of chemical reactions and properties.`,
          }
        ]
      },
      {
        id: 2,
        title: 'Unit 2: Chemical Bonding',
        description: 'How atoms combine to form molecules',
        content: [
          {
            id: 401,
            type: 'video',
            title: 'Types of Chemical Bonds',
            description: 'Ionic, covalent, and metallic bonds',
            content: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
            duration: '10:00',
            videoCaption: 'This video covers the main types of chemical bonds: ionic, covalent, and metallic. We will explore how electrons are shared or transferred between atoms and the resulting properties of the bonded substances.'
          },
          {
            id: 402,
            type: 'reading',
            title: 'Molecular Geometries',
            description: 'VSEPR theory and molecular shapes',
            content: `# Molecular Geometries and VSEPR Theory

The Valence Shell Electron Pair Repulsion (VSEPR) theory helps predict the shapes of molecules.

## Common Geometries
- Linear: 2 electron groups (e.g., CO₂)
- Trigonal planar: 3 electron groups (e.g., BF₃)
- Tetrahedral: 4 electron groups (e.g., CH₄)
- Trigonal bipyramidal: 5 electron groups (e.g., PCl₅)
- Octahedral: 6 electron groups (e.g., SF₆)

The geometry affects the molecule's polarity, reactivity, and other properties.`,
          },
          {
            id: 403,
            type: 'quiz',
            title: 'Chemical Bonding Quiz',
            description: 'Test your knowledge of chemical bonds',
            content: JSON.stringify({
              questions: [
                {
                  question: "Which type of bond involves the complete transfer of electrons?",
                  options: ["Covalent", "Ionic", "Metallic", "Hydrogen"],
                  answer: 1
                },
                {
                  question: "What is the molecular geometry of methane (CH₄)?",
                  options: ["Linear", "Trigonal planar", "Tetrahedral", "Octahedral"],
                  answer: 2
                }
              ]
            })
          }
        ]
      }
    ]
  }
];
