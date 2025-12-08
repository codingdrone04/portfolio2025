"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    containerRef.current?.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gridSize = 40;
    const colors = ['#ec4899', '#a855f7', '#fb923c', '#f43f5e', '#c026d3'];
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = i * gridSize + gridSize / 2;
          const baseY = j * gridSize + gridSize / 2;

          const dx = mouseX - baseX;
          const dy = mouseY - baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 120;

          let x = baseX;
          let y = baseY;
          let size = 4;
          let opacity = 0.2;

          if (distance < maxDistance && distance > 0) {
            const force = 1 - distance / maxDistance;
            const angle = Math.atan2(dy, dx);

            const pushDistance = force * 25;
            x = baseX + Math.cos(angle) * pushDistance;
            y = baseY + Math.sin(angle) * pushDistance;

            size = 4 + force * 12;
            opacity = 0.3 + force * 0.5;
          }

          const colorIndex = Math.floor((i + j) % colors.length);
          ctx.fillStyle = colors[colorIndex];
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      canvas.remove();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0" />;
}
