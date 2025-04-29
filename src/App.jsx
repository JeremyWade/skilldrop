import React, { useState, useEffect } from 'react';
import { IDKitWidget } from '@worldcoin/idkit';
import challenges from './challenges';

export default function App() {
  const [verified, setVerified] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(0);

  // Load streak from localStorage
  useEffect(() => {
    const lastDate = localStorage.getItem('lastCompletedDate');
    const savedStreak = parseInt(localStorage.getItem('streak') || '0', 10);
    const today = new Date().toDateString();

    if (lastDate === today) {
      setStreak(savedStreak); // already completed today
      setCompleted(true);
    } else if (lastDate && new Date(today) - new Date(lastDate) === 86400000) {
      setStreak(savedStreak + 1);
    } else {
      setStreak(savedStreak > 0 ? 1 : 0); // reset or start streak
    }

    // Pick a random challenge
    const random = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(random);
  }, []);

  const handleProof = (proof) => {
    console.log('World ID verified:', proof);
    setVerified(true);
  };

  const handleAnswer = (index) => {
    if (index === challenge.correct) {
      const today = new Date().toDateString();
      localStorage.setItem('lastCompletedDate', today);
      localStorage.setItem('streak', streak + 1);
      setStreak(streak + 1);
      setCompleted(true);
    } else {
      alert('Try again!');
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>SkillDrop</h1>
      {!verified ? (
        <IDKitWidget
          app_id="app_ba2c7b4a8490c8f0b82328cf81e02cda"
          action="skilldrop-challenge"
          signal="user"
          onSuccess={handleProof}
        >
          {({ open }) => <button onClick={open}>Verify with World ID</button>}
        </IDKitWidget>
      ) : !completed ? (
        <>
          <p><strong>{challenge?.question}</strong></p>
          {challenge?.options.map((opt, idx) => (
            <div key={idx} style={{ margin: '8px' }}>
              <button onClick={() => handleAnswer(idx)}>{opt}</button>
            </div>
          ))}
        </>
      ) : (
        <>
          <p>✅ You earned 1 WLD (simulated)!</p>
          <p>🔥 Current streak: {streak} day{streak !== 1 ? 's' : ''}</p>
        </>
      )}
    </main>
  );
}