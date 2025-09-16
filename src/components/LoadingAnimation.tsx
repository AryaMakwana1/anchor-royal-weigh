import { useState, useEffect } from 'react';
import anchorLogo from '@/assets/anchor-digital-logo-new.jpg';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 300); // Wait for fade out
    }, 1800); // 1.8 seconds total animation

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative">
        <img
          src={anchorLogo}
          alt="Anchor Digital"
          className={`w-32 h-32 object-contain transition-transform duration-1000 ease-out ${
            isAnimating 
              ? 'animate-[scale-in-bounce_1.5s_ease-out_forwards]' 
              : 'scale-100'
          }`}
        />
      </div>
    </div>
  );
};

export default LoadingAnimation;