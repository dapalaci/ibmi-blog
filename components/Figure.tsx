type Props = {
  src: string;
  alt: string;
  children: React.ReactNode;
};

export function Figure({ src, alt, children }: Props) {
  return (
    <figure>
      <img src={src} alt={alt} />
      <figcaption>{children}</figcaption>
    </figure>
  );
}
