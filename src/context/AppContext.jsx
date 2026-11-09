import { createContext, useCallback, useContext, useState } from 'react';
import Toast from '../components/Toast.jsx';
import Celebration from '../components/Celebration.jsx';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export function AppProvider({ me, profiles, onSwitchProfile, children }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [celebration, setCelebration] = useState('');

  const toast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  }, []);

  const celebrate = useCallback((message) => {
    setCelebration(message);
    setTimeout(() => setCelebration(''), 2200);
  }, []);

  // Pages reload their data whenever refreshKey changes.
  const refresh = useCallback(() => setRefreshKey((key) => key + 1), []);

  return (
    <AppContext.Provider value={{ me, profiles, onSwitchProfile, toast, celebrate, refresh, refreshKey }}>
      {children}
      <Toast message={toastMessage} />
      <Celebration message={celebration} />
    </AppContext.Provider>
  );
}
