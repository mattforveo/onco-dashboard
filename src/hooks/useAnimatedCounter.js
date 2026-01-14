import { useState, useEffect, useRef } from 'react';

/**
 * Hook for animating a number from 0 to target value
 * @param {number} end - Target value
 * @param {number} duration - Animation duration in ms
 * @param {number} delay - Delay before starting animation in ms
 * @returns {number} Current animated value
 */
export const useAnimatedCounter = (end, duration = 2000, delay = 0) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (typeof end !== 'number' || isNaN(end)) {
      setCount(0);
      return;
    }

    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const startValue = 0;
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = Math.round(startValue + (end - startValue) * easeOut);
        
        if (currentValue !== countRef.current) {
          countRef.current = currentValue;
          setCount(currentValue);
        }
        
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };
      
      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, delay]);

  return count;
};

export default useAnimatedCounter;
