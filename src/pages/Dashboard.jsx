import { NavLink } from 'react-router-dom';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Skeleton from '../components/Skeleton.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { formatXp } from '../utils/format.js';

function WalletCard({ wallet, level }) {
  return (
    <Card className="hero">
      <div className="muted">Shared wallet</div>
      <div className="serif big-number">
        <AnimatedCounter value={wallet.available} /> <span className="unit">XP</span>
      </div>
      <p className="muted">Your little world is growing!</p>

      <div className="row centered stats">
        <span className="muted">Lifetime {formatXp(wallet.lifetime)}</span>
        <span className="muted">Spent {formatXp(wallet.spent)}</span>
      </div>

      <p className="level">
        Level {level.n} · {level.name}
      </p>
      <ProgressBar segments={[{ percent: level.progress * 100 }]} />
    </Card>
  );
}

function ContributionCard({ profiles, wallet }) {
  const [first, second] = profiles;
  const earnedFirst = wallet.earned?.[first._id] || 0;
  const earnedSecond = wallet.earned?.[second._id] || 0;
  const total = earnedFirst + earnedSecond || 1;

  return (
    <Card>
      <div className="muted">Who's contributed</div>
      <ProgressBar
        segments={[
          { percent: (earnedFirst / total) * 100, dark: true },
          { percent: (earnedSecond / total) * 100 },
        ]}
      />
      <div className="between small">
        <span>{first.name} – {formatXp(earnedFirst)} XP</span>
        <span>{second.name} – {formatXp(earnedSecond)} XP</span>
      </div>
    </Card>
  );
}

function NextRewardCard({ next, available }) {
  return (
    <Card>
      <div className="muted">Your next adventure awaits!</div>
      {next ? (
        <>
          <div className="serif next-title">
            {next.reward.emoji} {next.reward.name}
          </div>
          <ProgressBar
            segments={[{ percent: Math.min(100, (available / next.reward.xp) * 100), dark: true }]}
          />
          <div className="small">Just {formatXp(next.need)} more XP! ❤️</div>
        </>
      ) : (
        <div className="serif">You can afford everything! 🎉</div>
      )}
    </Card>
  );
}

function RecentActivity({ items }) {
  return (
    <Card>
      <div className="strong spaced">Recent activity</div>
      {items.length === 0 && <p className="muted">Nothing yet. Earn your first XP! ✨</p>}
      {items.map((item) => (
        <div className="line" key={item._id}>
          {item.description}
        </div>
      ))}
    </Card>
  );
}

export default function Dashboard() {
  const { me } = useApp();
  const data = useFetch('/dashboard');

  if (!data) return <Skeleton />;

  return (
    <>
      <h2 className="serif">
        Hey {me.name}! {me.emoji}
      </h2>

      <WalletCard wallet={data.wallet} level={data.level} />
      <ContributionCard profiles={data.profiles} wallet={data.wallet} />

      <div className="two">
        <NavLink to="/earn"><Button>Earn XP</Button></NavLink>
        <NavLink to="/rewards"><Button variant="rose">Explore Rewards</Button></NavLink>
      </div>

      <NextRewardCard next={data.next} available={data.wallet.available} />
      <RecentActivity items={data.recent} />
    </>
  );
}
