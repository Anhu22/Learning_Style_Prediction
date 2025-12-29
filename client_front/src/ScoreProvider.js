import React, { createContext, useState, useEffect } from "react";

// Create a context
export const ScoreContext = createContext();

// Provide the context to the app
export const ScoreProvider = ({ children }) => {
  const [scores, setScores] = useState({
    readwrite: null,
    visual: null,
    kinesthetic: null,
    audio: null,
  });

  useEffect(() => {
    // Load progress from localStorage on mount
    const progress = JSON.parse(localStorage.getItem('progress'));
    if (progress) {
      setScores({
        readwrite: progress.readScore || 0,
        visual: progress.visualScore || 0,
        kinesthetic: progress.kinestheticScore || 0,
        audio: progress.audioScore || 0,
      });
    }
  }, []);

  const setReadwriteScore = (score) => {
    setScores((prevScores) => ({ ...prevScores, readwrite: score }));
  };

  const setVisualScore = (score) => {
    setScores((prevScores) => ({ ...prevScores, visual: score }));
  };

  const setKinestheticScore = (score) => {
    setScores((prevScores) => ({ ...prevScores, kinesthetic: score }));
  };

  const setAudioScore = (score) => {
    setScores((prevScores) => ({ ...prevScores, audio: score }));
  };

  return (
    <ScoreContext.Provider value={{ 
      scores, 
      setReadwriteScore, 
      setVisualScore, 
      setKinestheticScore, 
      setAudioScore 
    }}>
      {children}
    </ScoreContext.Provider>
  );
};