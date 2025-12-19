import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Video,
  Headphones,
  HelpCircle,
  Clock,
  BookOpen,
  ChevronRight,
  Sparkles,
  Target,
  Lightbulb,
  Zap,
  Home,
  BarChart,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Map,
  Film,
  Palette,
  Book,
  Star,
  CheckCircle,
  TrendingUp,
  Award,
  Download,
  Share2,
  Bookmark,
  Eye,
  Ear,
  PenTool,
  Activity,
  ThumbsUp,
  AlertTriangle,
  Users,
  Calendar,
  BookmarkCheck,
  Layers,
  FileText,
  Mic,
  PlayCircle,
  MessageCircle,
  Brain,
  Target as TargetIcon,
  BarChart3,
  CheckSquare,
  Settings as SettingsIcon
} from 'lucide-react';

/* ================= ANIMATIONS ================= */
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideDown = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

/* ================= UPDATED NAVBAR TO MATCH DASHBOARD ================= */
const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #4ca2af 0%, #2c7994 100%);
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 20px rgba(76, 162, 175, 0.3);
  z-index: 1000;
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #91ebe9, #4ca2af);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(145, 235, 233, 0.4);
  animation: ${float} 6s ease-in-out infinite;
`;

const LogoText = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(45deg, #fff, #91ebe9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${pulse} 3s ease-in-out infinite;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  
  @media (max-width: 768px) {
    display: ${props => props.mobileOpen ? 'flex' : 'none'};
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #4ca2af 0%, #2c7994 100%);
    flex-direction: column;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(145, 235, 233, 0.2);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    gap: 1rem;
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 50px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transition: left 0.3s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: white;
  cursor: pointer;
  position: relative;
  padding: 8px 16px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const UserAvatar = styled.div`
  width: 45px;
  height: 45px;
  background: linear-gradient(45deg, #91ebe9, #4ca2af);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  animation: ${pulse} 4s ease-in-out infinite;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
`;

const UserEmail = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: white;
  cursor: pointer;
  position: relative;
  
  .avatar {
    width: 45px;
    height: 45px;
    background: linear-gradient(45deg, #91ebe9, #4ca2af);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
    ${css`animation: ${pulse} 4s ease-in-out infinite;`}
  }
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  z-index: 1001;
  overflow: hidden;
  ${css`animation: ${fadeIn} 0.3s ease-out;`}
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #4ca2af 0%, #2c7994 100%);
  padding: 25px;
  color: white;
  text-align: center;
`;

const ProfileAvatar = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(45deg, #91ebe9, #4ca2af);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 auto 15px;
`;

const ProfileName = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
`;

const ProfileEmail = styled.p`
  margin: 5px 0 0;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const ProfileDetails = styled.div`
  padding: 20px;
`;

const ProfileDetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  .detail-icon {
    font-size: 1.2rem;
    color: #4ca2af;
    width: 24px;
  }
  
  .detail-content {
    flex: 1;
  }
  
  .detail-label {
    font-size: 0.85rem;
    color: #888;
    margin-bottom: 2px;
  }
  
  .detail-value {
    font-size: 0.95rem;
    color: #333;
    font-weight: 500;
  }
  
  .na-value {
    color: #999;
    font-style: italic;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
  }
`;

/* ================= COMPONENT ================= */
const Learning = () => {
  const navigate = useNavigate();
  const [completedResources, setCompletedResources] = useState([]);
  const [userLearningStyle, setUserLearningStyle] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userName, setUserName] = useState('User');
  const [activeTab, setActiveTab] = useState('overview'); // For detailed view tabs

  

  /* ===== AUTO LOAD LEARNING STYLE ===== */
  useEffect(() => {
    // Check for temp style first (from dashboard), then saved style
    let style = localStorage.getItem('tempLearningStyle') || localStorage.getItem('learningStyle');

    // Else try predicted style from Result page
    if (!style) {
      const predicted = localStorage.getItem('predictedStyle');

      const mapping = {
        Read: 'read',
        Visual: 'visual',
        Auditory: 'auditory',
        Kinesthetic: 'kinesthetic'
      };

      if (predicted && mapping[predicted]) {
        style = mapping[predicted];
        localStorage.setItem('learningStyle', style);
      }
    }

    if (style) {
      setUserLearningStyle(style);
    }

    // Load user name
    const name = localStorage.getItem('userName') || 'User';
    setUserName(name);
  }, []);

  /* ================= COMPREHENSIVE VARK LEARNING STYLES ================= */
  const learningStyles = {
    visual: {
      title: 'Visual Explorer',
      motto: '"The soul never thinks without a picture." – Aristotle',
      color: '#4ca2af',
      gradient: 'linear-gradient(135deg, #4ca2af 0%, #91ebe9 100%)',
      lightGradient: 'linear-gradient(135deg, rgba(76, 162, 175, 0.1) 0%, rgba(145, 235, 233, 0.1) 100%)',
      icon: '👁️✨',
      
      // Comprehensive Overview
      overview: {
        description: 'You are a holistic thinker who needs to see "the BIG picture first!" You organize and emphasize information visually, often preferring to draw connections rather than write them.',
        coreBelief: 'Information is best understood when presented as spatial relationships, patterns, and visual connections.',
        learningPhilosophy: 'Visual strategies focus on symbols, diagrams, colors, fonts, and different spatial layouts rather than just words.'
      },
      
      // Personality Profile
      personality: {
        strengths: [
          'Holistic Understanding: See connections and patterns that others miss',
          'Spatial Intelligence: Excellent at organizing information visually',
          'Pattern Recognition: Spot trends and relationships easily',
          'Creative Problem Solving: Approach challenges from unique visual angles',
          'Memory Enhancement: Visual aids create stronger memory anchors'
        ],
        challenges: [
          'May struggle with purely verbal or written explanations',
          'Can become frustrated when information isn\'t presented visually',
          'Might miss important details while focusing on the big picture',
          'Need extra time to convert abstract concepts into visual formats',
          'Limited by others\' inability to understand visual explanations'
        ],
        preferences: [
          'Replace keywords with symbols or diagrams',
          'Reconstruct notes using images, colors, fonts, and different spatial layouts',
          'Review notes and look for patterns',
          'Redraw notes from memory',
          'Restore visuals back into words for communication'
        ]
      },
      
      // Learning Methods
      methods: {
        takingInformation: [
          'Transform words into visuals using symbols, diagrams, and mind maps',
          'Use color coding to categorize and organize information',
          'Create spatial arrangements of concepts rather than linear lists',
          'Look for visual patterns in data and relationships',
          'Focus on the overall structure before details'
        ],
        presentingInformation: [
          'Include images, colors, fonts, and different layouts in presentations',
          'Use freehand drawings to communicate complex ideas',
          'Create charts and diagrams to analyze and understand data',
          'Design visual summaries that capture the essence of information',
          'Use visual metaphors to explain abstract concepts'
        ],
        academicStrategies: [
          'Replace keywords with symbols or diagrams in notes',
          'Reconstruct 3 pages of notes into 1 visual summary',
          'Redraw notes from memory to reinforce learning',
          'Use visual patterns to identify key concepts',
          'Create visual study guides for exams'
        ],
        professionalApplications: [
          'Design visually compelling presentations and reports',
          'Create information architecture and user interfaces',
          'Develop training materials that cater to visual learners',
          'Use data visualization to communicate complex information',
          'Design workflows and processes visually'
        ]
      },
      
      // Key Characteristics
      keyCharacteristics: [
        'Organize and emphasize information using visual layouts',
        'Prefer to draw connections rather than write them',
        'Need to see the big picture first',
        'Think in terms of spatial relationships and patterns',
        'Transform abstract concepts into visual representations'
      ],
      
      // Important Note
      importantNote: 'Note: Visual strategies do NOT include videos & photos showing real life. These are more helpful to those with a Kinesthetic or Aural preference.',
      
      // Stats
      stats: {
        retention: '85%',
        speed: 'Fast',
        preference: 'High',
        population: 'Approximately 30% of learners',
        effectiveness: 'Highly effective for spatial and conceptual learning'
      }
    },
    
    auditory: {
      title: 'Sound Maestro',
      motto: '"When people talk, listen completely." – Ernest Hemingway',
      color: '#8e44ad',
      gradient: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)',
      lightGradient: 'linear-gradient(135deg, rgba(142, 68, 173, 0.1) 0%, rgba(155, 89, 182, 0.1) 100%)',
      icon: '👂🎶',
      
      // Comprehensive Overview
      overview: {
        description: 'You thrive on sound, discussion, and verbal exchange. The written word is less meaningful than the words you hear. You prefer to talk things through, question ideas, and engage in discussions to truly understand concepts.',
        coreBelief: 'Learning happens through listening, discussing, questioning, and verbal exchange.',
        learningPhilosophy: 'If it isn\'t discussed, it isn\'t fully understood. Verbal processing is key to comprehension.'
      },
      
      // Personality Profile
      personality: {
        strengths: [
          'Verbal Processing: Excel at understanding through conversation',
          'Discussion Skills: Strong at debating and exploring ideas verbally',
          'Listening Comprehension: Absorb information effectively through hearing',
          'Verbal Memory: Remember what you\'ve heard more than what you\'ve read',
          'Communication: Express ideas clearly through speech'
        ],
        challenges: [
          'May struggle with silent reading or written assignments',
          'Can become distracted in quiet environments',
          'Might need to talk through problems, which isn\'t always possible',
          'Could miss written details in favor of verbal explanations',
          'Need auditory stimulation to stay engaged'
        ],
        preferences: [
          'Listening to people with authority or knowledge',
          'Podcasts, videos, and audiobooks',
          'Interesting spoken examples, anecdotes, and jokes',
          'Verbal instructions and feedback',
          'Self-talk and verbal processing'
        ]
      },
      
      // Learning Methods
      methods: {
        takingInformation: [
          'Attend classes, discussions, and tutorials regularly',
          'Leave spaces in notes for later recall and verbal "filling"',
          'Explain notes and new ideas to another person',
          'Ask questions and discuss topics with teachers and peers',
          'Use rhymes and mnemonics to remember concepts'
        ],
        presentingInformation: [
          'Speak from notes and allow for questions and feedback',
          'Use your voice in different ways to emphasize points',
          'Argue a point of view and refine ideas through discussion',
          'Have phone conversations and participate in audio chats',
          'Record presentations for auditory review'
        ],
        academicStrategies: [
          'Read summarized notes aloud; record and listen to them',
          'Practice previous exam papers and speak answers aloud',
          'Imagine talking with the examiner during preparation',
          'Obtain feedback about understanding by listening to comments',
          'Use group study sessions for verbal processing'
        ],
        professionalApplications: [
          'Participate in discussions, focus groups, and workshops',
          'Join colleagues for coffee breaks and informal conversations',
          'Attend live training sessions with verbal participation',
          'Join online chats and listen to podcasts in your field',
          'Use verbal presentations to communicate findings'
        ]
      },
      
      // Key Characteristics
      keyCharacteristics: [
        'Prefer listening to authority figures and experts',
        'Enjoy explaining understanding to others verbally',
        'Learn through talking things over and brainstorming',
        'Use questioning, arguing, and debating to clarify ideas',
        'Benefit from joining and contributing to discussions'
      ],
      
      // Key Words
      keyWords: 'listening, talking, discussing, questioning',
      
      // Stats
      stats: {
        retention: '75%',
        speed: 'Medium',
        preference: 'High',
        population: 'Approximately 25% of learners',
        effectiveness: 'Highly effective for language and communication skills'
      }
    },
    
    read: {
      title: 'Word Wizard',
      motto: '"My task... by the power of the written word (is) to make you hear, to make you feel... to make you see." – Joseph Conrad',
      color: '#f39c12',
      gradient: 'linear-gradient(135deg, #f39c12 0%, #f1c40f 100%)',
      lightGradient: 'linear-gradient(135deg, rgba(243, 156, 18, 0.1) 0%, rgba(241, 196, 15, 0.1) 100%)',
      icon: '📚✨',
      
      // Comprehensive Overview
      overview: {
        description: 'You believe that "if it isn\'t in print, it doesn\'t exist." You prefer printed words, reading, writing, and structured information. You love lists, notes, and text in all formats, seeking clarity, order, and the right words used correctly.',
        coreBelief: 'Written words provide structure, clarity, and permanence that spoken words lack.',
        learningPhilosophy: 'Knowledge is best acquired and expressed through reading and writing in organized formats.'
      },
      
      // Personality Profile
      personality: {
        strengths: [
          'Precision with Language: Excel at finding and using the right words',
          'Structured Thinking: Organize information logically and systematically',
          'Written Comprehension: Understand best through reading',
          'Note-Taking Skills: Excellent at capturing and organizing information',
          'Written Expression: Communicate effectively through writing'
        ],
        challenges: [
          'May struggle with purely visual or hands-on learning',
          'Can become overwhelmed by unstructured information',
          'Might miss non-verbal cues in communication',
          'Need time to process and organize thoughts in writing',
          'Could focus too much on words rather than concepts'
        ],
        preferences: [
          'Printed words in all formats',
          'Reading and writing activities',
          'Taking notes and making lists',
          'Structure, order, and clarity',
          'Words with interesting sources and definitions'
        ]
      },
      
      // Learning Methods
      methods: {
        takingInformation: [
          'Use lists – ordered, numbered, or with bullet points',
          'Focus on titles and headings for structure',
          'Use dictionaries and online tools to find the best words',
          'Read books, articles, manuals, hand-outs, and reading lists',
          'Take written notes from what others have said or written'
        ],
        presentingInformation: [
          'Use writing to think through and clarify ideas',
          'Rewrite principles and ideas in your own words',
          'List items in categories, ordered by importance',
          'Always spell-check and proofread written work',
          'Provide written information for others to read'
        ],
        academicStrategies: [
          'Read textbooks, manuals, and assigned readings thoroughly',
          'Translate ideas and principles into other words',
          'Organize diagrams, charts, and graphs into words',
          'Write essays in structured paragraphs with clear organization',
          'Rewrite notes repeatedly for reinforcement'
        ],
        professionalApplications: [
          'Make lists of actions and desired outcomes in meetings',
          'Summarize spoken information in your own notes and lists',
          'Create plans or frameworks to organize complex information',
          'Analyze detailed results in tables and written formats',
          'Contribute to business articles, journals, and online posts'
        ]
      },
      
      // Key Characteristics
      keyCharacteristics: [
        'Prefer lists, notes, and text in all formats',
        'Value structure, order, and clarity in information',
        'Enjoy using the right words correctly',
        'Benefit from dictionaries and definitions',
        'Appreciate written rules, constitutions, and legal documents'
      ],
      
      // Key Words
      keyWords: 'LISTS, NOTES, and TEXT in all formats, both paper and on screen',
      
      // Stats
      stats: {
        retention: '80%',
        speed: 'Medium',
        preference: 'High',
        population: 'Approximately 20% of learners',
        effectiveness: 'Highly effective for academic and professional writing'
      }
    },
    
    kinesthetic: {
      title: 'Movement Master',
      motto: '"I hear and I forget. I see and I remember. I do and I understand." – Confucius',
      color: '#e74c3c',
      gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      lightGradient: 'linear-gradient(135deg, rgba(231, 76, 60, 0.1) 0%, rgba(192, 57, 43, 0.1) 100%)',
      icon: '🤸⚡',
      
      // Comprehensive Overview
      overview: {
        description: 'You live by the principle: "I do and I understand." You need to physically engage with information, using all your senses and a hands-on approach. You prefer real-life examples, practical exercises, and learning through experience.',
        coreBelief: 'True understanding comes from direct experience, action, and practical application.',
        learningPhilosophy: 'Ideas need to be practical and relevant. You need to DO things to understand them.'
      },
      
      // Personality Profile
      personality: {
        strengths: [
          'Practical Application: Excel at applying theory to real situations',
          'Problem Solving: Great at solving problems practically',
          'Experiential Learning: Learn best through direct experience',
          'Sensory Integration: Use all senses effectively for learning',
          'Action-Oriented: Make things happen rather than just discussing'
        ],
        challenges: [
          'May struggle with purely theoretical or abstract concepts',
          'Can become restless in sedentary learning environments',
          'Might need physical movement to process information',
          'Could miss theoretical foundations while focusing on practice',
          'Need access to practical applications and real examples'
        ],
        preferences: [
          'Making things happen through action',
          'Solving problems practically',
          'Recalling previous experiences',
          'Real life examples and applications',
          'Measurable outcomes and tangible results'
        ]
      },
      
      // Learning Methods
      methods: {
        takingInformation: [
          'Use all your senses – sight, hearing, touch, taste, and smell',
          'Take a hands-on approach to learning',
          'Use trial and error – practice, practice, practice',
          'Focus on real life examples and personal stories',
          'Use displays, collections, photos, and videos of real things'
        ],
        presentingInformation: [
          'Focus on the real things that happened',
          'Recall exactly what happened in detail',
          'Use plenty of examples when presenting',
          'Use previous experience as the basis for decision-making',
          'Stay in the here and now with practical applications'
        ],
        academicStrategies: [
          'Expand notes with details you may have missed',
          'Talk about notes with another kinesthetic learner',
          'Use case studies, photos, and applications for abstract concepts',
          'Attend laboratories and field trips and review what you learned',
          'Practice solutions to problems from previous exam papers'
        ],
        professionalApplications: [
          'Participate in on-site visits, walk-arounds, and displays',
          'Engage in on-the-job training and practical applications',
          'Use role-plays to communicate complex ideas',
          'Implement trials and pilot schemes',
          'Provide face-to-face feedback with specific examples'
        ]
      },
      
      // Key Characteristics
      keyCharacteristics: [
        'Learn through senses and practical exercises',
        'Prefer experiences, examples, and case studies',
        'Use trial and error as a learning method',
        'Value teamwork and collaborative doing',
        'Focus on measurable, tangible outcomes'
      ],
      
      // Key Words
      keyWords: 'senses, practical exercises, experiences, examples, case studies, trial and error',
      
      // Stats
      stats: {
        retention: '90%',
        speed: 'Fast',
        preference: 'High',
        population: 'Approximately 25% of learners',
        effectiveness: 'Highly effective for practical skills and applied knowledge'
      }
    }
  };


  const getDataOrNA = (key, defaultValue = 'NA') => {
    const data = localStorage.getItem(key);
    return data ? data : defaultValue;
  };

  const getUserData = () => {
    // Get name from localStorage or use default
    const name = getDataOrNA('userName', 'Guest');
    
    // Get learning style from localStorage
    const learningStyleKey = getDataOrNA('learningStyle');
    const learningStyle = learningStyleKey ? 
      learningStyles[learningStyleKey]?.title : 'Not Selected';
    
    // Try to get email from localStorage or generate placeholder
    let email = getDataOrNA('userEmail');
    if (email === 'NA') {
      // If no email in DB, show NA
      email = 'NA';
    }
    
    // Calculate member since date (use current date if not in DB)
    const savedDate = getDataOrNA('memberSince');
    let memberSince = 'NA';
    if (savedDate !== 'NA') {
      memberSince = savedDate;
    }
    
    // Get accuracy from localStorage
    const accuracy = `${getDataOrNA('learningProgress', '0')}%`;
    
    // Get completed quests from localStorage or use NA
    const completedQuests = getDataOrNA('completedQuests', '0');
    
    // Get streak from localStorage or use NA
    const streak = getDataOrNA('currentStreak', '0');
    
    // Calculate level based on progress
    const levelProgress = parseInt(getDataOrNA('learningProgress', '0'));
    const level = Math.floor(levelProgress / 20) + 1;
    
    return {
      name: name,
      email: email,
      learningStyle: learningStyle,
      memberSince: memberSince,
      accuracy: accuracy,
      completedQuests: completedQuests,
      streak: `${streak} days`,
      level: level
    };
  };

  const userData = getUserData();

  /* ================= RESOURCE DATA ================= */
  const resourceData = {
    visual: [
      {
        id: 1,
        title: 'Visual Learning Strategies Guide',
        type: 'guide',
        duration: 'Self-paced',
        difficulty: 'All Levels',
        description: 'Complete VARK guide for visual learners with strategies, techniques, and practical applications.',
        progress: 60,
        icon: <Eye size={24} />,
        tags: ['VARK', 'Visual', 'Strategies', 'Guide'],
        link: 'https://vark-learn.com/strategies/visual-strategies/',
        rating: 4.8,
        students: '2.5k'
      },
      {
        id: 5,
        title: 'Mind Mapping Masterclass',
        type: 'interactive',
        duration: '45 min',
        difficulty: 'Beginner',
        description: 'Learn how to create effective visual diagrams to organize your thoughts and ideas.',
        progress: 40,
        icon: <Map size={24} />,
        tags: ['Mind Maps', 'Visual Organization', 'Creativity'],
        link: 'https://vark-learn.com/strategies/visual-strategies/',
        rating: 4.6,
        students: '1.8k'
      }
    ],
    auditory: [
      {
        id: 2,
        title: 'Aural Learning Strategies Guide',
        type: 'audio',
        duration: 'Self-paced',
        difficulty: 'All Levels',
        description: 'Complete VARK guide for auditory learners with listening, discussing, and verbal strategies.',
        progress: 30,
        icon: <Ear size={24} />,
        tags: ['VARK', 'Auditory', 'Strategies', 'Audio'],
        link: 'https://vark-learn.com/strategies/aural-strategies/',
        rating: 4.7,
        students: '1.2k'
      }
    ],
    read: [
      {
        id: 3,
        title: 'Read/Write Learning Strategies Guide',
        type: 'guide',
        duration: 'Self-paced',
        difficulty: 'All Levels',
        description: 'Complete VARK guide for read/write learners with comprehensive reading and writing strategies.',
        icon: <FileText size={24} />,
        tags: ['VARK', 'Read/Write', 'Strategies', 'Writing'],
        link: 'https://vark-learn.com/strategies/readwrite-strategies/',
        rating: 4.9,
        students: '3.1k'
      }
    ],
    kinesthetic: [
      {
        id: 4,
        title: 'Kinesthetic Learning Strategies Guide',
        type: 'interactive',
        duration: 'Self-paced',
        difficulty: 'All Levels',
        description: 'Complete VARK guide for kinesthetic learners with hands-on and practical strategies.',
        progress: 10,
        icon: <Activity size={24} />,
        tags: ['VARK', 'Kinesthetic', 'Hands-on', 'Practical'],
        link: 'https://vark-learn.com/strategies/kinesthetic-strategies/',
        rating: 4.5,
        students: '950'
      }
    ]
  };

  const currentStyle = userLearningStyle ? learningStyles[userLearningStyle] : null;
  const recommendations = userLearningStyle ? resourceData[userLearningStyle] : [];

  const toggleCompletion = (id) => {
    setCompletedResources(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleTakeQuiz = () => navigate('/home');

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('learningStyle');
    localStorage.removeItem('tempLearningStyle');
    navigate('/');
  };

  /* ================= QUIZ FALLBACK ================= */
  if (!userLearningStyle) {
    return (
      <>
        {/* Navbar */}
        <NavbarContainer>
          <NavLogo>
            <LogoIcon>L</LogoIcon>
            <LogoText>LearnQuest</LogoText>
          </NavLogo>
          
          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
          
          <NavLinks mobileOpen={mobileMenuOpen}>
            <NavLinkStyled to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Home size={20} />
              Dashboard
            </NavLinkStyled>
            <NavLinkStyled to="/learning" onClick={() => setMobileMenuOpen(false)}>
              <Target size={20} />
              Learning
            </NavLinkStyled>
            <NavLinkStyled to="/progress" onClick={() => setMobileMenuOpen(false)}>
              <BarChart size={20} />
              Progress
            </NavLinkStyled>
            
          </NavLinks>
          
          
            <ProfileSection 
          onMouseEnter={() => setShowProfileDropdown(true)}
          onMouseLeave={() => setShowProfileDropdown(false)}
        >
          <div className="avatar">
            {userData.name?.charAt(0).toUpperCase() || 'G'}
          </div>
          <div>
            <div style={{ fontWeight: 'bold' }}>{userData.name}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              {userData.learningStyle?.split(' ')[0] || 'Choose Style'}
            </div>
          </div>
          
          {showProfileDropdown && (
            <ProfileDropdown
              onMouseEnter={() => setShowProfileDropdown(true)}
              onMouseLeave={() => setShowProfileDropdown(false)}
            >
              <ProfileHeader>
                <ProfileAvatar>
                  {userData.name?.charAt(0).toUpperCase() || 'G'}
                </ProfileAvatar>
                <ProfileName>{userData.name}</ProfileName>
                <ProfileEmail>{userData.email}</ProfileEmail>
              </ProfileHeader>
              
              <ProfileDetails>
                <ProfileDetailItem>
                  <span className="detail-icon">🎓</span>
                  <div className="detail-content">
                    <div className="detail-label">Learning Style</div>
                    <div className={`detail-value ${userData.learningStyle === 'Not Selected' ? 'na-value' : ''}`}>
                      {userData.learningStyle}
                    </div>
                  </div>
                </ProfileDetailItem>
                
                <ProfileDetailItem>
                  <span className="detail-icon">📅</span>
                  <div className="detail-content">
                    <div className="detail-label">Member Since</div>
                    <div className={`detail-value ${userData.memberSince === 'NA' ? 'na-value' : ''}`}>
                      {userData.memberSince}
                    </div>
                  </div>
                </ProfileDetailItem>
                
                <ProfileDetailItem>
                  <span className="detail-icon">🎯</span>
                  <div className="detail-content">
                    <div className="detail-label">Style Accuracy</div>
                    <div className={`detail-value ${userData.accuracy === 'NA%' ? 'na-value' : ''}`}>
                      {userData.accuracy}
                    </div>
                  </div>
                </ProfileDetailItem>
                
                <ProfileDetailItem>
                  <span className="detail-icon">⭐</span>
                  <div className="detail-content">
                    <div className="detail-label">Level</div>
                    <div className={`detail-value ${userData.level === 'NA' ? 'na-value' : ''}`}>
                      {userData.level}
                    </div>
                  </div>
                </ProfileDetailItem>
                
                <ProfileDetailItem>
                  <span className="detail-icon">🔥</span>
                  <div className="detail-content">
                    <div className="detail-label">Current Streak</div>
                    <div className={`detail-value ${userData.streak === '0 days' ? 'na-value' : ''}`}>
                      {userData.streak}
                    </div>
                  </div>
                </ProfileDetailItem>
                
                <ProfileDetailItem>
                  <span className="detail-icon">🏆</span>
                  <div className="detail-content">
                    <div className="detail-label">Quests Completed</div>
                    <div className={`detail-value ${userData.completedQuests === 'NA' ? 'na-value' : ''}`}>
                      {userData.completedQuests}
                    </div>
                  </div>
                </ProfileDetailItem>
                
                <LogoutButton onClick={handleLogout}>
                  <span>🚪</span>
                  Logout
                </LogoutButton>
              </ProfileDetails>
            </ProfileDropdown>
          )}
        </ProfileSection>
        </NavbarContainer>

        <DashboardContainer>
          <ContentWrapper>
            <QuizPromptCard>
              <QuizCardHeader>
                <QuizIcon>
                  <Target size={40} />
                </QuizIcon>
                <QuizTitle>Discover Your Learning Style</QuizTitle>
                <QuizSubtitle>
                  Take the quiz to unlock personalized learning resources tailored to how you learn best!
                </QuizSubtitle>
              </QuizCardHeader>
              
              <QuizCardBody>
                <BenefitsList>
                  <BenefitCard>
                    <BenefitIcon style={{ background: 'rgba(76, 162, 175, 0.1)' }}>
                      <Sparkles size={24} color="#4ca2af" />
                    </BenefitIcon>
                    <BenefitContent>
                      <BenefitTitle>Personalized Recommendations</BenefitTitle>
                      <BenefitDescription>Resources matched to your unique learning preferences</BenefitDescription>
                    </BenefitContent>
                  </BenefitCard>
                  
                  <BenefitCard>
                    <BenefitIcon style={{ background: 'rgba(231, 76, 60, 0.1)' }}>
                      <Zap size={24} color="#e74c3c" />
                    </BenefitIcon>
                    <BenefitContent>
                      <BenefitTitle>Accelerated Progress</BenefitTitle>
                      <BenefitDescription>Learn faster with techniques that work for you</BenefitDescription>
                    </BenefitContent>
                  </BenefitCard>
                  
                  <BenefitCard>
                    <BenefitIcon style={{ background: 'rgba(243, 156, 18, 0.1)' }}>
                      <Lightbulb size={24} color="#f39c12" />
                    </BenefitIcon>
                    <BenefitContent>
                      <BenefitTitle>Effective Techniques</BenefitTitle>
                      <BenefitDescription>Discover learning methods that maximize retention</BenefitDescription>
                    </BenefitContent>
                  </BenefitCard>
                </BenefitsList>
              </QuizCardBody>
              
              <QuizCardFooter>
                <PrimaryButton onClick={handleTakeQuiz}>
                  <Target size={20} />
                  Take Learning Style Quiz
                  <ChevronRight size={20} />
                </PrimaryButton>
              </QuizCardFooter>
            </QuizPromptCard>
          </ContentWrapper>
        </DashboardContainer>
      </>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <>
      {/* Navbar - Updated to match Dashboard */}
      <NavbarContainer>
        <NavLogo>
          <LogoIcon>L</LogoIcon>
          <LogoText>LearnQuest</LogoText>
        </NavLogo>
        
        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
        
        <NavLinks mobileOpen={mobileMenuOpen}>
          <NavLinkStyled to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
            <Home size={20} />
            Dashboard
          </NavLinkStyled>
          <NavLinkStyled to="/learning" onClick={() => setMobileMenuOpen(false)}>
            <Target size={20} />
            Learning
          </NavLinkStyled>
          <NavLinkStyled to="/todo" onClick={() => setMobileMenuOpen(false)}>
            ✅ To-Do List
          </NavLinkStyled>
          <NavLinkStyled to="/notes" onClick={() => setMobileMenuOpen(false)}>
            📓 Notes
          </NavLinkStyled>
          <NavLinkStyled to="/home" onClick={() => setMobileMenuOpen(false)}>
            📈 Learning Style
          </NavLinkStyled>
        </NavLinks>
        
        <NavActions>
          <ProfileSection 
          onMouseEnter={() => setShowProfileDropdown(true)}
          onMouseLeave={() => setShowProfileDropdown(false)}
        >
          <div className="avatar">
            {userData.name?.charAt(0).toUpperCase() || 'G'}
          </div>
          <div>
            <div style={{ fontWeight: 'bold' }}>{userData.name}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              {userData.learningStyle?.split(' ')[0] || 'Choose Style'}
            </div>
          </div>
          
          {showProfileDropdown && (
            <ProfileDropdown
              onMouseEnter={() => setShowProfileDropdown(true)}
              onMouseLeave={() => setShowProfileDropdown(false)}
            >
              <ProfileHeader>
                <ProfileAvatar>
                  {userData.name?.charAt(0).toUpperCase() || 'G'}
                </ProfileAvatar>
                <ProfileName>{userData.name}</ProfileName>
                <ProfileEmail>{userData.email}</ProfileEmail>
              </ProfileHeader>
              
              <ProfileDetails>
                <ProfileDetailItem>
                  <span className="detail-icon">🎓</span>
                  <div className="detail-content">
                    <div className="detail-label">Learning Style</div>
                    <div className={`detail-value ${userData.learningStyle === 'Not Selected' ? 'na-value' : ''}`}>
                      {userData.learningStyle}
                    </div>
                  </div>
                </ProfileDetailItem>
                
                <ProfileDetailItem>
                  <span className="detail-icon">📅</span>
                  <div className="detail-content">
                    <div className="detail-label">Member Since</div>
                    <div className={`detail-value ${userData.memberSince === 'NA' ? 'na-value' : ''}`}>
                      {userData.memberSince}
                    </div>
                  </div>
                </ProfileDetailItem>
                
                <ProfileDetailItem>
                  <span className="detail-icon">🎯</span>
                  <div className="detail-content">
                    <div className="detail-label">Style Accuracy</div>
                    <div className={`detail-value ${userData.accuracy === 'NA%' ? 'na-value' : ''}`}>
                      {userData.accuracy}
                    </div>
                  </div>
                </ProfileDetailItem>
                
                <ProfileDetailItem>
                  <span className="detail-icon">⭐</span>
                  <div className="detail-content">
                    <div className="detail-label">Level</div>
                    <div className={`detail-value ${userData.level === 'NA' ? 'na-value' : ''}`}>
                      {userData.level}
                    </div>
                  </div>
                </ProfileDetailItem>
                
                <ProfileDetailItem>
                  <span className="detail-icon">🔥</span>
                  <div className="detail-content">
                    <div className="detail-label">Current Streak</div>
                    <div className={`detail-value ${userData.streak === '0 days' ? 'na-value' : ''}`}>
                      {userData.streak}
                    </div>
                  </div>
                </ProfileDetailItem>
                
                <ProfileDetailItem>
                  <span className="detail-icon">🏆</span>
                  <div className="detail-content">
                    <div className="detail-label">Quests Completed</div>
                    <div className={`detail-value ${userData.completedQuests === 'NA' ? 'na-value' : ''}`}>
                      {userData.completedQuests}
                    </div>
                  </div>
                </ProfileDetailItem>
                
                <LogoutButton onClick={handleLogout}>
                  <span>🚪</span>
                  Logout
                </LogoutButton>
              </ProfileDetails>
            </ProfileDropdown>
          )}
        </ProfileSection>
        </NavActions>
      </NavbarContainer>

      <DashboardContainer>
        <ContentWrapper>
          {/* Header Section */}
          <PageHeader>
            <HeaderContent>
              <PageTitle>
                <TitleIcon>
                  <Target size={32} />
                </TitleIcon>
                Your Learning Style Profile: {currentStyle.title}
              </PageTitle>
              <PageSubtitle>
                Complete personality profile based on VARK learning strategies
              </PageSubtitle>
            </HeaderContent>
            <HeaderAction>
              <SecondaryButton onClick={handleTakeQuiz}>
                <Lightbulb size={18} />
                Retake Quiz
              </SecondaryButton>
            </HeaderAction>
          </PageHeader>

          {/* Stats Cards */}
          <StatsGrid>
            <StatCard>
              <StatIcon style={{ background: currentStyle.lightGradient }}>
                <Brain size={24} color={currentStyle.color} />
              </StatIcon>
              <StatContent>
                <StatLabel>Retention Rate</StatLabel>
                <StatValue>{currentStyle.stats.retention}</StatValue>
              </StatContent>
            </StatCard>
            
            <StatCard>
              <StatIcon style={{ background: currentStyle.lightGradient }}>
                <Zap size={24} color={currentStyle.color} />
              </StatIcon>
              <StatContent>
                <StatLabel>Learning Speed</StatLabel>
                <StatValue>{currentStyle.stats.speed}</StatValue>
              </StatContent>
            </StatCard>
            
            <StatCard>
              <StatIcon style={{ background: currentStyle.lightGradient }}>
                <Users size={24} color={currentStyle.color} />
              </StatIcon>
              <StatContent>
                <StatLabel>Population Share</StatLabel>
                <StatValue>{currentStyle.stats.population}</StatValue>
              </StatContent>
            </StatCard>
            
            <StatCard>
              <StatIcon style={{ background: currentStyle.lightGradient }}>
                <Award size={24} color={currentStyle.color} />
              </StatIcon>
              <StatContent>
                <StatLabel>Effectiveness</StatLabel>
                <StatValue>{currentStyle.stats.effectiveness}</StatValue>
              </StatContent>
            </StatCard>
          </StatsGrid>

          {/* Detailed Learning Style Profile - Like 16Personalities */}
          <DetailedProfileContainer style={{ borderLeft: `8px solid ${currentStyle.color}` }}>
            <ProfileHeader>
              <ProfileTitleSection>
                <ProfileIcon style={{ background: currentStyle.gradient }}>
                  {currentStyle.icon}
                </ProfileIcon>
                <ProfileTitleContent>
                  <ProfileMainTitle>{currentStyle.title}</ProfileMainTitle>
                  <ProfileMotto>{currentStyle.motto}</ProfileMotto>
                </ProfileTitleContent>
              </ProfileTitleSection>
              
              <ProfileTabs>
                <ProfileTab 
                  active={activeTab === 'overview'} 
                  onClick={() => setActiveTab('overview')}
                  style={{ color: activeTab === 'overview' ? currentStyle.color : '#666' }}
                >
                  <Book size={18} />
                  Overview
                </ProfileTab>
                <ProfileTab 
                  active={activeTab === 'personality'} 
                  onClick={() => setActiveTab('personality')}
                  style={{ color: activeTab === 'personality' ? currentStyle.color : '#666' }}
                >
                  <User size={18} />
                  Personality
                </ProfileTab>
                <ProfileTab 
                  active={activeTab === 'methods'} 
                  onClick={() => setActiveTab('methods')}
                  style={{ color: activeTab === 'methods' ? currentStyle.color : '#666' }}
                >
                  <TargetIcon size={18} />
                  Methods
                </ProfileTab>
                <ProfileTab 
                  active={activeTab === 'strategies'} 
                  onClick={() => setActiveTab('strategies')}
                  style={{ color: activeTab === 'strategies' ? currentStyle.color : '#666' }}
                >
                  <SettingsIcon size={18} />
                  Strategies
                </ProfileTab>
              </ProfileTabs>
            </ProfileHeader>

            <ProfileContent>
              {activeTab === 'overview' && (
                <OverviewSection>
                  <OverviewHeader>
                    <SectionTitleWithIcon>
                      <BookOpen size={24} color={currentStyle.color} />
                      <h3>Comprehensive Overview</h3>
                    </SectionTitleWithIcon>
                  </OverviewHeader>
                  
                  <OverviewContent>
                    <OverviewDescription>
                      {currentStyle.overview.description}
                    </OverviewDescription>
                    
                    <CoreBeliefCard style={{ borderLeft: `4px solid ${currentStyle.color}` }}>
                      <CoreBeliefTitle>Core Belief</CoreBeliefTitle>
                      <CoreBeliefText>{currentStyle.overview.coreBelief}</CoreBeliefText>
                    </CoreBeliefCard>
                    
                    <LearningPhilosophyCard style={{ borderLeft: `4px solid ${currentStyle.color}` }}>
                      <LearningPhilosophyTitle>Learning Philosophy</LearningPhilosophyTitle>
                      <LearningPhilosophyText>{currentStyle.overview.learningPhilosophy}</LearningPhilosophyText>
                    </LearningPhilosophyCard>
                    
                    {currentStyle.keyWords && (
                      <KeyWordsCard style={{ background: currentStyle.lightGradient }}>
                        <KeyWordsTitle>Key Words</KeyWordsTitle>
                        <KeyWords>{currentStyle.keyWords}</KeyWords>
                      </KeyWordsCard>
                    )}
                    
                    {currentStyle.importantNote && (
                      <ImportantNote style={{ border: `2px solid ${currentStyle.color}` }}>
                        <AlertTriangle size={20} color={currentStyle.color} />
                        <ImportantNoteText>{currentStyle.importantNote}</ImportantNoteText>
                      </ImportantNote>
                    )}
                  </OverviewContent>
                </OverviewSection>
              )}

              {activeTab === 'personality' && (
                <PersonalitySection>
                  <PersonalityGrid>
                    <StrengthsCard style={{ borderTop: `4px solid ${currentStyle.color}` }}>
                      <StrengthsHeader>
                        <ThumbsUp size={24} color={currentStyle.color} />
                        <h3>Strengths & Advantages</h3>
                      </StrengthsHeader>
                      <StrengthsList>
                        {currentStyle.personality.strengths.map((strength, index) => (
                          <StrengthItem key={index}>
                            <CheckCircle size={16} color={currentStyle.color} />
                            <span>{strength}</span>
                          </StrengthItem>
                        ))}
                      </StrengthsList>
                    </StrengthsCard>
                    
                    <ChallengesCard style={{ borderTop: `4px solid ${currentStyle.color}` }}>
                      <ChallengesHeader>
                        <AlertTriangle size={24} color={currentStyle.color} />
                        <h3>Potential Challenges</h3>
                      </ChallengesHeader>
                      <ChallengesList>
                        {currentStyle.personality.challenges.map((challenge, index) => (
                          <ChallengeItem key={index}>
                            <AlertTriangle size={16} color={currentStyle.color} />
                            <span>{challenge}</span>
                          </ChallengeItem>
                        ))}
                      </ChallengesList>
                    </ChallengesCard>
                    
                    <PreferencesCard style={{ borderTop: `4px solid ${currentStyle.color}` }}>
                      <PreferencesHeader>
                        <Star size={24} color={currentStyle.color} />
                        <h3>Natural Preferences</h3>
                      </PreferencesHeader>
                      <PreferencesList>
                        {currentStyle.personality.preferences.map((preference, index) => (
                          <PreferenceItem key={index}>
                            <Star size={16} color={currentStyle.color} />
                            <span>{preference}</span>
                          </PreferenceItem>
                        ))}
                      </PreferencesList>
                    </PreferencesCard>
                    
                    <CharacteristicsCard style={{ borderTop: `4px solid ${currentStyle.color}` }}>
                      <CharacteristicsHeader>
                        <Target size={24} color={currentStyle.color} />
                        <h3>Key Characteristics</h3>
                      </CharacteristicsHeader>
                      <CharacteristicsList>
                        {currentStyle.keyCharacteristics.map((characteristic, index) => (
                          <CharacteristicListItem key={index}>
                            <Target size={16} color={currentStyle.color} />
                            <span>{characteristic}</span>
                          </CharacteristicListItem>
                        ))}
                      </CharacteristicsList>
                    </CharacteristicsCard>
                  </PersonalityGrid>
                </PersonalitySection>
              )}

              {activeTab === 'methods' && (
                <MethodsSection>
                  <MethodsGrid>
                    <MethodCard style={{ borderLeft: `4px solid ${currentStyle.color}` }}>
                      <MethodCardHeader>
                        <Download size={24} color={currentStyle.color} />
                        <h3>Taking In Information</h3>
                      </MethodCardHeader>
                      <MethodCardContent>
                        {currentStyle.methods.takingInformation.map((method, index) => (
                          <MethodItem key={index}>
                            <div style={{ 
                              width: '8px', 
                              height: '8px', 
                              background: currentStyle.color,
                              borderRadius: '50%',
                              marginRight: '12px'
                            }} />
                            <span>{method}</span>
                          </MethodItem>
                        ))}
                      </MethodCardContent>
                    </MethodCard>
                    
                    <MethodCard style={{ borderLeft: `4px solid ${currentStyle.color}` }}>
                      <MethodCardHeader>
                        <Upload size={24} color={currentStyle.color} />
                        <h3>Presenting Information</h3>
                      </MethodCardHeader>
                      <MethodCardContent>
                        {currentStyle.methods.presentingInformation.map((method, index) => (
                          <MethodItem key={index}>
                            <div style={{ 
                              width: '8px', 
                              height: '8px', 
                              background: currentStyle.color,
                              borderRadius: '50%',
                              marginRight: '12px'
                            }} />
                            <span>{method}</span>
                          </MethodItem>
                        ))}
                      </MethodCardContent>
                    </MethodCard>
                    
                    <MethodCard style={{ borderLeft: `4px solid ${currentStyle.color}` }}>
                      <MethodCardHeader>
                        <GraduationCap size={24} color={currentStyle.color} />
                        <h3>Academic Strategies</h3>
                      </MethodCardHeader>
                      <MethodCardContent>
                        {currentStyle.methods.academicStrategies.map((method, index) => (
                          <MethodItem key={index}>
                            <div style={{ 
                              width: '8px', 
                              height: '8px', 
                              background: currentStyle.color,
                              borderRadius: '50%',
                              marginRight: '12px'
                            }} />
                            <span>{method}</span>
                          </MethodItem>
                        ))}
                      </MethodCardContent>
                    </MethodCard>
                    
                    <MethodCard style={{ borderLeft: `4px solid ${currentStyle.color}` }}>
                      <MethodCardHeader>
                        <Briefcase size={24} color={currentStyle.color} />
                        <h3>Professional Applications</h3>
                      </MethodCardHeader>
                      <MethodCardContent>
                        {currentStyle.methods.professionalApplications.map((method, index) => (
                          <MethodItem key={index}>
                            <div style={{ 
                              width: '8px', 
                              height: '8px', 
                              background: currentStyle.color,
                              borderRadius: '50%',
                              marginRight: '12px'
                            }} />
                            <span>{method}</span>
                          </MethodItem>
                        ))}
                      </MethodCardContent>
                    </MethodCard>
                  </MethodsGrid>
                </MethodsSection>
              )}

              {activeTab === 'strategies' && (
                <StrategiesSection>
                  <StrategiesHeader>
                    <SectionTitleWithIcon>
                      <Target size={24} color={currentStyle.color} />
                      <h3>Practical Learning Strategies</h3>
                    </SectionTitleWithIcon>
                    <StrategySubtitle>
                      Based on official VARK strategies for optimal learning
                    </StrategySubtitle>
                  </StrategiesHeader>
                  
                  <StrategyActionCard style={{ background: currentStyle.lightGradient }}>
                    <StrategyActionTitle>Universal VARK Strategy</StrategyActionTitle>
                    <StrategyActionText>
                      <strong>"Reduce 3 pages of your notes to 1"</strong> – This distillation process forces you to identify and retain only the most essential information, benefiting all learning styles.
                    </StrategyActionText>
                  </StrategyActionCard>
                  
                  <StrategyTips>
                    <StrategyTip style={{ border: `2px solid ${currentStyle.color}` }}>
                      <TipNumber>1</TipNumber>
                      <TipContent>
                        <TipTitle>Mix Learning Styles</TipTitle>
                        <TipDescription>
                          Combine your primary style with secondary ones for better retention and understanding
                        </TipDescription>
                      </TipContent>
                    </StrategyTip>
                    
                    <StrategyTip style={{ border: `2px solid ${currentStyle.color}` }}>
                      <TipNumber>2</TipNumber>
                      <TipContent>
                        <TipTitle>Schedule Regular Reviews</TipTitle>
                        <TipDescription>
                          Review material regularly using your preferred learning methods to reinforce memory
                        </TipDescription>
                      </TipContent>
                    </StrategyTip>
                    
                    <StrategyTip style={{ border: `2px solid ${currentStyle.color}` }}>
                      <TipNumber>3</TipNumber>
                      <TipContent>
                        <TipTitle>Teach Others</TipTitle>
                        <TipDescription>
                          Explaining concepts to others reinforces your own understanding and reveals gaps
                        </TipDescription>
                      </TipContent>
                    </StrategyTip>
                    
                    <StrategyTip style={{ border: `2px solid ${currentStyle.color}` }}>
                      <TipNumber>4</TipNumber>
                      <TipContent>
                        <TipTitle>Track Your Progress</TipTitle>
                        <TipDescription>
                          Monitor what works best and adjust your learning strategies accordingly
                        </TipDescription>
                      </TipContent>
                    </StrategyTip>
                  </StrategyTips>
                  
                  <AccessResourceSection>
                    <AccessResourceTitle>Access Complete VARK Strategies</AccessResourceTitle>
                    <AccessResourceDescription>
                      Visit the official VARK website for comprehensive strategies tailored to your learning style
                    </AccessResourceDescription>
                    
                    <AccessResourceButton 
                      href={
                        userLearningStyle === 'visual' ? 'https://vark-learn.com/strategies/visual-strategies/' :
                        userLearningStyle === 'auditory' ? 'https://vark-learn.com/strategies/aural-strategies/' :
                        userLearningStyle === 'read' ? 'https://vark-learn.com/strategies/readwrite-strategies/' :
                        'https://vark-learn.com/strategies/kinesthetic-strategies/'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ background: currentStyle.gradient }}
                    >
                      <ExternalLink size={20} />
                      Visit Official VARK Strategies
                      <ChevronRight size={20} />
                    </AccessResourceButton>
                  </AccessResourceSection>
                </StrategiesSection>
              )}
            </ProfileContent>
          </DetailedProfileContainer>

          {/* Recommended Resources */}
          <Section>
            {/*<SectionHeader>
              <SectionTitle>
                <Zap size={28} />
                Recommended Resources
                <ResourceCount>{recommendations.length}</ResourceCount>
              </SectionTitle>
              <SectionSubtitle>
                Official VARK strategies and resources optimized for your learning style
              </SectionSubtitle>
            </SectionHeader>*/}

            {/*<ResourceGrid>
              {recommendations.map((resource, index) => {
                const isCompleted = completedResources.includes(resource.id);
                
                return (
                  <ResourceCard 
                    key={resource.id}
                    delay={index * 0.1}
                    completed={isCompleted}
                  >
                    <ResourceHeader>
                      <ResourceIcon style={{ background: currentStyle.lightGradient }}>
                        {resource.icon}
                      </ResourceIcon>
                      <ResourceMeta>
                        <ResourceBadge difficulty={resource.difficulty}>
                          {resource.difficulty}
                        </ResourceBadge>
                        <ResourceDuration>
                          <Clock size={14} />
                          {resource.duration}
                        </ResourceDuration>
                      </ResourceMeta>
                    </ResourceHeader>

                    <ResourceContent>
                      <ResourceTitle>{resource.title}</ResourceTitle>
                      <ResourceDescription>{resource.description}</ResourceDescription>
                      
                      <TagContainer>
                        {resource.tags?.map((tag, i) => (
                          <Tag key={i} style={{ background: currentStyle.lightGradient }}>
                            {tag}
                          </Tag>
                        ))}
                      </TagContainer>

                      <ResourceStats>
                        <ResourceStat>
                          <Star size={16} color="#f39c12" />
                          <span>{resource.rating}</span>
                        </ResourceStat>
                        <ResourceStat>
                          <User size={16} color="#64748b" />
                          <span>{resource.students} learners</span>
                        </ResourceStat>
                      </ResourceStats>*/}

                      {/* ACCESS RESOURCE BUTTON */}
                     {/*} {resource.link && (
                        <ResourceActionContainer>
                          <ResourceActionLink 
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ background: currentStyle.gradient }}
                          >
                            <ResourceActionIcon>
                              <ExternalLink size={20} />
                            </ResourceActionIcon>
                            <ResourceActionText>
                              Access VARK Strategies
                            </ResourceActionText>
                            <ResourceActionArrow>
                              →
                            </ResourceActionArrow>
                          </ResourceActionLink>
                        </ResourceActionContainer>
                      )}

                      {resource.progress !== undefined && (
                        <ProgressSection>
                          <ProgressInfo>
                            <ProgressLabel>Progress</ProgressLabel>
                            <ProgressValue>{resource.progress}%</ProgressValue>
                          </ProgressInfo>
                          <ProgressBar>
                            <ProgressFill 
                              progress={resource.progress}
                              style={{ background: currentStyle.gradient }}
                            />
                          </ProgressBar>
                        </ProgressSection>
                      )}
                    </ResourceContent>

                    <ResourceFooter>
                      <ActionButton
                        onClick={() => toggleCompletion(resource.id)}
                        completed={isCompleted}
                        style={{ 
                          background: isCompleted ? '#10b981' : 'transparent',
                          color: isCompleted ? 'white' : '#64748b',
                          borderColor: isCompleted ? '#10b981' : 'rgba(226, 232, 240, 0.5)'
                        }}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle size={18} />
                            Completed
                          </>
                        ) : 'Mark Complete'}
                      </ActionButton>
                      <SecondaryButtonSmall>
                        <Bookmark size={18} />
                        Save
                      </SecondaryButtonSmall>
                    </ResourceFooter>
                  </ResourceCard>
                );
              })}</DashboardContainer>
            </ResourceGrid>*/}
          </Section>
        </ContentWrapper>
      </DashboardContainer>
    </>
  );
};

/* ================= UPDATED STYLES TO MATCH DASHBOARD ================= */
const DashboardContainer = styled.div`
  position: relative;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 100px;
  min-height: calc(100vh - 70px);
  background: #f8f9fa;
`;

const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

/* Quiz Prompt Styles */
const QuizPromptCard = styled.div`
  background: white;
  border-radius: 25px;
  padding: 50px;
  box-shadow: 0 15px 40px rgba(76, 162, 175, 0.2);
  text-align: center;
  animation: ${slideIn} 0.8s ease-out;
  border: 1px solid rgba(76, 162, 175, 0.2);
  margin-top: 50px;
`;

const QuizCardHeader = styled.div`
  margin-bottom: 2rem;
`;

const QuizIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #4ca2af 0%, #91ebe9 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  box-shadow: 0 8px 25px rgba(76, 162, 175, 0.4);
`;

const QuizTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #191818;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const QuizSubtitle = styled.p`
  font-size: 1.3rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.95;
`;

const QuizCardBody = styled.div`
  margin: 2rem 0;
`;

const QuizCardFooter = styled.div`
  margin-top: 2rem;
`;

const BenefitsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const BenefitCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 20px;
  border: 1px solid rgba(76, 162, 175, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 35px rgba(76, 162, 175, 0.15);
    border-color: #4ca2af;
  }
`;

const BenefitIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const BenefitContent = styled.div`
  flex: 1;
  text-align: left;
`;

const BenefitTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: #191818;
  margin-bottom: 0.5rem;
`;

const BenefitDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
`;

/* Main UI Styles */
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const HeaderAction = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    button {
      width: 100%;
    }
  }
`;

const PageTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: #191818;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const TitleIcon = styled.div`
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #4ca2af 0%, #91ebe9 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 25px rgba(76, 162, 175, 0.4);
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  line-height: 1.6;
  opacity: 0.95;
`;

const Highlight = styled.span`
  background: linear-gradient(45deg, #4ca2af, #91ebe9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
`;

/* Stats Grid */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 30px 0;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 25px;
  border: 1px solid rgba(76, 162, 175, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      background: linear-gradient(90deg, #4ca2af, #91ebe9);
    }
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 0.25rem;
  font-weight: 500;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #4ca2af;
`;

/* Detailed Profile Container */
const DetailedProfileContainer = styled.div`
  background: white;
  border-radius: 25px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 0.6s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, ${props => props.style?.borderLeftColor || '#4ca2af'}, transparent);
  }
`;



const ProfileTitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
`;

const ProfileIcon = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  animation: ${float} 6s ease-in-out infinite;
  flex-shrink: 0;
`;

const ProfileTitleContent = styled.div`
  flex: 1;
`;

const ProfileMainTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  margin: 0 0 0.75rem 0;
  line-height: 1.1;
  background: ${props => props.color ? `linear-gradient(45deg, ${props.color}, ${props.color}cc)` : 'linear-gradient(45deg, #4ca2af, #91ebe9)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const ProfileMotto = styled.p`
  font-size: 1.3rem;
  color: #666;
  font-style: italic;
  margin: 0;
  line-height: 1.6;
  opacity: 0.9;
  border-left: 3px solid #4ca2af;
  padding-left: 1rem;
`;

const ProfileTabs = styled.div`
  display: flex;
  gap: 10px;
  border-bottom: 2px solid rgba(76, 162, 175, 0.1);
  padding-bottom: 15px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ProfileTab = styled.button`
  background: ${props => props.active ? 'rgba(76, 162, 175, 0.1)' : 'transparent'};
  color: ${props => props.active ? '#4ca2af' : '#666'};
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: rgba(76, 162, 175, 0.15);
    transform: translateY(-2px);
  }
`;

const ProfileContent = styled.div`
  margin-top: 20px;
`;

/* Overview Section */
const OverviewSection = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const OverviewHeader = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitleWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #191818;
    margin: 0;
  }
`;

const OverviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OverviewDescription = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.7;
  margin: 0;
`;

const CoreBeliefCard = styled.div`
  background: #f8f9fa;
  border-radius: 16px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const CoreBeliefTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: #191818;
  margin-bottom: 0.75rem;
`;

const CoreBeliefText = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
`;

const LearningPhilosophyCard = styled.div`
  background: #f8f9fa;
  border-radius: 16px;
  padding: 1.5rem;
`;

const LearningPhilosophyTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: #191818;
  margin-bottom: 0.75rem;
`;

const LearningPhilosophyText = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
`;

const KeyWordsCard = styled.div`
  border-radius: 16px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const KeyWordsTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: #191818;
  margin-bottom: 0.75rem;
`;

const KeyWords = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  font-weight: 600;
`;

const ImportantNote = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 1.5rem;
  border-radius: 16px;
  margin-top: 1rem;
  background: rgba(243, 156, 18, 0.1);
`;

const ImportantNoteText = styled.p`
  color: #f39c12;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  font-weight: 600;
`;

/* Personality Section */
const PersonalitySection = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const PersonalityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const StrengthsCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const StrengthsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
  
  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #191818;
    margin: 0;
  }
`;

const StrengthsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const StrengthItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  
  span {
    color: #475569;
    line-height: 1.6;
    flex: 1;
    font-size: 1rem;
  }
`;

const ChallengesCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const ChallengesHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
  
  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #191818;
    margin: 0;
  }
`;

const ChallengesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ChallengeItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  
  span {
    color: #475569;
    line-height: 1.6;
    flex: 1;
    font-size: 1rem;
  }
`;

const PreferencesCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const PreferencesHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
  
  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #191818;
    margin: 0;
  }
`;

const PreferencesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const PreferenceItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  
  span {
    color: #475569;
    line-height: 1.6;
    flex: 1;
    font-size: 1rem;
  }
`;

const CharacteristicsCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const CharacteristicsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
  
  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #191818;
    margin: 0;
  }
`;

const CharacteristicsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CharacteristicListItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  
  span {
    color: #475569;
    line-height: 1.6;
    flex: 1;
    font-size: 1rem;
  }
`;

/* Methods Section */
const MethodsSection = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const MethodsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const MethodCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const MethodCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
  
  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #191818;
    margin: 0;
  }
`;

const MethodCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MethodItem = styled.div`
  display: flex;
  align-items: flex-start;
  
  span {
    color: #475569;
    line-height: 1.6;
    flex: 1;
    font-size: 1rem;
  }
`;

/* Strategies Section */
const StrategiesSection = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const StrategiesHeader = styled.div`
  margin-bottom: 2rem;
`;

const StrategySubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-top: 0.5rem;
`;

const StrategyActionCard = styled.div`
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const StrategyActionTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  color: #191818;
  margin-bottom: 0.75rem;
`;

const StrategyActionText = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
`;

const StrategyTips = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StrategyTip = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }
`;

const TipNumber = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.color || '#4ca2af'};
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const TipContent = styled.div`
  flex: 1;
`;

const TipTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: #191818;
  margin-bottom: 0.5rem;
`;

const TipDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`;

const AccessResourceSection = styled.div`
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 20px;
  margin-top: 2rem;
`;

const AccessResourceTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #191818;
  margin-bottom: 0.75rem;
`;

const AccessResourceDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const AccessResourceButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-weight: 700;
  text-decoration: none;
  padding: 16px 32px;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    filter: brightness(1.1);
  }
`;

/* Resources Section */
const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionHeader = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #191818;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ResourceCount = styled.span`
  background: linear-gradient(135deg, #4ca2af 0%, #91ebe9 100%);
  color: white;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  margin-left: 0.5rem;
`;

const SectionSubtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResourceCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.75rem;
  border: 1px solid rgba(76, 162, 175, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${props => props.delay || 0}s;
  opacity: ${props => props.completed ? 0.7 : 1};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: #4ca2af;
  }
`;

const ResourceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const ResourceIcon = styled.div`
  width: 56px;
  height: 56px;
  background: #f8f9fa;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  border: 1px solid rgba(76, 162, 175, 0.2);
`;

const ResourceMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
`;

const ResourceBadge = styled.span`
  padding: 0.35rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  background-color: ${props => 
    props.difficulty === 'Beginner' ? 'rgba(76, 162, 175, 0.1)' :
    props.difficulty === 'Intermediate' ? 'rgba(243, 156, 18, 0.1)' :
    'rgba(231, 76, 60, 0.1)'
  };
  color: ${props => 
    props.difficulty === 'Beginner' ? '#4ca2af' :
    props.difficulty === 'Intermediate' ? '#f39c12' :
    '#e74c3c'
  };
  border: 1px solid ${props => 
    props.difficulty === 'Beginner' ? 'rgba(76, 162, 175, 0.2)' :
    props.difficulty === 'Intermediate' ? 'rgba(243, 156, 18, 0.2)' :
    'rgba(231, 76, 60, 0.2)'
  };
`;

const ResourceDuration = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

const ResourceContent = styled.div`
  margin-bottom: 1.5rem;
`;

const ResourceTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #191818;
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const ResourceDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  padding: 0.35rem 0.85rem;
  color: #475569;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(76, 162, 175, 0.2);
  transition: all 0.2s ease;

  &:hover {
    border-color: #4ca2af;
    transform: translateY(-1px);
  }
`;

const ResourceStats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ResourceStat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #666;
  font-weight: 500;
`;

/* ACCESS RESOURCE BUTTON STYLES */
const ResourceActionContainer = styled.div`
  margin: 20px 0 15px 0;
`;

const ResourceActionLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #4ca2af 0%, #2c7994 100%);
  color: white;
  text-decoration: none;
  padding: 15px 25px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  text-align: left;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    filter: brightness(1.1);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const ResourceActionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const ResourceActionText = styled.div`
  flex: 1;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
`;

const ResourceActionArrow = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  opacity: 0.8;
  transition: transform 0.3s ease;
  
  ${ResourceActionLink}:hover & {
    transform: translateX(5px);
  }
`;

/* Old ResourceLink - kept for reference but not used */
const ResourceLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: white;
  font-weight: 700;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 10px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    filter: brightness(1.1);
  }
`;

const ProgressSection = styled.div`
  margin-top: 1.5rem;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ProgressLabel = styled.span`
  font-size: 0.95rem;
  color: #666;
  font-weight: 500;
`;

const ProgressValue = styled.span`
  font-size: 0.95rem;
  font-weight: 700;
  color: #191818;
`;

const ProgressBar = styled.div`
  height: 8px;
  background: rgba(76, 162, 175, 0.2);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  border-radius: 4px;
  transition: width 0.5s ease;
`;

const ResourceFooter = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.85rem 1.5rem;
  background: ${props => props.completed ? '#10b981' : 'transparent'};
  color: ${props => props.completed ? 'white' : '#666'};
  border: 2px solid ${props => props.completed ? '#10b981' : 'rgba(76, 162, 175, 0.2)'};
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.completed ? '#059669' : '#f8f9fa'};
    transform: translateY(-2px);
    border-color: ${props => props.completed ? '#059669' : '#4ca2af'};
  }
`;

const SecondaryButtonSmall = styled.button`
  padding: 0.85rem 1.25rem;
  background: transparent;
  color: #666;
  border: 2px solid rgba(76, 162, 175, 0.2);
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
    border-color: #4ca2af;
  }
`;

/* Button Styles */
const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #4ca2af 0%, #2c7994 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(76, 162, 175, 0.3);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(76, 162, 175, 0.4);
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: #4ca2af;
  border: 2px solid #4ca2af;
  border-radius: 50px;
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #4ca2af;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 162, 175, 0.3);
  }
`;

const RefreshButton = styled.button`
  background: linear-gradient(135deg, #f39c12 0%, #d97706 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.85rem 1.75rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(243, 156, 18, 0.4);
  }
`;

/* Add missing icons */
const Upload = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const GraduationCap = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const Briefcase = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const ExternalLink = ({ size, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default Learning;