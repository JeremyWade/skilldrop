import React, { useState } from 'react';
import { IDKitWidget } from '@worldcoin/idkit';

export default function App() {
  const [verified, setVerified] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleProof = (proof) => {
    console.log('Verified proof:', proof);
    setVerified(true);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>SkillDrop</h1>
      {!verified ? (
        <IDKitWidget
          app_id="app_ba2c7b4a8490c8f0b82328cf81e02cda"
          action="skilldrop-demo"
          signal="user"
          onSuccess={handleProof}
        >
          {({ open }) => <button onClick={open}>Verify with World ID</button>}
        </IDKitWidget>
      ) : !completed ? (
        <>
          <p>What’s one benefit of AI in education?</p>
          <button onClick={() => setCompleted(true)}>Submit Answer</button>
        </>
      ) : (
        <p>✅ You earned 1 WLD! (Simulated)</p>
      )}
    </main>
  );
}
