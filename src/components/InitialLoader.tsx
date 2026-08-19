import React, { useEffect, useState, useRef } from 'react';
import { animate } from 'animejs';
import { drawSvgPath, scrambleText } from '../utils/animeEffects';

interface InitialLoaderProps {
  onComplete: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState('Loading portfolio...');
  const [isFading, setIsFading] = useState(false);
  const statusRef = useRef<HTMLDivElement | null>(null);
  const svgPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (svgPathRef.current) {
      drawSvgPath(svgPathRef.current, 900, 100);
    }

    const counterObj = { val: 0 };
    const anim = animate(counterObj, {
      val: 100,
      duration: 1000,
      ease: 'inOutQuart',
      onUpdate: () => {
        setPercent(Math.floor(counterObj.val));
      },
      onComplete: () => {
        if (statusRef.current) {
          scrambleText(statusRef.current, 'Welcome • Karankumar G', 250);
        }
        setTimeout(() => {
          setIsFading(true);
          setTimeout(onComplete, 400);
        }, 200);
      }
    });

    const t1 = setTimeout(() => {
      setStatusText('Setting up projects & experience...');
      if (statusRef.current) scrambleText(statusRef.current, 'Setting up projects & experience...', 250);
    }, 400);

    return () => {
      try {
        if (anim && typeof anim.pause === 'function') anim.pause();
      } catch {}
      clearTimeout(t1);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080C] text-white transition-all duration-500 ease-out ${
        isFading ? 'opacity-0 scale-105 pointer-events-none filter blur-md' : 'opacity-100 scale-100'
      }`}
    >
      <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-accent-violet/20 via-accent-cyan/15 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="relative flex flex-col items-center space-y-5 max-w-sm w-full px-6 text-center">
        {/* Monogram Crest */}
        <div className="w-16 h-16 rounded-2xl apple-glass p-2.5 flex items-center justify-center shadow-xl shadow-accent-violet/20 border border-white/20 relative">
          <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
            <path
              ref={svgPathRef}
              d="M 50,5 L 90,27.5 L 90,72.5 L 50,95 L 10,72.5 L 10,27.5 Z"
              stroke="url(#loaderGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="50"
              y="58"
              textAnchor="middle"
              className="font-mono font-bold text-xl fill-white tracking-tighter"
            >
              KG
            </text>
            <defs>
              <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="50%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Progress Display */}
        <div className="space-y-2 w-full">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span ref={statusRef} className="truncate">{statusText}</span>
            <span className="text-accent-teal font-bold">{percent}%</span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden border border-white/10 p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-amber transition-all duration-100 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <span>Karankumar G</span>
          <span className="w-1 h-1 rounded-full bg-accent-teal" />
          <span>Full Stack & AI Engineer</span>
        </div>
      </div>
    </div>
  );
};
