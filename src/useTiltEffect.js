// Create a new file called useTiltEffect.js
import { useState, useRef, useEffect } from 'react';

export const useTiltEffect = () => {
  const ref = useRef(null);
  const [transform, setTransform] = useState('');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      const tiltX = (y - 0.5) * 20; // 20 degrees max tilt
      const tiltY = (0.5 - x) * 20;
      
      setTransform(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`);
    };

    const handleMouseLeave = () => {
      setTransform('perspective(1000px) rotateX(0) rotateY(0)');
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { ref, style: { transform } };
};