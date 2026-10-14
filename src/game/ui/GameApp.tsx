import { useState } from 'react';
import { createInitial } from '../engine/logic';
import { MohuGame, TriviaGame } from './minigames';

export function GameApp() {
  const [state] = useState(() => createInitial('Márton Kelényi'));
  const [screen, setScreen] = useState<'menu' | 'mohu' | 'trivia'>('menu');

  if (screen === 'mohu') {
    return (
      <MohuGame
        onDone={(pay) => {
          alert(`MOHU: +${pay.toLocaleString('hu-HU')} Ft`);
          setScreen('menu');
        }}
        onCancel={() => setScreen('menu')}
      />
    );
  }

  if (screen === 'trivia') {
    return (
      <TriviaGame
        onDone={(pay) => {
          alert(`Iratellenőrzés: +${pay.toLocaleString('hu-HU')} Ft`);
          setScreen('menu');
        }}
        onCancel={() => setScreen('menu')}
      />
    );
  }

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'serif', background: '#1c1614', color: '#f3e6d0', minHeight: '100vh' }}>
      <h1>Ligetvár</h1>
      <p>Féléves pixeles randiszimulátor — motor kész, UI bővítés alatt.</p>
      <p>Hét: {state.week} · Pénz: {state.money.toLocaleString('hu-HU')} Ft · Energia: {state.energy}</p>
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        <button className="pixel-btn" onClick={() => setScreen('mohu')}>MOHU minijáték</button>
        <button className="pixel-btn" onClick={() => setScreen('trivia')}>Iratellenőrzés / kérdőív</button>
      </div>
      <p style={{ marginTop: '2rem', opacity: 0.7, fontSize: '0.9rem' }}>
        A teljes tervező, dialógusjelenetek és portrék a következő bővítésekben érkeznek. A motor headless tesztelhető: <code>npm run test:engine</code>
      </p>
    </div>
  );
}
