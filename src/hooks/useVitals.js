import { useState, useEffect } from 'react';

export function useVitals() {
  const [vitals, setVitals] = useState({
    pulse: 72,
    sys: 120,
    dia: 80,
    temp: 36.8,
    spo2: 98,
    resp: 16,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        pulse: clamp(prev.pulse + rand(-3, 3), 50, 130),
        sys: clamp(prev.sys + rand(-2, 2), 90, 160),
        dia: clamp(prev.dia + rand(-2, 2), 60, 100),
        temp: clamp(prev.temp + rand(-0.1, 0.1), 36.0, 38.5),
        spo2: clamp(prev.spo2 + rand(-1, 1), 85, 100),
        resp: clamp(prev.resp + rand(-1, 1), 10, 30),
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return vitals;
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, Math.round(n * 10) / 10));
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}