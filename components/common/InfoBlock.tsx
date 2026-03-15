import clsx from "clsx";

type InfoBlockProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function InfoBlock({
  title,
  children,
  className,
}: InfoBlockProps) {
  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <h3 className="heading-3 uppercase">{title}</h3>
      <div className="heading-4 whitespace-pre-line">{children}</div>
    </div>
  );
}
