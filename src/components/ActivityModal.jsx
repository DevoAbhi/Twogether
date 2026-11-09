import { useState } from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import { api } from '../services/api.js';
import { useApp } from '../context/AppContext.jsx';

export default function ActivityModal({ activity, onClose }) {
  const { me, toast, celebrate, refresh } = useApp();
  const [minutes, setMinutes] = useState(30);
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState(null);
  const [saving, setSaving] = useState(false);
  // One id per modal, so a double click or retry can never count twice.
  const [requestId] = useState(() => crypto.randomUUID());

  // Preview only. The server calculates the real XP.
  const estimatedXp = activity.per30
    ? Math.floor(minutes / 30) * activity.xp
    : activity.xp;

  async function submit() {
    setSaving(true);
    try {
      const form = new FormData();
      form.append('profileId', me._id);
      form.append('activityId', activity._id);
      form.append('requestId', requestId);
      form.append('minutes', String(minutes));
      form.append('notes', notes);
      if (photo) form.append('photo', photo);

      const result = await api('/activities/submit', { method: 'POST', body: form });
      onClose();
      refresh();
      celebrate(`+${result.xp} XP ❤️`);
    } catch (error) {
      toast(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal onClose={onClose}>
      <h3 className="serif">{activity.name}</h3>
      <p className="muted spaced">{activity.description}</p>

      {activity.per30 && (
        <label className="muted">
          Duration (minutes)
          <input
            className="input"
            type="number"
            min={0}
            step={5}
            value={minutes}
            onChange={(event) => setMinutes(Number(event.target.value))}
          />
        </label>
      )}

      <input
        className="input"
        placeholder="Notes (optional)"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        className="spaced"
        onChange={(event) => setPhoto(event.target.files[0] || null)}
      />

      <div className="serif center estimate">+{estimatedXp} XP</div>
      <Button disabled={saving || estimatedXp < 1} onClick={submit}>
        {saving ? 'Saving…' : 'Add to our world'}
      </Button>
    </Modal>
  );
}
