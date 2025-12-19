import React, { useState, useEffect, useRef } from 'react';
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

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
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
  max-width: 1400px;
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
    content: '📓';
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

const NotesContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  margin-bottom: 40px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: white;
  border-radius: 25px;
  padding: 30px;
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

const SidebarTitle = styled.h2`
  color: #191818;
  margin-bottom: 25px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
  
  .sidebar-icon {
    font-size: 1.8rem;
    animation: ${float} 4s ease-in-out infinite;
  }
`;

const NoteList = styled.div`
  max-height: 500px;
  overflow-y: auto;
  padding-right: 10px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #4ca2af;
    border-radius: 10px;
  }
`;

const NoteItem = styled.div`
  padding: 15px;
  background: ${props => props.active ? 'rgba(76, 162, 175, 0.1)' : '#f8f9fa'};
  border-radius: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  border-left: 4px solid ${props => props.active ? '#4ca2af' : 'transparent'};
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateX(5px);
    background: rgba(76, 162, 175, 0.15);
  }
  
  .note-title {
    font-weight: 600;
    color: ${props => props.active ? '#191818' : '#555'};
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .note-preview {
    font-size: 0.9rem;
    color: #777;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .note-date {
    font-size: 0.8rem;
    color: #999;
    margin-top: 5px;
  }
  
  .delete-btn {
    opacity: 0;
    transition: opacity 0.3s ease;
    background: none;
    border: none;
    color: #e74c3c;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 4px;
    
    &:hover {
      background: rgba(231, 76, 60, 0.1);
    }
  }
  
  &:hover .delete-btn {
    opacity: 1;
  }
`;

const NewNoteButton = styled.button`
  width: 100%;
  padding: 15px;
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
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(76, 162, 175, 0.3);
  }
  
  .button-icon {
    font-size: 1.2rem;
    animation: ${bounce} 1s ease-in-out infinite;
  }
`;

const EditorContainer = styled.div`
  background: white;
  border-radius: 25px;
  padding: 40px;
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

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const TitleInput = styled.input`
  flex: 1;
  min-width: 300px;
  padding: 15px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  font-size: 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  background: white;
  color: #191818;
  
  &:focus {
    outline: none;
    border-color: #4ca2af;
    box-shadow: 0 0 0 3px rgba(76, 162, 175, 0.1);
  }
  
  &::placeholder {
    color: #ccc;
  }
`;

const CategorySelect = styled.select`
  padding: 12px 20px;
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

const EditorContent = styled.div`
  margin-bottom: 30px;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  min-height: 400px;
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  font-size: 1rem;
  line-height: 1.6;
  transition: all 0.3s ease;
  background: white;
  color: #333;
  resize: vertical;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  white-space: pre-wrap;
  word-wrap: break-word;
  
  &:focus {
    outline: none;
    border-color: #4ca2af;
    box-shadow: 0 0 0 3px rgba(76, 162, 175, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const EditorToolbar = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const ToolButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.active ? '#4ca2af' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 2px solid #4ca2af;
  border-radius: 10px;
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

const EditorActions = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
`;

const ActionButton = styled.button`
  padding: 12px 25px;
  background: ${props => props.primary ? 'linear-gradient(135deg, #4ca2af, #2c7994)' : 'white'};
  color: ${props => props.primary ? 'white' : '#4ca2af'};
  border: 2px solid #4ca2af;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(76, 162, 175, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
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
    animation: ${typewriter} 3s steps(40, end);
    overflow: hidden;
    white-space: nowrap;
  }
  
  p {
    font-size: 1rem;
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const CategoryTag = styled.span`
  padding: 4px 12px;
  background: ${props => {
    switch(props.category) {
      case 'learning': return 'rgba(76, 162, 175, 0.1)';
      case 'ideas': return 'rgba(46, 204, 113, 0.1)';
      case 'resources': return 'rgba(155, 89, 182, 0.1)';
      case 'reflection': return 'rgba(52, 152, 219, 0.1)';
      default: return 'rgba(243, 156, 18, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.category) {
      case 'learning': return '#4ca2af';
      case 'ideas': return '#2ecc71';
      case 'resources': return '#9b59b6';
      case 'reflection': return '#3498db';
      default: return '#f39c12';
    }
  }};
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid currentColor;
`;

// Simplified formatting helper function (only list formatting)
const applyListFormatting = (content, start, end) => {
  // Get the current line
  const lineStart = content.lastIndexOf('\n', start) + 1;
  const lineEnd = content.indexOf('\n', end);
  const currentLine = content.substring(lineStart, lineEnd === -1 ? content.length : lineEnd);
  
  let formattedText = '';
  
  if (currentLine.trim().startsWith('- ')) {
    // Remove bullet if it already exists
    formattedText = currentLine.replace(/^-\s*/, '');
  } else {
    // Add bullet
    formattedText = `- ${currentLine}`;
  }
  
  const newContent = content.substring(0, lineStart) + formattedText + content.substring(lineEnd === -1 ? content.length : lineEnd);
  
  return {
    content: newContent,
    cursorPosition: lineStart + formattedText.length
  };
};

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('learning');
  const [searchTerm, setSearchTerm] = useState('');
  const [autoSave, setAutoSave] = useState(true);
  const textareaRef = useRef(null);
  
  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
      if (parsedNotes.length > 0) {
        setActiveNote(parsedNotes[0].id);
        setTitle(parsedNotes[0].title);
        setContent(parsedNotes[0].content || '');
        setCategory(parsedNotes[0].category || 'learning');
      }
    }
  }, []);
  
  // Auto-save notes when changes are made
  useEffect(() => {
    if (autoSave && activeNote) {
      const saveTimeout = setTimeout(() => {
        saveNote();
      }, 1000);
      
      return () => clearTimeout(saveTimeout);
    }
  }, [title, content, category, autoSave]);
  
  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: 'Start typing here... ✨\n\nYou can use the list button to create bullet points!',
      category: 'learning',
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      lastEdited: new Date().toISOString()
    };
    
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
    setTitle(newNote.title);
    setContent(newNote.content);
    setCategory(newNote.category);
  };
  
  const selectNote = (noteId) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      setActiveNote(noteId);
      setTitle(note.title);
      setContent(note.content || '');
      setCategory(note.category || 'learning');
    }
  };
  
  const saveNote = () => {
    if (!activeNote) return;
    
    const updatedNotes = notes.map(note => {
      if (note.id === activeNote) {
        return {
          ...note,
          title: title || 'Untitled Note',
          content: content || '',
          category: category,
          lastEdited: new Date().toISOString(),
          date: note.date || new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };
      }
      return note;
    });
    
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };
  
  const deleteNote = (noteId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = notes.filter(note => note.id !== noteId);
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      
      if (activeNote === noteId) {
        if (updatedNotes.length > 0) {
          setActiveNote(updatedNotes[0].id);
          setTitle(updatedNotes[0].title);
          setContent(updatedNotes[0].content || '');
          setCategory(updatedNotes[0].category || 'learning');
        } else {
          setActiveNote(null);
          setTitle('');
          setContent('');
          setCategory('learning');
        }
      }
    }
  };
  
  const formatList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const result = applyListFormatting(content, start, end);
    setContent(result.content);
    
    // Update cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(result.cursorPosition, result.cursorPosition);
    }, 0);
  };
  
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const currentNote = notes.find(note => note.id === activeNote);
  
  // Calculate word count from plain text
  const plainText = content ? content.replace(/\s+/g, ' ').trim() : '';
  const wordCount = plainText.length > 0 ? plainText.split(' ').filter(word => word.length > 0).length : 0;
  const charCount = plainText.length;
  
  const categories = [
    { value: 'learning', label: '📚 Learning', color: '#4ca2af' },
    { value: 'ideas', label: '💡 Ideas', color: '#2ecc71' },
    { value: 'resources', label: '🔗 Resources', color: '#9b59b6' },
    { value: 'reflection', label: '🤔 Reflection', color: '#3498db' },
    { value: 'other', label: '📝 Other', color: '#f39c12' }
  ];
  
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
          <NavButton to="/todo">
            ✅ To-Do List
          </NavButton>
          <NavButton to="/notes" end>
            📓 Notes
          </NavButton>
          <NavButton to="/home">
            📈 Learning Style
          </NavButton>
        </NavLinks>
      </NavBar>

      <ContentContainer>
        <HeroSection>
          <HeroTitle>Your Digital Notebook 📖</HeroTitle>
          <HeroSubtitle>
            Capture ideas, organize thoughts, and reflect on your learning journey. 
            Everything saves automatically!
          </HeroSubtitle>
        </HeroSection>

        <NotesContainer>
          <Sidebar>
            <SidebarTitle>
              <span className="sidebar-icon">📋</span>
              Your Notes
            </SidebarTitle>
            
            {/* Search Input */}
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="🔍 Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
            
            <NewNoteButton onClick={createNewNote}>
              <span className="button-icon">➕</span>
              Create New Note
            </NewNoteButton>
            
            {notes.length > 0 ? (
              <NoteList>
                {filteredNotes.map(note => (
                  <NoteItem 
                    key={note.id} 
                    active={activeNote === note.id}
                    onClick={() => selectNote(note.id)}
                  >
                    <div className="note-title">
                      <span>{note.title}</span>
                      <button 
                        className="delete-btn"
                        onClick={(e) => deleteNote(note.id, e)}
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="note-preview">
                      {note.content ? note.content.substring(0, 50) : ''}...
                    </div>
                    <div className="note-date">
                      📅 {note.date}
                    </div>
                    <CategoryTag category={note.category}>
                      {categories.find(c => c.value === note.category)?.label}
                    </CategoryTag>
                  </NoteItem>
                ))}
              </NoteList>
            ) : (
              <EmptyState>
                <div className="empty-icon">📝</div>
                <h3>No notes yet!</h3>
                <p>Create your first note to start documenting your learning journey.</p>
              </EmptyState>
            )}
          </Sidebar>
          
          <EditorContainer>
            {currentNote ? (
              <>
                <EditorHeader>
                  <TitleInput
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note Title"
                  />
                  <CategorySelect 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </CategorySelect>
                </EditorHeader>
                
                <EditorToolbar>
                  <ToolButton onClick={formatList}>
                    <span>•</span> List
                  </ToolButton>
                  <ToolButton 
                    active={autoSave}
                    onClick={() => setAutoSave(!autoSave)}
                  >
                    {autoSave ? '💾 Auto-save: ON' : '⏸️ Auto-save: OFF'}
                  </ToolButton>
                </EditorToolbar>
                
                <EditorContent>
                  <ContentTextarea
                    ref={textareaRef}
                    id="note-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start typing your notes here... ✨

Tip: Click the 'Toggle List' button to add/remove bullet points from the current line!"
                  />
                </EditorContent>
                
                <div style={{ 
                  marginTop: '20px', 
                  padding: '15px', 
                  background: '#f8f9fa', 
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  color: '#666',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <span>📝 Words: {wordCount}</span>
                    <span>🔤 Characters: {charCount}</span>
                    <span>💾 {autoSave ? 'Auto-saving...' : 'Manual save only'}</span>
                    <span>📄 Category: {categories.find(c => c.value === category)?.label}</span>
                  </div>
                </div>
                
                <EditorActions>
                  <ActionButton onClick={saveNote} primary>
                    <span>💾</span>
                    Save Note
                  </ActionButton>
                  <ActionButton onClick={() => window.print()}>
                    <span>🖨️</span>
                    Print
                  </ActionButton>
                </EditorActions>
              </>
            ) : (
              <EmptyState>
                <div className="empty-icon">✏️</div>
                <h3>Select or create a note to start editing</h3>
                <p>Your notes are automatically saved as you type.</p>
              </EmptyState>
            )}
          </EditorContainer>
        </NotesContainer>

        <StatsGrid>
          <StatCard>
            <StatNumber>{notes.length}</StatNumber>
            <StatLabel>Total Notes</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>{wordCount}</StatNumber>
            <StatLabel>Words in Current Note</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>{notes.filter(n => n.category === 'learning').length}</StatNumber>
            <StatLabel>Learning Notes</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>
              {notes.length > 0 
                ? new Date(Math.max(...notes.map(n => new Date(n.lastEdited)))).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : 'No edits'
              }
            </StatNumber>
            <StatLabel>Last Edited</StatLabel>
          </StatCard>
        </StatsGrid>
      </ContentContainer>
    </PageContainer>
  );
};

export default Notes;