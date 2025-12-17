import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';

// Fun animations
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

const slideInFromRight = keyframes`
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInFromLeft = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Styled Components
const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #4ca2af;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(76, 162, 175, 0.1);
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    
    ${StatNumber} {
      animation: ${pulse} 0.5s ease;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #4ca2af, #91ebe9);
  }
`;

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1300px;
  margin: 0 auto;
  padding-top: 100px;
`;

const NavBar = styled.nav`
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
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  h1 {
    color: white;
    font-size: 1.8rem;
    margin: 0;
    font-weight: 700;
    background: linear-gradient(45deg, #fff, #91ebe9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${pulse} 3s ease-in-out infinite;
  }
  
  .logo-icon {
    width: 40px;
    height: 40px;
    object-fit: contain;
    animation: ${float} 6s ease-in-out infinite;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`;

const NavButton = styled(NavLink)`
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
    animation: ${pulse} 4s ease-in-out infinite;
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
  animation: ${fadeIn} 0.3s ease-out;
  
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

const WelcomeSection = styled.section`
  background: linear-gradient(135deg, #4ca2af 0%, #91ebe9 100%);
  border-radius: 25px;
  padding: 50px;
  margin-bottom: 40px;
  box-shadow: 0 15px 40px rgba(76, 162, 175, 0.3);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 0.8s ease-out;
  
  &::before {
    content: '✨';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 3rem;
    opacity: 0.3;
    animation: ${float} 4s ease-in-out infinite;
  }
  
  &::after {
    content: '🌟';
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 2.5rem;
    opacity: 0.3;
    animation: ${float} 5s ease-in-out infinite 1s;
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 2s ease-in-out infinite;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.95;
  max-width: 700px;
  margin: 0 auto 30px;
  line-height: 1.6;
`;

const Confetti = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.7;
  
  &:nth-child(1) { top: 10%; left: 10%; animation: ${float} 3s infinite; }
  &:nth-child(2) { top: 20%; right: 15%; animation: ${float} 4s infinite 0.5s; }
  &:nth-child(3) { bottom: 30%; left: 20%; animation: ${float} 3.5s infinite 1s; }
  &:nth-child(4) { bottom: 20%; right: 25%; animation: ${float} 4.5s infinite 1.5s; }
`;

const LearningStyleCard = styled.div`
  background: white;
  border-radius: 25px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-left: 8px solid ${props => props.color || '#4ca2afff'};
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 0.6s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, ${props => props.color || '#4ca2af'}, transparent);
  }
`;

const CardTitle = styled.h2`
  color: #191818;
  margin-bottom: 25px;
  font-size: 2.2rem;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CardIcon = styled.span`
  font-size: 2.5rem;
  animation: ${float} 4s ease-in-out infinite;
`;

const StyleDescription = styled.p`
  color: #555;
  line-height: 1.7;
  margin-bottom: 25px;
  font-size: 1.2rem;
  background: linear-gradient(45deg, #333, #555);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CharacteristicsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 25px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
`;

const CharacteristicItem = styled.li`
  padding: 15px;
  background: ${props => props.color ? `${props.color}15` : '#f8f9fa'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateX(10px);
    background: ${props => props.color ? `${props.color}25` : '#f0f0f0'};
  }
  
  &::before {
    content: '✨';
    color: ${props => props.color || '#4ca2afff'};
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const RecommendationsSection = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  padding: 30px;
  margin-top: 30px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '💡';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2rem;
    opacity: 0.2;
  }
`;

const RecommendationsTitle = styled.h3`
  color: #191818;
  margin-bottom: 20px;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &::before {
    content: '🚀';
    font-size: 1.4rem;
  }
`;

const RecommendationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 25px;
`;

const RecommendationCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.color || '#4ca2afff'};
    
    &::after {
      content: '👉';
      position: absolute;
      right: 20px;
      bottom: 20px;
      font-size: 1.2rem;
      animation: ${pulse} 1s infinite;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || '#4ca2afff'};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 50px 0;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const ActionButton = styled(NavLink)`
  background: ${props => props.primary ? 'linear-gradient(135deg, #4ca2af, #2c7994)' : 'white'};
  color: ${props => props.primary ? 'white' : '#4ca2af'};
  border: 2px solid #4ca2af;
  padding: 18px 30px;
  border-radius: 15px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(76, 162, 175, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  .icon {
    font-size: 1.5rem;
  }
`;

// Learning Styles Slider Components
const LearningStylesSlider = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 25px;
  padding: 30px;
  margin: 40px 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #4ca2af, #91ebe9, #8e44ad, #e74c3c, #f39c12);
  }
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h2 {
    color: #191818;
    font-size: 2rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 15px;
    
    &::before {
      content: '🎭';
      font-size: 2rem;
      animation: ${pulse} 2s infinite;
    }
  }
`;

const SliderControls = styled.div`
  display: flex;
  gap: 10px;
`;

const SliderButton = styled.button`
  background: white;
  border: 2px solid #4ca2af;
  color: #4ca2af;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #4ca2af;
    color: white;
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(76, 162, 175, 0.3);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    
    &:hover 
      background: white;
      color: #4ca2af;
      transform: none;
      box-shadow: none;
    }
  }
`;

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  height: 320px;
`;

const SliderTrack = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => props.$translateX}%);
`;

const StyleSlide = styled.div`
  min-width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${props => props.$bgColor || 'white'};
  border-radius: 20px;
  animation: ${props => props.$direction === 'next' ? slideInFromRight : slideInFromLeft} 0.5s ease-out;
  
  &.active {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const StyleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const StyleIcon = styled.div`
  font-size: 3rem;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => props.$delay || '0s'};
`;

const SlideTitle = styled.h3`
  font-size: 2rem;
  color: ${props => props.$color || '#191818'};
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SlideDescription = styled.p`
  color: ${props => props.$color ? `${props.$color}dd` : '#555'};
  line-height: 1.6;
  font-size: 1.1rem;
  margin-bottom: 20px;
  flex-grow: 1;
`;

const StyleStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 15px;
`;

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 18px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  
  .stat-icon {
    font-size: 1.2rem;
  }
  
  .stat-text {
    font-weight: 600;
  }
`;

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? '#4ca2af' : '#ddd'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  
  &:hover {
    background: ${props => props.$active ? '#4ca2af' : '#bbb'};
    transform: scale(1.3);
  }
`;

// Learning style data
const learningStyles = {
  visual: {
    title: "🎨 Visual Explorer",
    icon: "👁️✨",
    color: "#4ca2af",
    description: "You're a visual explorer who learns best through seeing and observing! Create your own visual universe of knowledge with colors, diagrams, and mind maps.",
    characteristics: [
      "Transform information into colorful mind maps 🌈",
      "Remember faces and images better than names 📸",
      "Create visual stories to connect ideas 📖",
      "Use emojis and symbols in notes 🎯",
      "Benefit from colorful diagrams and infographics 📊"
    ],
    recommendations: [
      {
        title: "🎨 Create Mind Maps",
        description: "Design beautiful visual diagrams to connect ideas creatively"
      },
      {
        title: "🎥 Watch Educational Videos",
        description: "Learn through engaging animations and documentaries"
      },
      {
        title: "🌈 Color Code Everything",
        description: "Use rainbow colors to organize and remember information"
      },
      {
        title: "📊 Visual Storytelling",
        description: "Turn concepts into visual stories and comics"
      }
    ]
  },
  auditory: {
    title: "🎵 Sound Maestro",
    icon: "👂🎶",
    color: "#8e44ad",
    description: "You're a sound maestro who learns best through listening and rhythm! Turn learning into a symphony of knowledge with music and conversations.",
    characteristics: [
      "Remember melodies and rhythms easily 🎵",
      "Create learning songs and raps 🎤",
      "Excel in group discussions and debates 💬",
      "Use rhythm to memorize facts 🥁",
      "Turn notes into podcasts or audio stories 🎙️"
    ],
    recommendations: [
      {
        title: "🎧 Record & Listen",
        description: "Create your own educational podcasts and listen on the go"
      },
      {
        title: "🎤 Learning Karaoke",
        description: "Turn facts into songs and have fun singing them"
      },
      {
        title: "💬 Discussion Groups",
        description: "Join lively learning discussions and debates"
      },
      {
        title: "🎶 Rhyme Time",
        description: "Create catchy rhymes to remember complex information"
      }
    ]
  },
  kinesthetic: {
    title: "🤸 Movement Master",
    icon: "🖐️⚡",
    color: "#e74c3c",
    description: "You're a movement master who learns by doing and experiencing! Turn learning into an exciting physical adventure full of action and discovery.",
    characteristics: [
      "Learn best through hands-on projects 🔧",
      "Remember experiences and experiments 🧪",
      "Create learning games and activities 🎮",
      "Use movement to boost memory 💃",
      "Build models to understand concepts 🏗️"
    ],
    recommendations: [
      {
        title: "🛠️ Hands-on Projects",
        description: "Build, create, and learn through exciting projects"
      },
      {
        title: "🎮 Learning Games",
        description: "Turn study sessions into interactive games"
      },
      {
        title: "💃 Movement Breaks",
        description: "Incorporate dance and movement into learning"
      },
      {
        title: "🏗️ Model Building",
        description: "Construct physical models to understand concepts"
      }
    ]
  },
  reading: {
    title: "📚 Word Wizard",
    icon: "📚✨",
    color: "#f39c12",
    description: "You're a word wizard who masters knowledge through reading and writing! Create your own library of wisdom with stories, notes, and creative writing.",
    characteristics: [
      "Create beautiful, organized notes 📝",
      "Write stories to explain concepts 📖",
      "Design creative learning journals 🎨",
      "Turn information into poems or stories ✍️",
      "Build your personal knowledge library 🏛️"
    ],
    recommendations: [
      {
        title: "📝 Creative Journaling",
        description: "Design beautiful learning journals with notes and drawings"
      },
      {
        title: "📖 Story Writing",
        description: "Turn concepts into engaging stories and narratives"
      },
      {
        title: "✍️ Rewrite & Remix",
        description: "Rewrite information in fun and creative ways"
      },
      {
        title: "🏛️ Knowledge Library",
        description: "Build your personal digital or physical library"
      }
    ]
  }
};

function Dashboard() {
  const [userLearningStyle, setUserLearningStyle] = useState('visual');
  const [progress, setProgress] = useState(85);
  const [userName, setUserName] = useState('Explorer');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedStyle = localStorage.getItem('learningStyle') || 'visual';
    const savedProgress = localStorage.getItem('learningProgress') || 85;
    const savedName = localStorage.getItem('userName') || 'Explorer';
    
    setUserLearningStyle(savedStyle);
    setProgress(parseInt(savedProgress));
    setUserName(savedName);
  }, []);
  
  const currentStyle = learningStyles[userLearningStyle];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    localStorage.removeItem('learningStyle');
    localStorage.removeItem('learningProgress');
    navigate('/');
  };

  // Slider functions
  const nextSlide = () => {
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev + 1) % Object.keys(learningStyles).length);
  };

  const prevSlide = () => {
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + Object.keys(learningStyles).length) % Object.keys(learningStyles).length);
  };

  const goToSlide = (index) => {
    setSlideDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
  };

  const getSlideStats = (styleKey) => {
    const stats = {
      visual: { 
        accuracy: '92%', 
        strength: 'High', 
        tips: 8, 
        feature: 'Visual memory',
        popularity: '30% of learners'
      },
      auditory: { 
        accuracy: '85%', 
        strength: 'Medium-High', 
        tips: 6, 
        feature: 'Rhythmic learning',
        popularity: '25% of learners'
      },
      kinesthetic: { 
        accuracy: '78%', 
        strength: 'Medium', 
        tips: 7, 
        feature: 'Hands-on approach',
        popularity: '20% of learners'
      },
      reading: { 
        accuracy: '88%', 
        strength: 'High', 
        tips: 9, 
        feature: 'Text processing',
        popularity: '25% of learners'
      }
    };
    return stats[styleKey];
  };

  const getRandomEmail = () => {
    const domains = ['@learner.com', '@student.edu', '@knowledge.ai', '@questmail.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${userName.toLowerCase().replace(/\s+/g, '')}${randomDomain}`;
  };

  const getUserData = () => {
    const joinedDate = new Date();
    joinedDate.setDate(joinedDate.getDate() - Math.floor(Math.random() * 30));
    
    return {
      name: userName,
      email: getRandomEmail(),
      learningStyle: currentStyle.title,
      memberSince: joinedDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      }),
      accuracy: `${progress}%`,
      completedQuests: 24,
      streak: 7,
      level: Math.floor(progress / 20) + 1
    };
  };

  const userData = getUserData();

  // Get the learning styles in order for the slider
  const learningStylesArray = Object.entries(learningStyles);

  return (
    <>
      <NavBar>
        <Logo>
          <img 
            src="/logo225.png" 
            alt="LearnQuest AI Logo" 
            className="logo-icon" 
          />
          <h1>LearnQuest</h1>
        </Logo>
        
        <NavLinks>
          <NavButton to="/dashboard">
            🏠 Dashboard
          </NavButton>
          <NavButton to="/learning">
            🎯 Learning
          </NavButton>
          <NavButton to="/todo" end>
            ✅ To-Do List
          </NavButton>
          <NavButton to="/notes">
            📓 Notes
          </NavButton>
          <NavButton to="/home">
            📈 Learning Style
          </NavButton>
        </NavLinks>
        
        <ProfileSection 
          onMouseEnter={() => setShowProfileDropdown(true)}
          onMouseLeave={() => setShowProfileDropdown(false)}
        >
          <div className="avatar">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 'bold' }}>{userName}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              {currentStyle.title.split(' ')[0]}
            </div>
          </div>
          
          {showProfileDropdown && (
            <ProfileDropdown
              onMouseEnter={() => setShowProfileDropdown(true)}
              onMouseLeave={() => setShowProfileDropdown(false)}
            >
              <ProfileHeader>
                <ProfileAvatar>
                  {userName.charAt(0).toUpperCase()}
                </ProfileAvatar>
                <ProfileName>{userData.name}</ProfileName>
                <ProfileEmail>{userData.email}</ProfileEmail>
              </ProfileHeader>
              
              <ProfileDetails>
                <ProfileDetailItem>
                  <span className="detail-icon">🎓</span>
                  <div className="detail-content">
                    <div className="detail-label">Learning Style</div>
                    <div className="detail-value">{userData.learningStyle}</div>
                  </div>
                </ProfileDetailItem>
                
                <ProfileDetailItem>
                  <span className="detail-icon">📅</span>
                  <div className="detail-content">
                    <div className="detail-label">Member Since</div>
                    <div className="detail-value">{userData.memberSince}</div>
                  </div>
                </ProfileDetailItem>
                
                <ProfileDetailItem>
                  <span className="detail-icon">🎯</span>
                  <div className="detail-content">
                    <div className="detail-label">Style Accuracy</div>
                    <div className="detail-value">{userData.accuracy}</div>
                  </div>
                </ProfileDetailItem>
                
                <ProfileDetailItem>
                  <span className="detail-icon">⭐</span>
                  <div className="detail-content">
                    <div className="detail-label">Level</div>
                    <div className="detail-value">{userData.level}</div>
                  </div>
                </ProfileDetailItem>
                
                <ProfileDetailItem>
                  <span className="detail-icon">🔥</span>
                  <div className="detail-content">
                    <div className="detail-label">Current Streak</div>
                    <div className="detail-value">{userData.streak} days</div>
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
      </NavBar>

      <DashboardContainer>
        <WelcomeSection>
          <Confetti />
          <Confetti />
          <Confetti />
          <Confetti />
          <WelcomeTitle>Welcome, {userName}! 🎉</WelcomeTitle>
          <WelcomeSubtitle>
            Ready for today's learning adventure? Your journey to mastering 
            knowledge just got more exciting with personalized recommendations!
          </WelcomeSubtitle>
          <ActionButton 
            primary 
            to="/todo"
            style={{ display: 'inline-flex', padding: '15px 40px' }}
          >
            <span className="icon">🚀</span>
            Start Today's Mission
          </ActionButton>
        </WelcomeSection>

        {/* Learning Styles Slider */}
        <LearningStylesSlider>
          <SliderHeader>
            <h2>Explore All Learning Styles</h2>
            <SliderControls>
              <SliderButton onClick={prevSlide} disabled={currentSlide === 0}>
                ←
              </SliderButton>
              <SliderButton onClick={nextSlide} disabled={currentSlide === learningStylesArray.length - 1}>
                →
              </SliderButton>
            </SliderControls>
          </SliderHeader>
          
          <SliderContainer>
            <SliderTrack $translateX={-currentSlide * 100}>
              {learningStylesArray.map(([key, style], index) => {
                const stats = getSlideStats(key);
                const isActive = index === currentSlide;
                
                return (
                  <StyleSlide 
                    key={key}
                    $bgColor={`${style.color}10`}
                    $direction={slideDirection}
                    className={isActive ? 'active' : ''}
                  >
                    <StyleHeader>
                      <StyleIcon $delay={`${index * 0.5}s`}>
                        {style.icon}
                      </StyleIcon>
                      <SlideTitle $color={style.color}>
                        {style.title}
                      </SlideTitle>
                    </StyleHeader>
                    
                    <SlideDescription $color={style.color}>
                      {style.description}
                    </SlideDescription>
                    
                    <StyleStats>
                      <StatItem>
                        <span className="stat-icon">🎯</span>
                        <div>
                          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Typical Accuracy</div>
                          <div className="stat-text">{stats.accuracy}</div>
                        </div>
                      </StatItem>
                      
                      <StatItem>
                        <span className="stat-icon">💪</span>
                        <div>
                          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Learning Strength</div>
                          <div className="stat-text">{stats.strength}</div>
                        </div>
                      </StatItem>
                      
                      <StatItem>
                        <span className="stat-icon">📊</span>
                        <div>
                          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Popularity</div>
                          <div className="stat-text">{stats.popularity}</div>
                        </div>
                      </StatItem>
                      
                      <StatItem>
                        <span className="stat-icon">💡</span>
                        <div>
                          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Key Feature</div>
                          <div className="stat-text">{stats.feature}</div>
                        </div>
                      </StatItem>
                    </StyleStats>
                  </StyleSlide>
                );
              })}
            </SliderTrack>
          </SliderContainer>
          
          <SliderDots>
            {learningStylesArray.map((_, index) => (
              <Dot
                key={index}
                $active={index === currentSlide}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </SliderDots>
        </LearningStylesSlider>

        <LearningStyleCard color={currentStyle.color} delay="0.1s">
          <CardTitle>
            <CardIcon>{currentStyle.icon}</CardIcon>
            {currentStyle.title}
          </CardTitle>
          
          <StyleDescription>
            {currentStyle.description}
          </StyleDescription>
          
          <CharacteristicsList>
            {currentStyle.characteristics.map((char, index) => (
              <CharacteristicItem key={index} color={currentStyle.color}>
                {char}
              </CharacteristicItem>
            ))}
          </CharacteristicsList>
          
          <RecommendationsSection>
            <RecommendationsTitle>Your Adventure Toolkit</RecommendationsTitle>
            <RecommendationGrid>
              {currentStyle.recommendations.map((rec, index) => (
                <RecommendationCard key={index} color={currentStyle.color}>
                  <h4 style={{ color: currentStyle.color, marginBottom: '15px', fontSize: '1.3rem' }}>
                    {rec.title}
                  </h4>
                  <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6' }}>
                    {rec.description}
                  </p>
                </RecommendationCard>
              ))}
            </RecommendationGrid>
          </RecommendationsSection>
        </LearningStyleCard>

        {/*<StatsGrid>
          <StatCard>
            <StatNumber>{progress}%</StatNumber>
            <StatLabel>Style Accuracy Score</StatLabel>
            <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#4ca2af' }}>
              🎯 High Precision
            </div>
          </StatCard>
          
          <StatCard>
            <StatNumber>{Object.keys(learningStyles).length}</StatNumber>
            <StatLabel>Learning Adventures</StatLabel>
            <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#4ca2af' }}>
              🌟 Explore All Styles
            </div>
          </StatCard>
          
          <StatCard>
            <StatNumber>24</StatNumber>
            <StatLabel>Quests Completed</StatLabel>
            <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#4ca2af' }}>
              ⚡ Active Streak: 7 days
            </div>
          </StatCard>
          
          <StatCard>
            <StatNumber>15</StatNumber>
            <StatLabel>Power-ups Unlocked</StatLabel>
            <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#4ca2af' }}>
              🎁 New Unlocks Available
            </div>
          </StatCard>
        </StatsGrid>*/}

        <LearningStyleCard delay="0.2s">
          <CardTitle>🎭 Discover Other Learning Personalities</CardTitle>
          <StyleDescription>
            Each learning style is a unique superpower! Explore other styles to 
            become a versatile learning superhero.
          </StyleDescription>
          
          <RecommendationGrid>
            {Object.entries(learningStyles)
              .filter(([key]) => key !== userLearningStyle)
              .map(([key, style]) => (
                <RecommendationCard 
                  key={key}
                  style={{ borderTop: `4px solid ${style.color}` }}
                >
                  <h4 style={{ color: style.color, marginBottom: '15px', fontSize: '1.4rem' }}>
                    {style.icon} {style.title.split(' ')[0]}
                  </h4>
                  <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '20px' }}>
                    {style.description.substring(0, 100)}...
                  </p>
                  <ActionButton 
                    to="/learning" 
                    style={{ 
                      fontSize: '1rem',
                      padding: '10px 20px',
                      width: '100%'
                    }}
                  >
                    <span className="icon">🔍</span>
                    Try This Style
                  </ActionButton>
                </RecommendationCard>
              ))}
          </RecommendationGrid>
        </LearningStyleCard>
        
        <QuickActions>
          <ActionButton to="/learning">
            <span className="icon">🎯</span>
            Start Learning Quest
          </ActionButton>
          <ActionButton to="/notes">
            <span className="icon">📓</span>
            View My Notes
          </ActionButton>
          <ActionButton to="/todo" primary>
            <span className="icon">✅</span>
            Open To-Do List
          </ActionButton>
        </QuickActions>
      </DashboardContainer>
    </>
  );
}

export default Dashboard;