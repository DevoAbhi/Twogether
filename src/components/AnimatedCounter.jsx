import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';
import { formatXp } from '../utils/format.js';

export default function AnimatedCounter({ value }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const controls = animate(shown, value, { duration: 0.9, onUpdate: setShown });
    return () => controls.stop();
  }, [value]);

  return <>{formatXp(shown)}</>;
}
