import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex justify-center">
      <Skeleton className="w-[1920px] h-[1080px]" />
    </div>
  )
}
