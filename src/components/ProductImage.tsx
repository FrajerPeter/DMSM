import React, { useState } from 'react';

export interface ProductImageProps {
  /** The asset URL of the product photo (e.g. '/products/hot-girls-front.jpg') */
  imageUrl?: string;
  /** Alias for imageUrl */
  src?: string;
  /** Descriptive alternative text for accessibility */
  alt?: string;
  /** Additional CSS / Tailwind class names */
  className?: string;
  /** Display mode: standard <img> tag (default) or CSS background-image */
  mode?: 'img' | 'background';
  /** Image loading strategy: 'lazy' (default) or 'eager' */
  loading?: 'lazy' | 'eager';
  /** Container aspect ratio (defaults to 'aspect-square') */
  aspectRatio?: string;
  /** Custom fallback image if the primary fails to load */
  fallbackUrl?: string;
  /** Callback if image error occurs */
  onError?: () => void;
}

const DEFAULT_ASSET_URL = '/products/hot-girls-front.jpg';

export const ProductImage: React.FC<ProductImageProps> = ({
  imageUrl,
  src,
  alt = 'FP DROP Product Photography',
  className = '',
  mode = 'img',
  loading = 'lazy',
  aspectRatio = 'aspect-square',
  fallbackUrl = DEFAULT_ASSET_URL,
  onError
}) => {
  const [hasError, setHasError] = useState(false);
  const activeUrl = hasError ? fallbackUrl : (imageUrl || src || fallbackUrl);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      onError?.();
    }
  };

  if (mode === 'background') {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative ${aspectRatio} w-full bg-[#0c0c0c] bg-cover bg-center overflow-hidden select-none ${className}`}
        style={{ backgroundImage: `url(${activeUrl})` }}
      >
        {/* Dark theme vignette / subtle contrast ring */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      className={`relative ${aspectRatio} w-full bg-[#0c0c0c] overflow-hidden flex items-center justify-center select-none ${className}`}
    >
      {/* High-quality standard <img> element */}
      <img
        src={activeUrl}
        alt={alt}
        loading={loading}
        draggable={false}
        onError={handleError}
        className="w-full h-full object-cover object-center select-none transition-transform duration-300 ease-out"
      />

      {/* Dark theme contrast ring */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
    </div>
  );
};
