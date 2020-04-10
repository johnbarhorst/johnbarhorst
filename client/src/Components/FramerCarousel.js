import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  enter: ({ direction }) => {
    return {
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    }
  },
  active: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: ({ direction }) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    }
  }
}


const FramerCarousel = ({ slidesArray, autoSlide = true, timer = 5000 }) => {
  const [[slide, direction], setSlide] = useState([0, 0]);

  const paginate = (direction) => {
    setSlide([slide + direction, direction]);
  }

  const wrapNumber = (min, max, num) => {
    const rangeSize = max - min;
    return ((((num - min) % rangeSize) + rangeSize) % rangeSize) + min;
  }

  const index = wrapNumber(0, slidesArray.length, slide);

  useEffect(() => {
    let automation = autoSlide ? setTimeout(() => {
      paginate(-1);
    }, timer) : null;

    return () => {
      if (autoSlide) {
        clearTimeout(automation);
      }
    };
  });

  return (
    <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
      <AnimatePresence custom={{ direction }} initial={false} >
        <SlideDisplay
          key={slide}
          background={slidesArray[index]}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(event, { offset, velocity }) => {
            if (offset.x > 200) {
              paginate(1);
            } else if (offset.x < -200) {
              paginate(-1);
            }
          }}
          custom={{ direction }}
          variants={variants}
          initial='enter'
          animate='active'
          exit='exit'
          transition={{
            x: {
              type: 'spring',
              stiffness: 300,
              damping: 200,
            },
            opacity: { duration: .2 }
          }}
        />
      </AnimatePresence>
    </div>
  )
}

export default FramerCarousel;

const SlideDisplay = styled(motion.div)`
  height: 300px;
  width: 100%;
  background: ${props => props.background};
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
`;