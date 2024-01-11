import { clx } from "../../utils/libs";
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clx(
        "animate-pulse rounded-md bg-muted bg-secondary-500",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
