import { Outlet } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Navigation from '../components/Navigation.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function AppLayout() {
  const { me, onSwitchProfile } = useApp();

  return (
    <>
      <div className="page">
        <header className="top">
          <div className="serif brand">
            <Heart size={18} color="#DFA6A0" />
            Twogether
          </div>
          <button className="chip" onClick={onSwitchProfile}>
            {me.emoji} Switch
          </button>
        </header>

        <Outlet />
      </div>
      <Navigation />
    </>
  );
}
