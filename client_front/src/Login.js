import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import api from './api';
import { useNavigate } from 'react-router-dom';

// Fun animations matching dashboard
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
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

// Styled Components matching dashboard theme
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #4ca2af 0%, #91ebe9 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const NavBar = styled.nav`
  background: linear-gradient(135deg, #4ca2af 0%, #2c7994 100%);
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 20px rgba(76, 162, 175, 0.3);
  z-index: 1000;
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

const HeroSection = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .float-1 {
    position: absolute;
    top: 20%;
    left: 10%;
    font-size: 3rem;
    animation: ${float} 4s ease-in-out infinite;
    opacity: 0.2;
  }
  
  .float-2 {
    position: absolute;
    bottom: 20%;
    right: 10%;
    font-size: 2.5rem;
    animation: ${float} 5s ease-in-out infinite 1s;
    opacity: 0.2;
  }
  
  .float-3 {
    position: absolute;
    top: 40%;
    right: 15%;
    font-size: 2rem;
    animation: ${float} 6s ease-in-out infinite 2s;
    opacity: 0.2;
  }
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
  animation: ${slideIn} 0.6s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #4ca2af, #91ebe9);
    border-radius: 25px 25px 0 0;
  }
`;

const FormTitle = styled.h2`
  color: #191818;
  margin-bottom: 30px;
  font-size: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  .icon {
    font-size: 1.5rem;
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #4ca2af, #91ebe9);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:focus-within::after {
    transform: scaleX(1);
  }
`;

const InputIcon = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #4ca2af;
  font-size: 1.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: #333;
  
  &:focus {
    outline: none;
    border-color: #4ca2af;
    box-shadow: 0 0 0 3px rgba(76, 162, 175, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: ${props => props.disabled ? '#ccc' : 'linear-gradient(135deg, #4ca2af, #2c7994)'};
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
  
  &:hover:not(:disabled) {
    transform: translateY(-3px);
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
  
  .button-icon {
    font-size: 1.2rem;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(231, 76, 60, 0.1);
  border: 2px solid rgba(231, 76, 60, 0.3);
  color: #e74c3c;
  padding: 12px 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: ${shake} 0.5s ease;
  
  &::before {
    content: '⚠️';
    font-size: 1.2rem;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(46, 204, 113, 0.1);
  border: 2px solid rgba(46, 204, 113, 0.3);
  color: #2ecc71;
  padding: 12px 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &::before {
    content: '🎉';
    font-size: 1.2rem;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 25px;
  color: #666;
  font-size: 0.95rem;
`;

const ToggleButton = styled.span`
  color: #4ca2af;
  font-weight: 600;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background: rgba(76, 162, 175, 0.1);
    transform: translateY(-2px);
  }
  
  .toggle-icon {
    font-size: 1rem;
  }
`;

const LoadingDots = styled.div`
  display: inline-flex;
  gap: 4px;
  
  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: white;
    animation: ${pulse} 1.4s ease-in-out infinite;
    
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
    &:nth-child(3) { animation-delay: 0s; }
  }
`;

const WelcomeText = styled.div`
  text-align: center;
  margin-bottom: 30px;
  
  h3 {
    color: #191818;
    font-size: 1.4rem;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    font-size: 0.95rem;
  }
`;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    schoolname: '',
    rollno: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validation
      if (!formData.schoolname.trim()) {
        throw new Error('School name is required');
      }
      if (!formData.rollno || formData.rollno <= 0) {
        throw new Error('Please enter a valid roll number');
      }
      if (!formData.password || formData.password.length < 4) {
        throw new Error('Password must be at least 4 characters');
      }

      const endpoint = isLogin ? '/api/auth' : '/api/auth/register';
      const payload = {
        schoolname: formData.schoolname.trim(),
        rollno: parseInt(formData.rollno, 10),
        password: formData.password
      };

      // Test if api exists
      if (!api || typeof api.post !== 'function') {
        // Fallback to direct axios
        const axios = await import('axios');
        const response = await axios.default.post(
          `http://localhost:5000${endpoint}`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        handleResponse(response.data);
      } else {
        const response = await api.post(endpoint, payload);
        handleResponse(response.data);
      }
    } catch (err) {
      setLoading(false);
      console.error("Error details:", err);
      
      if (err.message && !err.response) {
        setError(err.message);
        return;
      }
      
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 400) {
          setError(data.message || 'Please check your input details. 🧐');
        } else if (status === 401) {
          setError(data.message || 'Invalid credentials. Please try again. 🔐');
        } else if (status === 409) {
          setError(data.message || 'Account already exists! Try logging in. 👋');
        } else if (status === 500) {
          setError(data.message || 'Server error. Please try again later. 😴');
        } else {
          setError(data.message || `Error ${status}: Please try again.`);
        }
      } else if (err.request) {
        setError('No internet connection. Check your network! 🌐');
      } else {
        setError('Oops! Something went wrong. Please try again. 🤔');
      }
    }
  };

  const handleResponse = (data) => {
    if (isLogin) {
      localStorage.clear();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userName', data.user.name || 'Student');
      
      setSuccess('Welcome back! Redirecting to your learning adventure... 🚀');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setSuccess('🎉 Account created successfully! You can now login. 🎉');
      setIsLogin(true);
      setFormData({ schoolname: '', rollno: '', password: '' });
    }
    setLoading(false);
  };

  return (
    <PageContainer>
      <NavBar>
        <Logo>
          <img 
            src="/logo225.png" 
            alt="LearnQuest AI Logo" 
            className="logo-icon" 
          />
          <h1>LearnQuest</h1>
        </Logo>
      </NavBar>

      <HeroSection>
        <FloatingElements>
          <div className="float-1">✨</div>
          <div className="float-2">🌟</div>
          <div className="float-3">🎯</div>
        </FloatingElements>

        <FormContainer>
          <FormTitle>
            <span className="icon">
              {isLogin ? '🔑' : '🚀'}
            </span>
            {isLogin ? 'Welcome Back!' : 'Start Your Journey!'}
          </FormTitle>

          <WelcomeText>
            <h3>
              {isLogin ? 'Continue Your Learning Adventure' : 'Join the Learning Adventure'}
            </h3>
            <p>
              {isLogin 
                ? 'Enter your credentials to access personalized learning'
                : 'Create an account to discover your unique learning style'
              }
            </p>
          </WelcomeText>

          <form onSubmit={handleSubmit}>
            <InputGroup>
              <InputIcon>🏫</InputIcon>
              <Input
                type="text"
                name="schoolname"
                placeholder="School Name"
                value={formData.schoolname}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <InputIcon>🎫</InputIcon>
              <Input
                type="number"
                name="rollno"
                placeholder="Roll Number"
                value={formData.rollno}
                onChange={handleChange}
                required
                disabled={loading}
                min="1"
              />
            </InputGroup>

            <InputGroup>
              <InputIcon>🔒</InputIcon>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                minLength="4"
              />
            </InputGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <LoadingDots>
                    <span></span>
                    <span></span>
                    <span></span>
                  </LoadingDots>
                  {isLogin ? 'Logging in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  <span className="button-icon">
                    {isLogin ? '🔓' : '🚀'}
                  </span>
                  {isLogin ? 'Login & Explore' : 'Create Account'}
                </>
              )}
            </Button>
          </form>

          <ToggleText>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            {' '}
            <ToggleButton 
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
                setFormData({ schoolname: '', rollno: '', password: '' });
              }}
            >
              <span className="toggle-icon">
                {isLogin ? '🚀' : '🔑'}
              </span>
              {isLogin ? 'Start Adventure' : 'Back to Login'}
            </ToggleButton>
          </ToggleText>
        </FormContainer>
      </HeroSection>
    </PageContainer>
  );
};

export default Login;