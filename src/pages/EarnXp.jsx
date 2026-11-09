import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Skeleton from '../components/Skeleton.jsx';
import ActivityCard from '../components/ActivityCard.jsx';
import ActivityModal from '../components/ActivityModal.jsx';
import { useFetch } from '../hooks/useFetch.js';

const CATEGORIES = ['Fitness', 'Learning', 'Lifestyle'];

export default function EarnXp() {
  const activities = useFetch('/activities');
  const [selected, setSelected] = useState(null);

  if (!activities) return <Skeleton />;

  return (
    <>
      <h2 className="serif">Earn XP</h2>

      {CATEGORIES.map((category) => (
        <section key={category}>
          <div className="muted spaced">{category}</div>
          <div className="grid">
            {activities
              .filter((activity) => activity.category === category)
              .map((activity) => (
                <ActivityCard key={activity._id} activity={activity} onSelect={setSelected} />
              ))}
          </div>
        </section>
      ))}

      <AnimatePresence>
        {selected && (
          <ActivityModal key={selected._id} activity={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
