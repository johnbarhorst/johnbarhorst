import React, { useState } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue } from 'framer-motion';

const SwipeToDismiss = ({ children }) => {
  const [isActive, setIsActive] = useState(true);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          exit={{ opacity: 0, overflow: 'hidden', height: 0 }}
          transition={{ opacity: { duration: 0 } }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(event, info) => {
            if (Math.abs(info.point.x) > 200) {
              setIsActive(false);
            }
          }}
          style={{
            x,
            opacity
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SwipeToDismiss;