import { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
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
      ${css`animation: ${pulse} 0.5s ease;`}
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
  position: relative;
  padding: 20px;
  width: 1400px;
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
    ${css`animation: ${pulse} 3s ease-in-out infinite;`}
  }
  
  .logo-icon {
    width: 40px;
    height: 40px;
    object-fit: contain;
    ${css`animation: ${float} 6s ease-in-out infinite;`}
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
  ${css`animation: ${slideIn} 0.8s ease-out;`}
  
  &::before {
    content: '✨';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 3rem;
    opacity: 0.3;
    ${css`animation: ${float} 4s ease-in-out infinite;`}
  }
  
  &::after {
    content: '🌟';
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 2.5rem;
    opacity: 0.3;
    ${css`animation: ${float} 5s ease-in-out infinite 1s;`}
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  ${css`animation: ${pulse} 2s ease-in-out infinite;`}
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
  
  &:nth-child(1) { 
    top: 10%; 
    left: 10%; 
    ${css`animation: ${float} 3s infinite;`}
  }
  &:nth-child(2) { 
    top: 20%; 
    right: 15%; 
    ${css`animation: ${float} 4s infinite 0.5s;`}
  }
  &:nth-child(3) { 
    bottom: 30%; 
    left: 20%; 
    ${css`animation: ${float} 3.5s infinite 1s;`}
  }
  &:nth-child(4) { 
    bottom: 20%; 
    right: 25%; 
    ${css`animation: ${float} 4.5s infinite 1.5s;`}
  }
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
  ${props => css`animation: ${slideIn} 0.6s ease-out ${props.delay || '0s'};`}
  
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
  ${css`animation: ${float} 4s ease-in-out infinite;`}
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
      ${css`animation: ${pulse} 1s infinite;`}
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

// Learning Styles Slider Components - FIXED VERSION
const LearningStylesSlider = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 25px;
  padding: 40px;
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
    font-size: 2.2rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 15px;
    
    &::before {
      content: '🎭';
      font-size: 2rem;
      ${css`animation: ${pulse} 2s infinite;`}
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
    
    &:hover {
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
  height: 500px;
  width: 100%;
  background: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
`;

const SliderTrack = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => props.$translateX || 0}%);
  width: ${props => props.$slideCount * 100}%;
`;

const StyleSlide = styled.div`
  min-width: calc(100% / ${props => props.$slideCount});
  width: calc(100% / ${props => props.$slideCount});
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${props => props.$bgColor || 'white'};
  border-radius: 20px;
  ${props => props.$direction === 'next' 
    ? css`animation: ${slideInFromRight} 0.5s ease-out;` 
    : css`animation: ${slideInFromLeft} 0.5s ease-out;`
  }
  
  &.active {
    box-shadow: inset 0 0 0 3px rgba(76, 162, 175, 0.2);
  }
`;

const StyleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const StyleIcon = styled.div`
  font-size: 3.5rem;
  ${props => css`animation: ${float} 4s ease-in-out infinite ${props.$delay || '0s'};`}
`;

const SlideTitle = styled.h3`
  font-size: 2.2rem;
  color: ${props => props.$color || '#191818'};
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SlideDescription = styled.p`
  color: ${props => props.$color ? `${props.$color}dd` : '#555'};
  line-height: 1.7;
  font-size: 1.2rem;
  margin-bottom: 30px;
  flex-grow: 1;
`;

const StyleStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin: 20px;
`;

const StatItem = styled.div`
  background: ${props => props.$color ? `${props.$color}15` : 'rgba(255, 255, 255, 0.2)'};
  padding: 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1rem;
  border-left: 4px solid ${props => props.$color || '#4ca2af'};
  
  .stat-icon {
    font-size: 1.5rem;
    color: ${props => props.$color || '#4ca2af'};
  }
  
  .stat-content {
    flex: 1;
  }
  
  .stat-label {
    font-size: 0.85rem;
    color: ${props => props.$color ? `${props.$color}aa` : '#666'};
    margin-bottom: 5px;
    font-weight: 500;
  }
  
  .stat-text {
    font-weight: 700;
    color: ${props => props.$color || '#333'};
    font-size: 1.1rem;
  }
`;

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 35px;
`;

const Dot = styled.button`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? '#4ca2af' : '#ddd'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  
  &:hover {
    background: ${props => props.$active ? '#4ca2af' : '#bbb'};
    transform: scale(1.4);
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
  const [userLearningStyle, setUserLearningStyle] = useState(null);
  const [progress, setProgress] = useState(85);
  const [userName, setUserName] = useState('Explorer');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const [selectedStyleForDetails, setSelectedStyleForDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Try to get data from localStorage (acting as our DB)
    const savedStyle = localStorage.getItem('learningStyle');
    const savedProgress = localStorage.getItem('learningProgress') || 85;
    const savedName = localStorage.getItem('userName') || 'Explorer';
    
    // If no style is saved, don't default to visual - let the user choose
    setUserLearningStyle(savedStyle);
    setProgress(parseInt(savedProgress));
    setUserName(savedName);
    setIsLoading(false);
  }, []);
  
  // Get current style or fallback to first style for display purposes
  const currentStyle = userLearningStyle 
    ? learningStyles[userLearningStyle] 
    : learningStyles.visual; // Show visual only as a fallback for display

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

  // Function to show style details modal
  const showStyleDetails = (styleKey, style) => {
    setSelectedStyleForDetails({
      key: styleKey,
      ...style
    });
  };

  // Function to close style details
  const closeStyleDetails = () => {
    setSelectedStyleForDetails(null);
  };

  // Function to save learning style
  const saveLearningStyle = (styleKey) => {
    localStorage.setItem('learningStyle', styleKey);
    setUserLearningStyle(styleKey);
    alert(`${learningStyles[styleKey]?.title || 'Learning style'} has been set as your primary learning style!`);
  };

  // Function to navigate to learning page with selected style
  const navigateToLearning = (styleKey) => {
    localStorage.setItem('tempLearningStyle', styleKey);
    navigate('/learning', { 
      state: { 
        selectedStyle: styleKey,
        styleDetails: learningStyles[styleKey]
      }
    });
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
    return stats[styleKey] || stats.visual;
  };

  // Helper function to get data from localStorage or return "NA"
  const getDataOrNA = (key, defaultValue = 'NA') => {
    const data = localStorage.getItem(key);
    return data ? data : defaultValue;
  };

  // Get user data with "NA" fallback
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

  // Get the learning styles in order for the slider
  const learningStylesArray = Object.entries(learningStyles);

  // Safe function to get style title for display
  const getStyleTitleForDisplay = () => {
    if (!currentStyle || !currentStyle.title) return 'Explorer';
    const titleParts = currentStyle.title.split(' ');
    return titleParts.length > 1 ? titleParts[1] : currentStyle.title;
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '50px',
          background: 'white',
          borderRadius: '25px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '20px'
          }}>
            🎓
          </div>
          <h2 style={{ color: '#4ca2af', marginBottom: '10px' }}>
            Loading Your Learning Dashboard...
          </h2>
          <p style={{ color: '#666' }}>
            Preparing your personalized learning experience
          </p>
        </div>
      </div>
    );
  }

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
      </NavBar>

      <DashboardContainer>
        <WelcomeSection>
          <Confetti />
          <Confetti />
          <Confetti />
          <Confetti />
          <WelcomeTitle>Welcome, {userData.name}! 🎉</WelcomeTitle>
          <WelcomeSubtitle>
            {userLearningStyle 
              ? `Ready for today's learning adventure as a ${getStyleTitleForDisplay()}!`
              : "Let's discover your unique learning style! Explore different styles below."
            }
          </WelcomeSubtitle>
          <ActionButton 
            primary 
            to="/home"
            style={{ display: 'inline-flex', padding: '15px 40px' }}
          >
            <span className="icon">🚀</span>
            {userLearningStyle ? "Start Today's Mission" : "Explore Learning Styles"}
          </ActionButton>
        </WelcomeSection>

        {/* Learning Styles Slider - FIXED VERSION */}
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
            <SliderTrack 
              $translateX={-currentSlide * (100 / learningStylesArray.length)} 
              $slideCount={learningStylesArray.length}
            >
              {learningStylesArray.map(([key, style], index) => {
                const stats = getSlideStats(key);
                const isActive = index === currentSlide;
                
                return (
                  <StyleSlide 
                    key={key}
                    $bgColor={`${style.color}08`}
                    $direction={slideDirection}
                    $slideCount={learningStylesArray.length}
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
                      <StatItem $color={style.color}>
                        <span className="stat-icon">🎯</span>
                        <div className="stat-content">
                          <div className="stat-label">Typical Accuracy</div>
                          <div className="stat-text">{stats.accuracy}</div>
                        </div>
                      </StatItem>
                      
                      <StatItem $color={style.color}>
                        <span className="stat-icon">💪</span>
                        <div className="stat-content">
                          <div className="stat-label">Learning Strength</div>
                          <div className="stat-text">{stats.strength}</div>
                        </div>
                      </StatItem>
                      
                      <StatItem $color={style.color}>
                        <span className="stat-icon">📊</span>
                        <div className="stat-content">
                          <div className="stat-label">Popularity</div>
                          <div className="stat-text">{stats.popularity}</div>
                        </div>
                      </StatItem>
                      
                      <StatItem $color={style.color}>
                        <span className="stat-icon">💡</span>
                        <div className="stat-content">
                          <div className="stat-label">Key Feature</div>
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

        {/* Only show current style card if user has selected a style */}
        {userLearningStyle && currentStyle ? (
          <LearningStyleCard color={currentStyle.color} delay="0.1s">
            <CardTitle>
              <CardIcon>{currentStyle.icon}</CardIcon>
              Your Learning Style: {currentStyle.title}
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
        ) : (
          // Show this card when no style is selected
          <LearningStyleCard color="#4ca2af" delay="0.1s">
            <CardTitle>
              <CardIcon>🔍</CardIcon>
              Discover Your Learning Style
            </CardTitle>
            
            <StyleDescription>
              You haven't selected a learning style yet. Explore different styles above and choose one that resonates with you!
              Each style offers unique advantages and personalized learning strategies.
            </StyleDescription>
            
            <CharacteristicsList>
              <CharacteristicItem color="#4ca2af">
                Browse through 4 different learning styles
              </CharacteristicItem>
              <CharacteristicItem color="#8e44ad">
                View detailed statistics and features for each
              </CharacteristicItem>
              <CharacteristicItem color="#e74c3c">
                Click "Try This Style" to experience it
              </CharacteristicItem>
              <CharacteristicItem color="#f39c12">
                Set your preferred style as default anytime
              </CharacteristicItem>
            </CharacteristicsList>
            
            <RecommendationsSection>
              <RecommendationsTitle>How to Choose Your Style</RecommendationsTitle>
              <RecommendationGrid>
                <RecommendationCard color="#4ca2af">
                  <h4 style={{ color: '#4ca2af', marginBottom: '15px', fontSize: '1.3rem' }}>
                    🎭 Explore All Options
                  </h4>
                  <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6' }}>
                    Use the slider to see all 4 learning styles and their unique features
                  </p>
                </RecommendationCard>
                <RecommendationCard color="#8e44ad">
                  <h4 style={{ color: '#8e44ad', marginBottom: '15px', fontSize: '1.3rem' }}>
                    💡 View Details
                  </h4>
                  <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6' }}>
                    Click "View Details" to see comprehensive information about each style
                  </p>
                </RecommendationCard>
                <RecommendationCard color="#e74c3c">
                  <h4 style={{ color: '#e74c3c', marginBottom: '15px', fontSize: '1.3rem' }}>
                    🎯 Try It Out
                  </h4>
                  <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6' }}>
                    Test different styles to see which one feels most natural to you
                  </p>
                </RecommendationCard>
                <RecommendationCard color="#f39c12">
                  <h4 style={{ color: '#f39c12', marginBottom: '15px', fontSize: '1.3rem' }}>
                    ✅ Make It Yours
                  </h4>
                  <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6' }}>
                    Once you find your fit, set it as your primary learning style
                  </p>
                </RecommendationCard>
              </RecommendationGrid>
            </RecommendationsSection>
          </LearningStyleCard>
        )}

        {/* Discover Other Learning Personalities Section */}
        <LearningStyleCard delay="0.2s">
          <CardTitle>
            {userLearningStyle ? '🎭 Discover Other Learning Personalities' : '🎯 Choose Your Learning Style'}
          </CardTitle>
          <StyleDescription>
            {userLearningStyle 
              ? 'Each learning style is a unique superpower! Explore other styles to become a versatile learning superhero.'
              : 'Select your primary learning style to unlock personalized recommendations and tools tailored just for you!'
            }
          </StyleDescription>
          
          <RecommendationGrid>
            {Object.entries(learningStyles).map(([key, style]) => (
              <RecommendationCard 
                key={key}
                style={{ borderTop: `4px solid ${style.color}` }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '15px', 
                  marginBottom: '15px' 
                }}>
                  <div style={{ 
                    fontSize: '2rem',
                    background: `${style.color}20`,
                    width: '60px',
                    height: '60px',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {style.icon}
                  </div>
                  <div>
                    <h4 style={{ 
                      color: style.color, 
                      marginBottom: '5px', 
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}>
                      {style.title}
                    </h4>
                    <p style={{ 
                      color: '#666', 
                      fontSize: '0.9rem',
                      opacity: 0.8
                    }}>
                      {getSlideStats(key).popularity}
                    </p>
                  </div>
                </div>
                
                <p style={{ 
                  color: '#666', 
                  fontSize: '0.95rem', 
                  marginBottom: '20px',
                  lineHeight: '1.6'
                }}>
                  {style.description?.substring(0, 120) || 'Explore this learning style...'}...
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '10px',
                  marginTop: '20px'
                }}>
                  <button
                    onClick={() => showStyleDetails(key, style)}
                    style={{
                      background: 'transparent',
                      color: style.color,
                      border: `2px solid ${style.color}`,
                      padding: '10px 20px',
                      borderRadius: '10px',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      flex: 1
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = `${style.color}10`;
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    View Details
                  </button>
                  
                  <button
                    onClick={() => saveLearningStyle(key)}
                    style={{
                      background: userLearningStyle === key ? '#2ecc71' : style.color,
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '10px',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      flex: 1,
                      boxShadow: `0 4px 15px ${style.color}40`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = `0 6px 20px ${style.color}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = `0 4px 15px ${style.color}40`;
                    }}
                  >
                    {userLearningStyle === key ? '✓ Selected' : 'Select This Style'}
                  </button>
                </div>
              </RecommendationCard>
            ))}
          </RecommendationGrid>
        </LearningStyleCard>
        
        {/* Style Details Modal */}
        {selectedStyleForDetails && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '25px',
              padding: '40px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}>
              <button
                onClick={closeStyleDetails}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#666',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f0f0f0';
                  e.target.style.color = '#333';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#666';
                }}
              >
                ✕
              </button>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '20px', 
                marginBottom: '30px' 
              }}>
                <div style={{ 
                  fontSize: '3rem',
                  background: `${selectedStyleForDetails.color}20`,
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {selectedStyleForDetails.icon}
                </div>
                <div>
                  <h2 style={{ 
                    color: selectedStyleForDetails.color, 
                    marginBottom: '10px', 
                    fontSize: '2.5rem',
                    fontWeight: 'bold'
                  }}>
                    {selectedStyleForDetails.title}
                  </h2>
                  <p style={{ 
                    color: '#666', 
                    fontSize: '1.1rem'
                  }}>
                    Detailed overview of this learning style
                  </p>
                </div>
              </div>
              
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  color: '#333', 
                  marginBottom: '15px',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>📖</span> Description
                </h3>
                <p style={{ 
                  color: '#555', 
                  fontSize: '1.1rem',
                  lineHeight: '1.7'
                }}>
                  {selectedStyleForDetails.description}
                </p>
              </div>
              
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  color: '#333', 
                  marginBottom: '15px',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>✨</span> Key Characteristics
                </h3>
                <ul style={{ 
                  paddingLeft: '20px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '10px'
                }}>
                  {selectedStyleForDetails.characteristics?.map((char, index) => (
                    <li key={index} style={{ 
                      marginBottom: '10px',
                      color: '#555',
                      fontSize: '1rem',
                      lineHeight: '1.6'
                    }}>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  color: '#333', 
                  marginBottom: '15px',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>🚀</span> Recommended Tools
                </h3>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '15px'
                }}>
                  {selectedStyleForDetails.recommendations?.map((rec, index) => (
                    <div key={index} style={{
                      background: `${selectedStyleForDetails.color}10`,
                      padding: '20px',
                      borderRadius: '15px',
                      borderLeft: `4px solid ${selectedStyleForDetails.color}`
                    }}>
                      <h4 style={{ 
                        color: selectedStyleForDetails.color, 
                        marginBottom: '10px',
                        fontSize: '1.2rem'
                      }}>
                        {rec.title}
                      </h4>
                      <p style={{ 
                        color: '#666', 
                        fontSize: '0.95rem',
                        lineHeight: '1.6'
                      }}>
                        {rec.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: '15px',
                marginTop: '40px',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={closeStyleDetails}
                  style={{
                    background: 'transparent',
                    color: '#666',
                    border: '2px solid #ddd',
                    padding: '12px 30px',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f0f0f0';
                    e.target.style.borderColor = '#ccc';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = '#ddd';
                  }}
                >
                  Close
                </button>
                
                <button
                  onClick={() => {
                    saveLearningStyle(selectedStyleForDetails.key);
                    closeStyleDetails();
                  }}
                  style={{
                    background: selectedStyleForDetails.color,
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: `0 4px 15px ${selectedStyleForDetails.color}40`
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = `0 6px 20px ${selectedStyleForDetails.color}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = `0 4px 15px ${selectedStyleForDetails.color}40`;
                  }}
                >
                  Select This Style
                </button>
              </div>
            </div>
          </div>
        )}
        
        <QuickActions>
          <ActionButton to="/learning">
            <span className="icon">🎯</span>
            {userLearningStyle ? 'Start Learning Quest' : 'Explore Learning'}
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