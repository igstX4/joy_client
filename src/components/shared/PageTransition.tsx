import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      style={{width: '100%'}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
