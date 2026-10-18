import React from 'react';

interface SteamAnimationProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'simmer';
  color?: string;
}

export const SteamAnimation: React.FC<SteamAnimationProps> = ({
  className = '',
  intensity = 'medium',
  color = 'rgba(255, 248, 240, 0.45)',
}) => {
  const getOpacities = () => {
    switch (intensity) {
      case 'subtle':
        return { o1: 0.25, o2: 0.18, o3: 0.2 };
      case 'simmer':
        return { o1: 0.6, o2: 0.5, o3: 0.45 };
      case 'medium':
      default:
        return { o1: 0.4, o2: 0.35, o3: 0.3 };
    }
  };

  const { o1, o2, o3 } = getOpacities();

  return (
    <div
      className={`pointer-events-none overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 260"
        className="w-full h-full overflow-visible filter blur-[2px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Steam Strand 1 */}
        <path
          d="M 60,240 C 45,190 75,150 55,100 C 40,60 70,25 50,0"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="40 180"
          className="animate-steam-1"
          style={{ opacity: o1 }}
        />

        {/* Steam Strand 2 */}
        <path
          d="M 85,250 C 105,200 70,160 90,110 C 110,70 80,30 95,5"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="50 190"
          className="animate-steam-2"
          style={{ opacity: o2 }}
        />

        {/* Steam Strand 3 */}
        <path
          d="M 110,245 C 95,195 125,155 105,105 C 90,65 115,35 100,10"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="35 170"
          className="animate-steam-3"
          style={{ opacity: o3 }}
        />
      </svg>
    </div>
  );
};
