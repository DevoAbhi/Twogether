import { motion } from 'framer-motion';

export default function ProfileSelect({ profiles, onSelect }) {
  return (
    <div className="full-screen">
      <div className="center select-wrap">
        <h1 className="serif select-title">Who's entering Our Little World?</h1>

        <div className="two">
          {profiles.map((profile) => (
            <motion.button
              key={profile._id}
              className="profile-card"
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(profile)}
            >
              <div className="avatar">{profile.emoji}</div>
              <div className="serif profile-name">{profile.name}</div>
              <div className="muted">{profile.note}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
