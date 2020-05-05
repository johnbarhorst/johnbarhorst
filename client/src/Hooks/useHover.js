import { useMemo, useState } from 'react';

export const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [[enterX, enterY], setEnterXY] = useState([null, null]);
  const [[exitX, exitY], setExitXY] = useState([null, null]);


  const bind = useMemo(() => {
    return {
      onMouseOver: (e) => {
        setEnterXY([e.clientX, e.clientY]);
        setIsHovered(true);
      },
      onMouseLeave: (e) => {
        setExitXY([e.clientX, e.clientY]);
        setIsHovered(false);
      }
    }
  }, []);
  return [isHovered, bind, [enterX, enterY], [exitX, exitY]]
}