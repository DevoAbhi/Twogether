import { AnimatePresence, motion } from 'framer-motion';

export default function Celebration({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="celebration serif"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div>
            {message}
            <div className="celebration-emoji">✨💖✨</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
