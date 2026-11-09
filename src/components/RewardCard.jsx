import Card from './Card.jsx';
import Button from './Button.jsx';
import { formatXp } from '../utils/format.js';

export default function RewardCard({ reward, available, onRedeem }) {
  const missing = reward.xp - available;

  return (
    <Card className="center">
      <div className="tile">{reward.emoji}</div>
      <div className="strong">{reward.name}</div>
      <div className="muted">{reward.description}</div>
      <div className="serif price">{formatXp(reward.xp)} XP</div>

      {missing > 0 && (
        <div className="muted spaced">
          Just {formatXp(missing)} more XP until your next {reward.name.toLowerCase()}! ❤️
        </div>
      )}

      <Button disabled={missing > 0} onClick={() => onRedeem(reward)}>
        Redeem
      </Button>
    </Card>
  );
}
