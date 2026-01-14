import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook for getting responsive chart dimensions
 * @param {Object} options - Configuration options
 * @returns {Object} { ref, dimensions }
 */
export const useChartDimensions = (options = {}) => {
  const {
    marginTop = 20,
    marginRight = 20,
    marginBottom = 40,
    marginLeft = 40,
  } = options;

  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    boundedWidth: 0,
    boundedHeight: 0,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  });

  const updateDimensions = useCallback(() => {
    if (!ref.current) return;

    const element = ref.current;
    const { width, height } = element.getBoundingClientRect();

    const newDimensions = {
      width,
      height,
      boundedWidth: Math.max(width - marginLeft - marginRight, 0),
      boundedHeight: Math.max(height - marginTop - marginBottom, 0),
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
    };

    setDimensions((prev) => {
      // Only update if dimensions have changed
      if (
        prev.width !== newDimensions.width ||
        prev.height !== newDimensions.height
      ) {
        return newDimensions;
      }
      return prev;
    });
  }, [marginTop, marginRight, marginBottom, marginLeft]);

  useEffect(() => {
    if (!ref.current) return;

    // Initial measurement
    updateDimensions();

    // Set up ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateDimensions]);

  return { ref, dimensions };
};

export default useChartDimensions;
