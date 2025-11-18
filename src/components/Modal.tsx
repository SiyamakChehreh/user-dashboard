import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
  slideDirection?: { x: number; opacity: number };
}

export default function Modal({ children, onClose, className = '', slideDirection }: ModalProps) {
  const initialSlide = slideDirection || { x: 0, opacity: 0 };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}>
        <motion.div
          className={`bg-white dark:bg-gray-800 border-2 rounded-lg shadow-lg p-6 w-full max-w-lg ${className}`}
          initial={initialSlide}
          animate={{ x: 0, opacity: 1 }}
          exit={initialSlide}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={e => e.stopPropagation()}>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
