import { useState } from 'react';

export const useDimensions = () => {
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('');

  const handleWidthChange = (value: number | string | null) => {
    setWidth(value + 'px');
  };

  const handleHeightChange = (value: number | string | null) => {
    setHeight(value + 'px');
  };

  return {
    width,
    height,
    handleWidthChange,
    handleHeightChange,
  };
};
