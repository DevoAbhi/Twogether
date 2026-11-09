import { motion } from 'framer-motion';

export default function Button({ variant = '', className = '', ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={`btn ${variant} ${className}`}
      {...props}
    />
  );
}
