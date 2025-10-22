import React, { useState } from 'react';
import styled from 'styled-components';
import api from './api'; // ✅ import the centralized API
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250));
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #3e8e41;
  }
`;

const Toggle = styled.p`
  cursor: pointer;
  color: #007bff;
  text-align: center;
  margin-top: 10px;
`;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    schoolname: '',
    rollno: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rollno' ? Number(value) : value,
    });
  };

  // ✅ Handle login/register submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth' : '/api/auth/register';
      const payload = isLogin
        ? { rollno: Number(formData.rollno), password: formData.password }
        : { ...formData, rollno: Number(formData.rollno) };

      // 🔥 Use centralized API client
      const response = await api.post(endpoint, payload);

      if (isLogin) {
        // Clear previous session data for fresh login
        localStorage.clear();
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setLoading(false);
        navigate('/home');
      } else {
        setError('');
        setIsLogin(true);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error("Login/Register error:", err);
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || 'An error occurred';
        if (status === 400) setError('Invalid input. Please check your details.');
        else if (status === 401) setError('Invalid roll number or password.');
        else if (status === 409) setError('User already exists. Please login instead.');
        else if (status === 500) setError('Server error. Please try again later.');
        else setError(message);
      } else if (err.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>

        {!isLogin && (
          <Input
            type="text"
            name="schoolname"
            placeholder="School Name"
            value={formData.schoolname}
            onChange={handleChange}
            required
          />
        )}

        <Input
          type="number"
          name="rollno"
          placeholder="Roll No"
          value={formData.rollno}
          onChange={handleChange}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
        </Button>

        <Toggle onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </Toggle>
      </Form>
    </Wrapper>
  );
};

export default Login;
