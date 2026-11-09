import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Card from '../components/Card.jsx';
import Skeleton from '../components/Skeleton.jsx';
import RewardCard from '../components/RewardCard.jsx';
import RedeemModal from '../components/RedeemModal.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { sendJson } from '../services/api.js';
import { formatXp } from '../utils/format.js';

function Experiences({ redemptions, onComplete }) {
  return (
    <Card>
      <div className="strong spaced">Our experiences</div>
      {redemptions.map((item) => (
        <div className="line between" key={item._id}>
          <span>
            {item.reward?.emoji} {item.reward?.name} · {item.by?.name}
          </span>
          {item.status === 'Completed' ? (
            <span className="accent">Completed ✓</span>
          ) : (
            <button className="chip" onClick={() => onComplete(item._id)}>
              Mark completed
            </button>
          )}
        </div>
      ))}
    </Card>
  );
}

export default function RewardStore() {
  const { refresh } = useApp();
  const store = useFetch('/rewards');
  const wallet = useFetch('/wallet');
  const [selected, setSelected] = useState(null);

  if (!store || !wallet) return <Skeleton />;

  async function markCompleted(id) {
    await sendJson(`/rewards/redemptions/${id}`, { status: 'Completed' }, 'PATCH');
    refresh();
  }

  return (
    <>
      <h2 className="serif">Reward Store</h2>
      <div className="muted">Available: {formatXp(wallet.available)} XP</div>

      <div className="grid">
        {store.rewards.map((reward) => (
          <RewardCard
            key={reward._id}
            reward={reward}
            available={wallet.available}
            onRedeem={setSelected}
          />
        ))}
      </div>

      {store.redemptions.length > 0 && (
        <Experiences redemptions={store.redemptions} onComplete={markCompleted} />
      )}

      <AnimatePresence>
        {selected && (
          <RedeemModal
            key={selected._id}
            reward={selected}
            available={wallet.available}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
