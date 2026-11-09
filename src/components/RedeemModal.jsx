import { useState } from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import { sendJson } from '../services/api.js';
import { useApp } from '../context/AppContext.jsx';
import { formatXp } from '../utils/format.js';

export default function RedeemModal({ reward, available, onClose }) {
  const { me, toast, celebrate, refresh } = useApp();
  const [requestId] = useState(() => crypto.randomUUID());
  const [saving, setSaving] = useState(false);

  async function confirm() {
    setSaving(true);
    try {
      await sendJson('/rewards/redeem', { profileId: me._id, rewardId: reward._id, requestId });
      onClose();
      refresh();
      celebrate(`${reward.emoji} Enjoy your ${reward.name}!`);
    } catch (error) {
      toast(error.message);
      setSaving(false);
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="center">
        <div className="big-emoji">{reward.emoji}</div>
        <h3 className="serif">{reward.name}</h3>
        <p className="spaced">
          Cost {formatXp(reward.xp)} XP · Balance {formatXp(available)} XP
        </p>
        <p className="muted spaced">Redeem this together?</p>
        <Button disabled={saving} onClick={confirm}>
          Yes, redeem ❤️
        </Button>
      </div>
    </Modal>
  );
}
