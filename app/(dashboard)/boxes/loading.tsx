import { Skeleton } from '@/components/ui/skeleton'
import Container from '@/components/Container'

export default function Loading() {
  return (
    <Container>
      <div className="mt-10 flex justify-center">
        <Skeleton className="md:p-8 md:w-80 md:text-center" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-20">
        <Skeleton className="md:p-8 md:w-80 md:h-28 md:text-center" />
        <Skeleton className="md:p-8 md:w-80 md:h-28 md:text-center" />
        <Skeleton className="md:p-8 md:w-80 md:h-28 md:text-center" />
        <Skeleton className="md:p-8 md:w-80 md:h-28 md:text-center" />
      </div>
    </Container>
  )
}
