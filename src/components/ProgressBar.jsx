import { motion } from 'framer-motion';

// segments: [{ percent: 0-100, dark?: boolean }]
export default function ProgressBar({ segments }) {
  return (
    <div className="bar">
      {segments.map((segment, index) => (
        <motion.i
          key={index}
          className={segment.dark ? 'dark' : ''}
          initial={{ width: 0 }}
          animate={{ width: `${segment.percent}%` }}
        />
      ))}
    </div>
  );
}
