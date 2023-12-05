import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-20">
      <Skeleton className="w-12/12 h-28" />
      <Skeleton className="w-12/12 h-28" />
      <Skeleton className="w-12/12 h-28" />
      <Skeleton className="w-12/12 h-28" />
    </div>
  )
}
