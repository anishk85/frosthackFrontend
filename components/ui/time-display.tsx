// components/ui/time-display.tsx
"use client";

import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(format(new Date(), 'hh:mm a'));
  }, []);

  return <span>{currentTime}</span>;
}