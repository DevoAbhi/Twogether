import Skeleton from '../components/Skeleton.jsx';
import AchievementCard from '../components/AchievementCard.jsx';
import { useFetch } from '../hooks/useFetch.js';

export default function Achievements() {
  const achievements = useFetch('/achievements');

  if (!achievements) return <Skeleton />;

  return (
    <>
      <h2 className="serif">Achievements</h2>
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </>
  );
}
