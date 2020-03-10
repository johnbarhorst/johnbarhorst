import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';




const FramerCarousel = ({ slidesArray }) => {
  const [[slide, direction], setSlide] = useState([0, 0]);

  const paginate = (direction) => {
    setSlide([slide + direction, direction]);
  }

  const wrapNumber = (min, max, num) => {
    const rangeSize = max - min;
    return ((((num - min) % rangeSize) + rangeSize) % rangeSize) + min;
  }

  const index = wrapNumber(0, slidesArray.length + 1, slide);

  return (
    <div>
      <AnimatePresence>
        <SlideDisplay
          key={slide}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          background={slidesArray[index]}
          onDragEnd={(event, { offset, velocity }) => {
            if (offset.x > 0) {
              paginate(1);
            } else {
              paginate(-1);
            }
          }}
          exit={{
            opacity: 0
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
`;