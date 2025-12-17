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
  X
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

/* ================= NAVBAR ================= */
const NavbarContainer = styled.nav`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 2rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
  animation: ${slideDown} 0.3s ease-out;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: ${props => props.mobileOpen ? 'flex' : 'none'};
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 2rem;
    border-bottom: 1px solid #e2e8f0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    gap: 1rem;
  }
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.05);
  }
  
  &.active {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.1);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background: #6366f1;
      border-radius: 50%;
      
      @media (max-width: 768px) {
        bottom: 50%;
        right: -8px;
        left: auto;
        transform: translateY(50%);
      }
    }
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f1f5f9;
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
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
  color: #1e293b;
`;

const UserEmail = styled.span`
  font-size: 0.8rem;
  color: #64748b;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

/* ================= COMPONENT ================= */
const Learning = () => {
  const navigate = useNavigate();
  const [completedResources, setCompletedResources] = useState([]);
  const [userLearningStyle, setUserLearningStyle] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('User');

  /* ===== AUTO LOAD LEARNING STYLE ===== */
  useEffect(() => {
    // 1️⃣ Try saved learning style
    let style = localStorage.getItem('learningStyle');

    // 2️⃣ Else try predicted style from Result page
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

  /* ================= LEARNING STYLES ================= */
  const learningStyles = {
    visual: {
      title: 'Visual Explorer',
      description: 'You learn best through seeing and observing! Create your own visual universe of knowledge with colors, diagrams, and mind maps.',
      color: '#6366f1',
      icon: '👁️',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      tips: [
        'Use colorful mind maps',
        'Watch videos & animations',
        'Use charts & infographics',
        'Convert text into visuals'
      ]
    },
    auditory: {
      title: 'Sound Maestro',
      description: 'You learn best by listening and discussion. Audio-based learning helps you retain information through sound patterns.',
      color: '#10b981',
      icon: '👂',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      tips: [
        'Listen to podcasts',
        'Read aloud',
        'Group discussions',
        'Audio summaries'
      ]
    },
    read: {
      title: 'Word Wizard',
      description: 'You prefer reading and writing. Text-based materials and written explanations work best for your learning style.',
      color: '#f59e0b',
      icon: '📚',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      tips: [
        'Take detailed notes',
        'Read PDFs & articles',
        'Write summaries',
        'Use flashcards'
      ]
    },
    kinesthetic: {
      title: 'Movement Master',
      description: 'You learn best by doing. Hands-on activities and practical applications help you understand concepts deeply.',
      color: '#ef4444',
      icon: '🤸',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
      tips: [
        'Hands-on activities',
        'Practice quizzes',
        'Simulations',
        'Experiments'
      ]
    }
  };

  /* ================= RESOURCE DATA ================= */
  const resourceData = {
    visual: [
      {
        id: 1,
        title: 'Data Visualization Masterclass',
        type: 'video',
        duration: '45 min',
        difficulty: 'Intermediate',
        description: 'Learn how to create effective visual representations of data. Perfect for visual learners who want to enhance their understanding through diagrams and charts.',
        progress: 60,
        icon: <Video size={24} />,
        tags: ['Diagrams', 'Charts', 'Visual'],
        link: 'https://vark-learn.com/strategies/visual-strategies/'
      },
      {
        id: 5,
        title: 'Mind Mapping Techniques',
        type: 'interactive',
        duration: '30 min',
        difficulty: 'Beginner',
        description: 'Learn how to create effective mind maps to organize your thoughts and ideas visually.',
        progress: 40,
        icon: <Video size={24} />,
        tags: ['Mind Maps', 'Organization', 'Visual'],
        link: 'https://vark-learn.com/strategies/visual-strategies/'
      }
    ],
    auditory: [
      {
        id: 2,
        title: 'Podcast Learning Series',
        type: 'audio',
        duration: '40 min',
        difficulty: 'Beginner',
        description: 'Audio-based explanations and discussions to help auditory learners absorb information effectively.',
        progress: 30,
        icon: <Headphones size={24} />,
        tags: ['Audio', 'Discussion', 'Listening'],
        link: 'https://vark-learn.com/strategies/aural-strategies/'
      }
    ],
    read: [
      {
        id: 3,
        title: 'Reading & Writing Strategies',
        type: 'guide',
        duration: 'Self-paced',
        difficulty: 'Beginner',
        description: 'Official VARK strategies for Read/Write learners. Learn effective note-taking and summarization techniques.',
        icon: <BookOpen size={24} />,
        tags: ['VARK', 'Note-taking', 'Summarizing'],
        link: 'https://vark-learn.com/strategies/readwrite-strategies/'
      }
    ],
    kinesthetic: [
      {
        id: 4,
        title: 'Interactive Learning Lab',
        type: 'interactive',
        duration: '30 min',
        difficulty: 'Intermediate',
        description: 'Hands-on activities and simulations to help kinesthetic learners grasp concepts through practice.',
        progress: 10,
        icon: <HelpCircle size={24} />,
        tags: ['Hands-on', 'Practice', 'Interactive'],
        link: 'https://vark-learn.com/strategies/kinesthetic-strategies/'
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
            <LogoText>LearnSmart</LogoText>
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
            <NavLinkStyled to="/profile" onClick={() => setMobileMenuOpen(false)}>
              <User size={20} />
              Profile
            </NavLinkStyled>
          </NavLinks>
          
          <NavActions>
            <UserProfile onClick={() => navigate('/profile')}>
              <UserAvatar>{userName.charAt(0).toUpperCase()}</UserAvatar>
              <UserInfo>
                <UserName>{userName}</UserName>
                <UserEmail>learner@example.com</UserEmail>
              </UserInfo>
            </UserProfile>
          </NavActions>
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
                    <BenefitIcon style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                      <Sparkles size={24} color="#6366f1" />
                    </BenefitIcon>
                    <BenefitContent>
                      <BenefitTitle>Personalized Recommendations</BenefitTitle>
                      <BenefitDescription>Resources matched to your unique learning preferences</BenefitDescription>
                    </BenefitContent>
                  </BenefitCard>
                  
                  <BenefitCard>
                    <BenefitIcon style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                      <Zap size={24} color="#10b981" />
                    </BenefitIcon>
                    <BenefitContent>
                      <BenefitTitle>Accelerated Progress</BenefitTitle>
                      <BenefitDescription>Learn faster with techniques that work for you</BenefitDescription>
                    </BenefitContent>
                  </BenefitCard>
                  
                  <BenefitCard>
                    <BenefitIcon style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                      <Lightbulb size={24} color="#f59e0b" />
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
      {/* Navbar */}
      <NavbarContainer>
        <NavLogo>
          <LogoIcon>L</LogoIcon>
          <LogoText>LearnSmart</LogoText>
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
          <NavLinkStyled to="/profile" onClick={() => setMobileMenuOpen(false)}>
            <User size={20} />
            Profile
          </NavLinkStyled>
        </NavLinks>
        
        <NavActions>
          <UserProfile onClick={() => navigate('/profile')}>
            <UserAvatar>{userName.charAt(0).toUpperCase()}</UserAvatar>
            <UserInfo>
              <UserName>{userName}</UserName>
              <UserEmail>learner@example.com</UserEmail>
            </UserInfo>
          </UserProfile>
          <SecondaryButton onClick={handleLogout}>
            <LogOut size={18} />
            <span style={{ display: 'inline' }}>Logout</span>
          </SecondaryButton>
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
                Personalized Learning Journey
              </PageTitle>
              <PageSubtitle>
                Adventure tailored to your <Highlight>{currentStyle.title}</Highlight> style
              </PageSubtitle>
            </HeaderContent>
            <HeaderAction>
              <SecondaryButton onClick={handleTakeQuiz}>
                <Lightbulb size={18} />
                Retake Quiz
              </SecondaryButton>
            </HeaderAction>
          </PageHeader>

          {/* Learning Style Card */}
          <LearningStyleCard gradient={currentStyle.gradient}>
            <StyleCardHeader>
              <StyleHeader>
                <StyleIcon>{currentStyle.icon}</StyleIcon>
                <StyleInfo>
                  <StyleSubtitle>Your Learning Style</StyleSubtitle>
                  <StyleName>{currentStyle.title}</StyleName>
                </StyleInfo>
              </StyleHeader>
            </StyleCardHeader>
            
            <StyleCardBody>
              <StyleDescription>{currentStyle.description}</StyleDescription>
              
              <TipsSection>
                <TipsTitle>
                  <Lightbulb size={20} />
                  Tips for {currentStyle.title.split(' ')[0]} Learners
                </TipsTitle>
                <TipsGrid>
                  {currentStyle.tips.map((tip, index) => (
                    <TipCard key={index}>
                      <TipNumber>{index + 1}</TipNumber>
                      <TipText>{tip}</TipText>
                    </TipCard>
                  ))}
                </TipsGrid>
              </TipsSection>
            </StyleCardBody>
          </LearningStyleCard>

          {/* Recommended Resources */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Zap size={28} />
                Recommended Resources
              </SectionTitle>
              <SectionSubtitle>
                {recommendations.length} resources optimized for your {currentStyle.title.toLowerCase()} style
              </SectionSubtitle>
            </SectionHeader>

            <ResourceGrid>
              {recommendations.map((resource, index) => {
                const isCompleted = completedResources.includes(resource.id);
                
                return (
                  <ResourceCard 
                    key={resource.id}
                    delay={index * 0.1}
                    completed={isCompleted}
                  >
                    <ResourceHeader>
                      <ResourceIcon>
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
                          <Tag key={i}>{tag}</Tag>
                        ))}
                      </TagContainer>

                      {resource.link && (
                        <ResourceLink 
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          gradient={currentStyle.gradient}
                        >
                          Visit Resource
                          <ChevronRight size={16} />
                        </ResourceLink>
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
                              gradient={currentStyle.gradient}
                            />
                          </ProgressBar>
                        </ProgressSection>
                      )}
                    </ResourceContent>

                    <ResourceFooter>
                      <ActionButton
                        onClick={() => toggleCompletion(resource.id)}
                        completed={isCompleted}
                        gradient={currentStyle.gradient}
                      >
                        {isCompleted ? '✓ Completed' : 'Mark Complete'}
                      </ActionButton>
                    </ResourceFooter>
                  </ResourceCard>
                );
              })}
            </ResourceGrid>
          </Section>

          {/* Additional Tips */}
          <InfoCard>
            <InfoCardHeader>
              <InfoCardTitle>
                <Lightbulb size={28} />
                Learning Optimization Tips
              </InfoCardTitle>
            </InfoCardHeader>
            <InfoCardBody>
              <InfoContent>
                <InfoText>
                  <strong>🎯 Pro Tip:</strong> Combine your primary learning style with others for enhanced understanding. 
                  For example, if you're a {currentStyle.title.split(' ')[0].toLowerCase()} learner, try supplementing with 
                  audio or hands-on activities to reinforce concepts.
                </InfoText>
                <RefreshButton onClick={handleTakeQuiz}>
                  <Target size={20} />
                  Refresh Learning Style
                  <ChevronRight size={20} />
                </RefreshButton>
              </InfoContent>
            </InfoCardBody>
          </InfoCard>
        </ContentWrapper>
      </DashboardContainer>
    </>
  );
};

/* ================= STYLES ================= */
const DashboardContainer = styled.div`
  min-height: calc(100vh - 70px);
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

/* Quiz Prompt Styles */
const QuizPromptCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  text-align: center;
  animation: ${slideIn} 0.8s ease-out;
  border: 1px solid #e2e8f0;
`;

const QuizCardHeader = styled.div`
  margin-bottom: 2rem;
`;

const QuizIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
`;

const QuizTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const QuizSubtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
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
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-color: #cbd5e1;
  }
`;

const BenefitIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
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
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const BenefitDescription = styled.p`
  font-size: 0.95rem;
  color: #64748b;
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
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TitleIcon = styled.div`
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  max-width: 600px;
  line-height: 1.6;
`;

const Highlight = styled.span`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
`;

/* Card Styles */
const LearningStyleCard = styled.div`
  background: white;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
  position: relative;
  animation: ${slideIn} 0.6s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: ${props => props.gradient || '#6366f1'};
  }
`;

const StyleCardHeader = styled.div`
  padding: 2rem 2rem 0;
`;

const StyleCardBody = styled.div`
  padding: 1.5rem 2rem 2rem;
`;

const StyleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const StyleIcon = styled.div`
  font-size: 3.5rem;
  animation: ${float} 4s ease-in-out infinite;
`;

const StyleInfo = styled.div``;

const StyleSubtitle = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`;

const StyleName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  background: ${props => props.gradient || '#6366f1'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyleDescription = styled.p`
  color: #475569;
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const TipsSection = styled.div`
  margin-top: 2rem;
`;

const TipsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const TipCard = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  &:hover {
    transform: translateY(-2px);
    border-color: #cbd5e1;
    background: white;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;

const TipNumber = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
`;

const TipText = styled.p`
  color: #475569;
  line-height: 1.6;
  margin: 0;
  flex: 1;
`;

/* Resources Section */
const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionHeader = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SectionSubtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
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
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${props => props.delay || 0}s;
  opacity: ${props => props.completed ? 0.7 : 1};
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: #cbd5e1;
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
  background: #f1f5f9;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
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
  font-size: 0.85rem;
  font-weight: 600;
  background-color: ${props => 
    props.difficulty === 'Beginner' ? '#dcfce7' :
    props.difficulty === 'Intermediate' ? '#fef9c3' :
    '#fef2f2'
  };
  color: ${props => 
    props.difficulty === 'Beginner' ? '#166534' :
    props.difficulty === 'Intermediate' ? '#854d0e' :
    '#991b1b'
  };
`;

const ResourceDuration = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #64748b;
`;

const ResourceContent = styled.div`
  margin-bottom: 1.5rem;
`;

const ResourceTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const ResourceDescription = styled.p`
  color: #64748b;
  font-size: 0.95rem;
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
  background: #f8fafc;
  color: #475569;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

const ResourceLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  background: ${props => props.gradient ? `${props.gradient}15` : 'rgba(99, 102, 241, 0.1)'};
  border-radius: 12px;
  transition: all 0.3s ease;
  font-size: 0.95rem;

  &:hover {
    background: ${props => props.gradient ? `${props.gradient}25` : 'rgba(99, 102, 241, 0.2)'};
    transform: translateX(4px);
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
  font-size: 0.9rem;
  color: #64748b;
`;

const ProgressValue = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
`;

const ProgressBar = styled.div`
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background: ${props => props.gradient || 'linear-gradient(135deg, #6366f1, #8b5cf6)'};
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
  color: ${props => props.completed ? 'white' : '#64748b'};
  border: 2px solid ${props => props.completed ? '#10b981' : '#e2e8f0'};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;

  &:hover {
    background: ${props => props.completed ? '#059669' : '#f8fafc'};
    transform: translateY(-2px);
  }
`;

/* Info Card */
const InfoCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  margin-top: 2rem;
`;

const InfoCardHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const InfoCardTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const InfoCardBody = styled.div`
  margin-top: 1rem;
`;

const InfoContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InfoText = styled.p`
  color: #475569;
  line-height: 1.7;
  flex: 1;
  font-size: 1.1rem;
  margin: 0;

  strong {
    color: #1e293b;
  }
`;

/* Button Styles */
const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 14px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: #475569;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
    transform: translateY(-2px);
  }
`;

const RefreshButton = styled.button`
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.85rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
  }
`;

export default Learning;