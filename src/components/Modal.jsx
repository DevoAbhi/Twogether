import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ onClose, children }) {
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}
