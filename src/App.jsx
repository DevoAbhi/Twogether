import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { api } from './services/api.js';
import { AppProvider } from './context/AppContext.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import AccessGate from './pages/AccessGate.jsx';
import ProfileSelect from './pages/ProfileSelect.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EarnXp from './pages/EarnXp.jsx';
import RewardStore from './pages/RewardStore.jsx';
import Achievements from './pages/Achievements.jsx';
import History from './pages/History.jsx';

const loadSavedProfile = () => JSON.parse(localStorage.getItem('olw_me') || 'null');

export default function App() {
  const [checked, setChecked] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [me, setMe] = useState(loadSavedProfile);

  // If a saved access code works, skip the gate.
  useEffect(() => {
    api('/profiles')
      .then((list) => { setProfiles(list); setAuthorized(true); })
      .catch(() => {})
      .finally(() => setChecked(true));
  }, [authorized]);

  function selectProfile(profile) {
    localStorage.setItem('olw_me', JSON.stringify(profile));
    setMe(profile);
  }

  function switchProfile() {
    localStorage.removeItem('olw_me');
    setMe(null);
  }

  if (!checked) return null;
  if (!authorized) return <AccessGate onSuccess={() => setAuthorized(true)} />;
  if (!me) return <ProfileSelect profiles={profiles} onSelect={selectProfile} />;

  return (
    <AppProvider me={me} profiles={profiles} onSwitchProfile={switchProfile}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/earn" element={<EarnXp />} />
          <Route path="/rewards" element={<RewardStore />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}
