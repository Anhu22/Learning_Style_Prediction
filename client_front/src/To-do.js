import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';

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
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const checkmark = keyframes`
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
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

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  animation: ${slideIn} 0.6s ease-out;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #4ca2af 0%, #91ebe9 100%);
  border-radius: 25px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 15px 40px rgba(76, 162, 175, 0.3);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '📝';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 3rem;
    opacity: 0.3;
    animation: ${float} 4s ease-in-out infinite;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 15px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 2s ease-in-out infinite;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TodoCard = styled.div`
  background: white;
  border-radius: 25px;
  padding: 40px;
  margin-bottom: 30px;
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
    background: linear-gradient(90deg, #4ca2af, #91ebe9);
  }
`;

const CardTitle = styled.h2`
  color: #191818;
  margin-bottom: 25px;
  font-size: 2rem;
  display: flex;
  align-items: center;
  gap: 15px;
  
  .title-icon {
    font-size: 2.2rem;
    animation: ${float} 4s ease-in-out infinite;
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const TodoInput = styled.input`
  flex: 1;
  min-width: 250px;
  padding: 16px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
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

const PrioritySelect = styled.select`
  padding: 16px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  font-size: 1rem;
  background: white;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #4ca2af;
    box-shadow: 0 0 0 3px rgba(76, 162, 175, 0.1);
  }
`;

const AddButton = styled.button`
  padding: 16px 30px;
  background: linear-gradient(135deg, #4ca2af, #2c7994);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(76, 162, 175, 0.3);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  .button-icon {
    font-size: 1.2rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.active ? '#4ca2af' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 2px solid #4ca2af;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: ${props => props.active ? '#3a8a95' : '#4ca2af'};
    color: white;
    transform: translateY(-2px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 50px 20px;
  color: #666;
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 20px;
    opacity: 0.5;
    animation: ${float} 6s ease-in-out infinite;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #4ca2af;
  }
  
  p {
    font-size: 1rem;
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TodoItem = styled.li`
  background: ${props => props.completed ? '#f8f9fa' : 'white'};
  border-left: 4px solid ${props => {
    switch(props.priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#2ecc71';
      default: return '#4ca2af';
    }
  }};
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: ${slideIn} 0.3s ease-out;
  
  &:hover {
    transform: translateX(10px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Checkbox = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid ${props => props.completed ? '#2ecc71' : '#ddd'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.completed ? '#2ecc71' : 'white'};
  flex-shrink: 0;
  
  &:hover {
    border-color: #4ca2af;
    transform: scale(1.1);
  }
  
  .checkmark {
    color: white;
    font-size: 0.9rem;
    animation: ${checkmark} 0.3s ease;
  }
`;

const TodoContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const TodoTitle = styled.h3`
  color: ${props => props.completed ? '#999' : '#191818'};
  margin-bottom: 5px;
  font-size: 1.1rem;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  word-break: break-word;
`;

const TodoMeta = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
`;

const PriorityBadge = styled.span`
  padding: 4px 12px;
  background: ${props => {
    switch(props.priority) {
      case 'high': return 'rgba(231, 76, 60, 0.1)';
      case 'medium': return 'rgba(243, 156, 18, 0.1)';
      case 'low': return 'rgba(46, 204, 113, 0.1)';
      default: return 'rgba(76, 162, 175, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#2ecc71';
      default: return '#4ca2af';
    }
  }};
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid currentColor;
`;

const DateBadge = styled.span`
  padding: 4px 12px;
  background: rgba(76, 162, 175, 0.1);
  color: #4ca2af;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  padding: 8px 12px;
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  border: 1px solid #e74c3c;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  
  &:hover {
    background: #e74c3c;
    color: white;
    transform: scale(1.05);
    animation: ${shake} 0.5s ease;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 40px 0;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
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

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #4ca2af;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 1rem;
  font-weight: 500;
`;

const QuoteSection = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  padding: 30px;
  margin-top: 40px;
  text-align: center;
  border-left: 5px solid #4ca2af;
  
  .quote-icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: #4ca2af;
  }
  
  p {
    color: #555;
    font-size: 1.1rem;
    font-style: italic;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  
  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);
  
  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const newTodoItem = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      priority: priority,
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }),
      timestamp: new Date().toISOString()
    };
    
    setTodos([newTodoItem, ...todos]);
    setNewTodo('');
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (filter === 'high') return todo.priority === 'high' && !todo.completed;
    if (filter === 'today') {
      const today = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      return todo.date === today;
    }
    return true;
  });
  
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;
  const highPriorityCount = todos.filter(todo => todo.priority === 'high' && !todo.completed).length;
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };
  
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
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
      </NavBar>

      <ContentContainer>
        <HeroSection>
          <HeroTitle>Your Learning To-Do List 🚀</HeroTitle>
          <HeroSubtitle>
            Organize your learning journey, track progress, and achieve your goals with style!
          </HeroSubtitle>
        </HeroSection>

        <TodoCard>
          <CardTitle>
            <span className="title-icon">✨</span>
            Add New Task
          </CardTitle>
          
          <InputContainer>
            <TodoInput
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What do you want to learn today? ✨"
            />
            
            <PrioritySelect value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">📈 Low Priority</option>
              <option value="medium">📊 Medium Priority</option>
              <option value="high">🔥 High Priority</option>
            </PrioritySelect>
            
            <AddButton onClick={addTodo} disabled={!newTodo.trim()}>
              <span className="button-icon">➕</span>
              Add Task
            </AddButton>
          </InputContainer>
          
          <FilterContainer>
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
              📋 All Tasks ({todos.length})
            </FilterButton>
            <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>
              ⚡ Active ({activeCount})
            </FilterButton>
            <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>
              ✅ Completed ({completedCount})
            </FilterButton>
            <FilterButton active={filter === 'high'} onClick={() => setFilter('high')}>
              🔥 High Priority ({highPriorityCount})
            </FilterButton>
            <FilterButton active={filter === 'today'} onClick={() => setFilter('today')}>
              📅 Today
            </FilterButton>
            {completedCount > 0 && (
              <FilterButton onClick={clearCompleted}>
                🗑️ Clear Completed
              </FilterButton>
            )}
          </FilterContainer>
          
          {filteredTodos.length === 0 ? (
            <EmptyState>
              <div className="empty-icon">
                {filter === 'completed' ? '🎉' : filter === 'all' ? '📝' : '✨'}
              </div>
              <h3>
                {filter === 'completed' ? 'No completed tasks yet!' :
                 filter === 'all' ? 'Your to-do list is empty!' :
                 filter === 'today' ? 'No tasks for today!' :
                 'No tasks match your filter!'}
              </h3>
              <p>
                {filter === 'completed' ? 'Complete some tasks to see them here!' :
                 filter === 'all' ? 'Add your first task above to get started!' :
                 filter === 'today' ? 'Add some tasks for today!' :
                 'Try changing your filter or add new tasks!'}
              </p>
            </EmptyState>
          ) : (
            <TodoList>
              {filteredTodos.map(todo => (
                <TodoItem 
                  key={todo.id} 
                  completed={todo.completed}
                  priority={todo.priority}
                >
                  <Checkbox 
                    completed={todo.completed} 
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.completed && <span className="checkmark">✓</span>}
                  </Checkbox>
                  
                  <TodoContent>
                    <TodoTitle completed={todo.completed}>
                      {todo.text}
                    </TodoTitle>
                    <TodoMeta>
                      <PriorityBadge priority={todo.priority}>
                        {todo.priority === 'high' ? '🔥 High' :
                         todo.priority === 'medium' ? '📊 Medium' : '📈 Low'}
                      </PriorityBadge>
                      <DateBadge>
                        📅 {todo.date}
                      </DateBadge>
                    </TodoMeta>
                  </TodoContent>
                  
                  <DeleteButton onClick={() => deleteTodo(todo.id)}>
                    🗑️ Delete
                  </DeleteButton>
                </TodoItem>
              ))}
            </TodoList>
          )}
        </TodoCard>

        <StatsGrid>
          <StatCard>
            <StatNumber>{todos.length}</StatNumber>
            <StatLabel>Total Tasks</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>{activeCount}</StatNumber>
            <StatLabel>Active Tasks</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>{completedCount}</StatNumber>
            <StatLabel>Completed Tasks</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>{highPriorityCount}</StatNumber>
            <StatLabel>High Priority</StatLabel>
          </StatCard>
        </StatsGrid>

        <QuoteSection>
          <div className="quote-icon">💡</div>
          <p>
            "The secret of getting ahead is getting started. The secret of getting started 
            is breaking your complex overwhelming tasks into small manageable tasks, 
            and then starting on the first one." – Mark Twain
          </p>
        </QuoteSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default ToDoList;