type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
  contain?: boolean;
};

export default function FilmPhoto({
  src,
  alt,
  className = "",
  priority = false,
  objectPosition,
  contain = false,
}: Props) {
  return (
    // Native img keeps original resolution — Next/Image would recompress.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={
        contain
          ? `film-still max-h-[78vh] w-auto object-contain ${className}`
          : `film-still absolute inset-0 h-full w-full object-cover ${className}`
      }
      style={objectPosition ? { objectPosition } : undefined}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
    />
  );
}
