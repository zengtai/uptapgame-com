import { getImageUrl } from "../lib/api";

export default function Image({
  className,
  src,
  alt,
  width,
  height,
  eager = false,
}) {
  return (
    <picture>
      <source type="image/avif" srcSet={getImageUrl(src, `avif`)} />
      <source type="image/webp" srcSet={getImageUrl(src, `webp`)} />
      <img
        className={className}
        src={getImageUrl(src)}
        alt={alt ? alt : src}
        width={width ? width : 100}
        height={height ? height : 100}
        loading={eager ? `eager` : `lazy`}
        decoding="async"
      />
    </picture>
  );
}
