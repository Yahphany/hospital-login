import React, { useRef, useEffect } from 'react';

export default function ECGCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h;
    const data = [];
    const speed = 2;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      while (data.length < w / speed) data.push(h / 2);
    };
    resize();
    window.addEventListener('resize', resize);

    let running = true;
    const baseline = () => h / 2;

    const getECGValue = () => {
      const cycle = (Date.now() % 1200) / 1200;
      const b = baseline();
      if (cycle > 0.15 && cycle < 0.20) return b - 30;
      if (cycle > 0.22 && cycle < 0.25) return b + 15;
      if (cycle > 0.25 && cycle < 0.30) return b - 70;
      if (cycle > 0.30 && cycle < 0.35) return b + 25;
      if (cycle > 0.50 && cycle < 0.70) return b - 20;
      return b + (Math.random() - 0.5) * 3;
    };

    const draw = () => {
      if (!running) return;
      data.shift();
      data.push(getECGValue());

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
      for (let i = 0; i < h; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }

      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#4ade80';
      ctx.beginPath();
      data.forEach((y, i) => {
        if (i === 0) ctx.moveTo(i * speed, y);
        else ctx.lineTo(i * speed, y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;

      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => { running = false; cancelAnimationFrame(anim); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-48 rounded bg-black" />;
}