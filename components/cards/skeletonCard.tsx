import { Skeleton } from "../ui/skeleton";
export function ThreadSkeleton() {
  return (
    <div className="flex items-center w-full h-20 space-x-4 my-5">
      <Skeleton className="w-full !bg-dark-1 flex gap-4">
        <div className="flex flex-col justify-center items-center">
          <Skeleton className="h-16 w-16 rounded-full bg-secondary-500 z-40" />
          <Skeleton className="h-12 w-1" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[160px]" />
          <Skeleton className="h-4 w-[400px]" />
          <Skeleton className="h-4 w-[190px]" />
        </div>
      </Skeleton>
    </div>
  );
}
