import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { useApp } from '../context/AppContext.jsx';

// Loads data from the API and reloads it after any action (earn, redeem...).
export function useFetch(path) {
  const { refreshKey } = useApp();
  const [data, setData] = useState(null);

  useEffect(() => {
    api(path)
      .then(setData)
      .catch(() => setData(null));
  }, [path, refreshKey]);

  return data;
}
