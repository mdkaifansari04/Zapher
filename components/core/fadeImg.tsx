/* eslint-disable @next/next/no-img-element */
"use client";

import { clx } from "../../utils/libs";
import { forwardRef, useEffect, useState } from "react";

type FadeImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const FadeImg = forwardRef<HTMLImageElement, FadeImgProps>(
  (props, ref) => {
    const { src, alt, className, ...rest } = props;
    const { isLoaded } = useImageIsLoaded(src);

    return (
      <img
        {...rest}
        src={src}
        alt={alt}
        ref={ref}
        loading="lazy"
        decoding="async"
        className={clx(
          "transition-opacity duration-500",
          {
            "opacity-0": !isLoaded,
            "opacity-100": isLoaded,
          },
          className
        )}
      />
    );
  }
);

FadeImg.displayName = "FadeImg";

function useImageIsLoaded(src?: string) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return setIsLoaded(false);

    let isMounted = true;
    const image = new window.Image();

    const createStatusHandler = (status: boolean) => () => {
      if (isMounted) setIsLoaded(status);
    };

    setIsLoaded(false);
    image.onload = createStatusHandler(true);
    image.onerror = createStatusHandler(false);
    image.src = src;

    return () => {
      isMounted = false;
    };
  }, [src]);

  return { isLoaded };
}
