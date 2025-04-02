import React, { useRef, useEffect, useState } from 'react';

interface ImageUrlParams {
  [key: string]: any;  // 允许任意参数
}

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  src: string;
  urlParams?: ImageUrlParams;
  fallback?: string;
  loading?: 'eager' | 'lazy';
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

const processImageUrl = (src: string, params?: ImageUrlParams): string => {
  if (!src || !params) return src;

  const url = new URL(src, window.location.origin);
  
  // 将所有参数都添加到 URL 中
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value.toString());
    }
  });

  return url.toString();
};

const Image: React.FC<ImageProps> = ({
  src,
  urlParams,
  fallback = '',
  loading = 'lazy',
  onLoad,
  onError,
  alt = '',
  className = '',
  style,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const processedSrc = processImageUrl(src, urlParams);
    setImgSrc(processedSrc);
  }, [src, urlParams]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setError(true);
    if (onError) {
      onError(new Error('图片加载失败'));
    }
    if (fallback) {
      setImgSrc(fallback);
    }
  };

  const handleLoad = () => {
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <img
      ref={imgRef}
      src={imgSrc}
      alt={alt}
      className={className}
      style={{
        objectFit: 'cover',
        ...style
      }}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
};

export default Image;