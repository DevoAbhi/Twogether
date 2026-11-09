import Card from './Card.jsx';
import ProgressBar from './ProgressBar.jsx';
import { formatXp } from '../utils/format.js';

export default function AchievementCard({ achievement }) {
  const { icon, name, description, value, goal, unlocked } = achievement;

  return (
    <Card>
      <div className={`achievement ${unlocked ? '' : 'locked'}`}>
        <div className="achievement-icon">{unlocked ? icon : '🔒'}</div>
        <div className="grow">
          <div className="strong">{name}</div>
          <div className="muted">{description}</div>
          <ProgressBar segments={[{ percent: (value / goal) * 100 }]} />
          <div className="muted">
            {formatXp(value)} / {formatXp(goal)}
          </div>
        </div>
      </div>
    </Card>
  );
}
