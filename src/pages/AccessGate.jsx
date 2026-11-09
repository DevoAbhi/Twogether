import { useState } from 'react';
import { Lock } from 'lucide-react';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import { api, setAccessCode } from '../services/api.js';

export default function AccessGate({ onSuccess }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  async function enter() {
    setAccessCode(code);
    try {
      await api('/check');
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="full-screen">
      <Card className="center gate">
        <Lock color="#DFA6A0" />
        <h1 className="serif">Our Little World ❤️</h1>
        <p className="muted spaced">Enter your secret code</p>

        <input
          className="input"
          type="password"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && enter()}
        />
        {error && <p className="error">{error}</p>}
        <Button onClick={enter}>Enter</Button>
      </Card>
    </div>
  );
}
