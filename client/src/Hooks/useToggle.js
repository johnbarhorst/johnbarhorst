import { useState } from 'react';

// Pass second param true to use bracket notation and rename toggle outputs

export const useToggle = (initial, renameable = false) => {
  const [isToggled, setToggle] = useState(initial);
  const toggle = () => setToggle(prev => !prev);
  return renameable ? [isToggled, setToggle, toggle] : { isToggled, setToggle, toggle };
}