import React from 'react';
import { motion } from 'framer-motion';

const AnimateTypewriter = ({ string }) => {
  return (
    <>
      {string.split('').map((char, i) => <motion.span key={i} variants={typedVariant}>{char}</motion.span>)}
    </>
  )
}

export default AnimateTypewriter;

const typedVariant = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0
    }
  }
}

export const typewriterVariants = {
  initial: {
    transition: {
      staggerChildren: .1
    }
  },
  animate: {
    transition: {
      staggerChildren: .1
    }
  }
}