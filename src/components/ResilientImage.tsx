import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0A192F] via-[#112A46] to-[#1A365D] text-[#F5EFE6] p-6 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <Utensils className="w-8 h-8 text-[#D97706] mb-2 opacity-80" />
        <span className="text-xs font-medium tracking-wide opacity-90 max-w-[20ch] balance-text">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
