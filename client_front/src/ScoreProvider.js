import React, { createContext, useState, useEffect } from "react";

// Create a context
export const ScoreContext = createContext();

// Provide the context to the app
export const ScoreProvider = ({ children }) => {
  const [scores, setScores] = useState({
    read: null,
    video: null,
    kinesthetic: null,
    audio: null,
  });

  useEffect(() => {
    // Load progress from localStorage on mount
    const progress = JSON.parse(localStorage.getItem('progress'));
    if (progress) {
      setScores({
        read: progress.readScore || 0,
        video: progress.visualScore || 0,
        kinesthetic: progress.kinestheticScore || 0,
        audio: progress.audioScore || 0,
      });
    }
  }, []);

  const setReadScore = (score) => {
    setScores((prevScores) => ({ ...prevScores, read: score }));
  };

  const setVideoScore = (score) => {
    setScores((prevScores) => ({ ...prevScores, video: score }));
  };

  const setKinestheticScore = (score) => {
    setScores((prevScores) => ({ ...prevScores, kinesthetic: score }));
  };

  const setAudioScore = (score) => {
    setScores((prevScores) => ({ ...prevScores, audio: score }));
  };

  return (
    <ScoreContext.Provider value={{ scores, setReadScore, setVideoScore, setKinestheticScore, setAudioScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
