import { ResearchOpportunity } from '../types';
import { getPlaceholderImage } from '../utils/imageUtils';

// Helper function to ensure all opportunities have images
const withPlaceholderImages = (opportunities: ResearchOpportunity[]): ResearchOpportunity[] => {
  return opportunities.map(opp => ({
    ...opp,
    image: opp.image || getPlaceholderImage(opp.title, opp.institution, opp.category)
  }));
};

export const researchOpportunities: ResearchOpportunity[] = withPlaceholderImages([
  // Computer Science
  {
    id: '1',
    title: 'Machine Learning for Healthcare Analytics',
    institution: 'Stanford University',
    department: 'Computer Science',
    supervisor: 'Dr. Sarah Chen',
    category: 'Computer Science',
    type: 'Full-time',
    duration: '12 months',
    deadline: '2024-12-15',
    description: 'Develop advanced machine learning models to predict patient outcomes and optimize treatment plans. This research focuses on applying deep learning techniques to large-scale healthcare datasets.',
    requirements: [
      'PhD or Master\'s in Computer Science, Statistics, or related field',
      'Strong background in machine learning and deep learning',
      'Experience with Python, TensorFlow, or PyTorch',
      'Published research in top-tier conferences preferred'
    ],
    funding: '$65,000/year + benefits',
    location: 'Stanford, CA',
    tags: ['Machine Learning', 'Healthcare', 'Deep Learning', 'AI'],
    posted: '2024-10-15'
  },
  {
    id: '2',
    title: 'Quantum Computing Algorithm Development',
    institution: 'MIT',
    department: 'Physics',
    supervisor: 'Prof. Michael Zhang',
    category: 'Physics',
    type: 'Full-time',
    duration: '24 months',
    deadline: '2024-11-30',
    description: 'Research novel quantum algorithms for optimization problems. Work with state-of-the-art quantum hardware and simulators to develop and test new approaches.',
    requirements: [
      'PhD in Physics, Computer Science, or Mathematics',
      'Strong theoretical background in quantum mechanics',
      'Programming experience with Qiskit or Cirq',
      'Understanding of quantum error correction'
    ],
    funding: '$70,000/year + benefits',
    location: 'Cambridge, MA',
    tags: ['Quantum Computing', 'Algorithms', 'Physics', 'Theory'],
    image: '',
    posted: '2024-10-10'
  },
  {
    id: '3',
    title: 'CRISPR Gene Editing for Cancer Research',
    institution: 'Johns Hopkins University',
    department: 'Molecular Biology',
    supervisor: 'Dr. Emily Rodriguez',
    category: 'Biology',
    type: 'Full-time',
    duration: '18 months',
    deadline: '2024-12-01',
    description: 'Investigate novel CRISPR-based approaches for targeted cancer therapy. Focus on developing precision gene editing techniques for oncology applications.',
    requirements: [
      'PhD in Molecular Biology, Genetics, or related field',
      'Experience with CRISPR/Cas9 systems',
      'Cell culture and molecular biology techniques',
      'Track record of peer-reviewed publications'
    ],
    funding: '$60,000/year + benefits',
    location: 'Baltimore, MD',
    tags: ['CRISPR', 'Gene Editing', 'Cancer', 'Biotechnology'],
    image: '',
    posted: '2024-10-12'
  },
  {
    id: '4',
    title: 'Sustainable Materials for Energy Storage',
    institution: 'UC Berkeley',
    department: 'Chemical Engineering',
    supervisor: 'Prof. James Liu',
    category: 'Engineering',
    type: 'Hybrid',
    duration: '12 months',
    deadline: '2024-11-20',
    description: 'Develop eco-friendly materials for next-generation batteries and supercapacitors. Focus on sustainable synthesis methods and lifecycle analysis.',
    requirements: [
      'Master\'s or PhD in Chemical Engineering, Materials Science',
      'Experience with electrochemical characterization',
      'Knowledge of battery technology',
      'Strong analytical and problem-solving skills'
    ],
    funding: '$58,000/year + benefits',
    location: 'Berkeley, CA',
    tags: ['Materials Science', 'Energy Storage', 'Sustainability', 'Electrochemistry'],
    posted: '2024-10-05'
  },
  // Additional Opportunities
  {
    id: '5',
    title: 'Neuroscience of Decision Making',
    institution: 'Harvard University',
    department: 'Neuroscience',
    supervisor: 'Dr. Rachel Kim',
    category: 'Medicine',
    type: 'Full-time',
    duration: '24 months',
    deadline: '2025-01-15',
    description: 'Study the neural mechanisms underlying decision-making processes using advanced neuroimaging techniques and computational modeling.',
    requirements: [
      'PhD in Neuroscience, Psychology, or related field',
      'Experience with fMRI or EEG data analysis',
      'Strong statistical and programming skills (Python/R)',
      'Background in cognitive neuroscience'
    ],
    funding: '$68,000/year + benefits',
    location: 'Boston, MA',
    tags: ['Neuroscience', 'Cognitive Science', 'Neuroimaging', 'Psychology'],
    posted: '2024-10-18'
  },
  {
    id: '6',
    title: 'Climate Change Impact on Marine Ecosystems',
    institution: 'Scripps Institution of Oceanography',
    department: 'Marine Biology',
    supervisor: 'Dr. Carlos Mendez',
    category: 'Biology',
    type: 'Full-time',
    duration: '18 months',
    deadline: '2024-12-10',
    description: 'Investigate the effects of ocean acidification and warming on marine biodiversity and ecosystem functioning.',
    requirements: [
      'PhD in Marine Biology, Ecology, or related field',
      'Experience with field research and data collection',
      'Statistical analysis skills',
      'SCUBA certification preferred'
    ],
    funding: '$62,000/year + benefits',
    location: 'La Jolla, CA',
    tags: ['Marine Biology', 'Climate Change', 'Ecology', 'Conservation'],
    posted: '2024-10-20'
  },
  {
    id: '7',
    title: 'Autonomous Robotics for Disaster Response',
    institution: 'Carnegie Mellon University',
    department: 'Robotics Institute',
    supervisor: 'Prof. David Park',
    category: 'Engineering',
    type: 'Full-time',
    duration: '24 months',
    deadline: '2025-01-30',
    description: 'Develop autonomous robotic systems for search and rescue operations in disaster scenarios.',
    requirements: [
      'PhD in Robotics, Computer Science, or related field',
      'Experience with ROS and robotic simulation',
      'Strong programming skills in C++/Python',
      'Background in computer vision or machine learning'
    ],
    funding: '$75,000/year + benefits',
    location: 'Pittsburgh, PA',
    tags: ['Robotics', 'AI', 'Computer Vision', 'Autonomous Systems'],
    posted: '2024-10-22'
  },
  {
    id: '8',
    title: 'Ancient DNA Analysis',
    institution: 'University of Copenhagen',
    department: 'Evolutionary Biology',
    supervisor: 'Dr. Ingrid Olsen',
    category: 'Biology',
    type: 'Full-time',
    duration: '36 months',
    deadline: '2024-11-15',
    description: 'Study human migration patterns and evolutionary history through ancient DNA analysis.',
    requirements: [
      'PhD in Genetics, Bioinformatics, or related field',
      'Experience with next-generation sequencing data',
      'Proficiency in population genetics tools',
      'Strong publication record'
    ],
    funding: '€55,000/year + benefits',
    location: 'Copenhagen, Denmark',
    tags: ['Genetics', 'Bioinformatics', 'Anthropology', 'Evolution'],
    posted: '2024-10-15'
  },
  {
    id: '9',
    title: 'Quantum Materials Synthesis',
    institution: 'ETH Zurich',
    department: 'Materials Science',
    supervisor: 'Prof. Hans Weber',
    category: 'Physics',
    type: 'Full-time',
    duration: '24 months',
    deadline: '2024-12-01',
    description: 'Synthesize and characterize novel quantum materials with potential applications in quantum computing.',
    requirements: [
      'PhD in Physics, Chemistry, or Materials Science',
      'Experience with crystal growth techniques',
      'Knowledge of quantum materials',
      'Experience with cryogenic measurements'
    ],
    funding: 'CHF 85,000/year + benefits',
    location: 'Zurich, Switzerland',
    tags: ['Quantum Materials', 'Condensed Matter', 'Materials Science', 'Physics'],
    posted: '2024-10-17'
  },
  {
    id: '10',
    title: 'AI for Drug Discovery',
    institution: 'Broad Institute',
    department: 'Computational Biology',
    supervisor: 'Dr. Lisa Thompson',
    category: 'Computer Science',
    type: 'Hybrid',
    duration: '18 months',
    deadline: '2025-01-10',
    description: 'Develop machine learning models to accelerate drug discovery and repurposing efforts.',
    requirements: [
      'PhD in Computer Science, Bioinformatics, or related field',
      'Experience with deep learning frameworks',
      'Knowledge of cheminformatics or bioinformatics',
      'Strong programming skills in Python'
    ],
    funding: '$80,000/year + benefits',
    location: 'Cambridge, MA',
    tags: ['AI', 'Drug Discovery', 'Machine Learning', 'Healthcare'],
    posted: '2024-10-19'
  },
  {
    id: '11',
    title: 'Natural Language Processing for Legal Tech',
    institution: 'Carnegie Mellon University',
    department: 'Computer Science',
    supervisor: 'Dr. Amanda Foster',
    category: 'Computer Science',
    type: 'Remote',
    duration: '12 months',
    deadline: '2024-12-10',
    description: 'Build NLP models to analyze legal documents and automate contract review. Apply transformer-based architectures to domain-specific language understanding.',
    requirements: [
      'Master\'s or PhD in Computer Science or Computational Linguistics',
      'Strong NLP background with transformers (BERT, GPT)',
      'Experience with Python and NLP libraries',
      'Interest in legal technology applications'
    ],
    funding: '$62,000/year',
    location: 'Remote',
    tags: ['NLP', 'Legal Tech', 'Transformers', 'AI'],
    posted: '2024-10-18'
  },
  {
    id: '12',
    title: 'Neuroscience and Brain-Computer Interfaces',
    institution: 'Harvard Medical School',
    department: 'Neuroscience',
    supervisor: 'Dr. Robert Kim',
    category: 'Medicine',
    type: 'Full-time',
    duration: '24 months',
    deadline: '2024-11-25',
    description: 'Develop advanced brain-computer interface systems for patients with neurological disorders. Combine neuroscience, signal processing, and machine learning.',
    requirements: [
      'PhD in Neuroscience, Biomedical Engineering, or related field',
      'Experience with EEG/MEG data analysis',
      'Signal processing and machine learning skills',
      'Clinical research experience preferred'
    ],
    funding: '$68,000/year + benefits',
    location: 'Boston, MA',
    tags: ['Neuroscience', 'BCI', 'Medical Devices', 'Signal Processing'],
    posted: '2024-10-05'
  },
  {
    id: '13',
    title: 'Climate Modeling and Data Science',
    institution: 'Caltech',
    department: 'Environmental Science',
    supervisor: 'Prof. Lisa Martinez',
    category: 'Engineering',
    type: 'Part-time',
    duration: '18 months',
    deadline: '2024-12-05',
    description: 'Apply data science techniques to improve climate prediction models. Work with large-scale atmospheric and oceanic datasets.',
    requirements: [
      'Master\'s in Environmental Science, Physics, or Data Science',
      'Strong programming skills (Python, R)',
      'Experience with climate data analysis',
      'Statistical modeling background'
    ],
    funding: '$35,000/year (part-time)',
    location: 'Pasadena, CA',
    tags: ['Climate Science', 'Data Science', 'Modeling', 'Environment'],
    image: '',
    posted: '2024-10-20'
  },
  {
    id: '8',
    title: 'Synthetic Biology and Metabolic Engineering',
    institution: 'University of Cambridge',
    department: 'Biochemistry',
    supervisor: 'Dr. Thomas Wright',
    category: 'Biology',
    type: 'Full-time',
    duration: '12 months',
    deadline: '2024-11-15',
    description: 'Engineer microbial systems for sustainable production of biofuels and biochemicals. Design and optimize metabolic pathways.',
    requirements: [
      'PhD in Synthetic Biology, Biochemistry, or related field',
      'Experience with metabolic engineering',
      'Molecular biology and fermentation skills',
      'Computational modeling experience a plus'
    ],
    funding: '£45,000/year + benefits',
    location: 'Cambridge, UK',
    tags: ['Synthetic Biology', 'Metabolic Engineering', 'Biofuels', 'Sustainability'],
    image: '',
    posted: '2024-10-14'
  }
]);
