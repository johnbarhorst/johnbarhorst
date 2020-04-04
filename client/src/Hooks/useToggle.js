import { useState } from 'react';

export const useToggle = initial => {
  const [isToggled, setToggle] = useState(initial);
  const toggle = () => setToggle(prev => !prev);
  return { isToggled, setToggle, toggle };
}