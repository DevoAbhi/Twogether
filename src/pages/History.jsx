import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Card from '../components/Card.jsx';
import Modal from '../components/Modal.jsx';
import Skeleton from '../components/Skeleton.jsx';
import HistoryItem from '../components/HistoryItem.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { photoUrl } from '../services/api.js';

export default function History() {
  const { profiles } = useApp();
  const [type, setType] = useState('all');   // all | activities | redemptions
  const [profileId, setProfileId] = useState('');
  const [openPhoto, setOpenPhoto] = useState('');

  const query = `/history?filter=${type}${profileId ? `&profileId=${profileId}` : ''}`;
  const items = useFetch(query);

  const chipClass = (active) => `chip ${active ? 'on' : ''}`;
  const chooseType = (value) => { setType(value); setProfileId(''); };

  return (
    <>
      <h2 className="serif">History</h2>

      <div className="row">
        <button className={chipClass(!profileId && type === 'all')} onClick={() => chooseType('all')}>
          All
        </button>
        {profiles.map((profile) => (
          <button
            key={profile._id}
            className={chipClass(profileId === profile._id)}
            onClick={() => setProfileId(profile._id)}
          >
            {profile.name}
          </button>
        ))}
        <button className={chipClass(type === 'activities')} onClick={() => chooseType('activities')}>
          Activities
        </button>
        <button className={chipClass(type === 'redemptions')} onClick={() => chooseType('redemptions')}>
          Redemptions
        </button>
      </div>

      {!items && <Skeleton />}
      {items && items.length === 0 && <Card className="center muted">Nothing here yet 🌱</Card>}
      {items && items.length > 0 && (
        <div className="timeline">
          {items.map((item) => (
            <HistoryItem key={item.id} item={item} onOpenPhoto={setOpenPhoto} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {openPhoto && (
          <Modal onClose={() => setOpenPhoto('')}>
            <img src={photoUrl(openPhoto)} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
