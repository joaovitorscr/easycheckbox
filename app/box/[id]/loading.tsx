import Container from '@/components/Container'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Container>
      <div className="mt-10 flex flex-col items-center md:flex-row md:justify-between">
        <Skeleton className="md:p-8 md:w-80 md:text-center" />
        <Skeleton className="w-32 h-16" />
      </div>
      <div className="mt-40 space-y-4">
        <div className="flex justify-center items-center">
          <Input className="mr-4 w-10" type="checkbox" disabled />
          <Skeleton className="h-16 w-80" />
        </div>
        <div className="flex justify-center items-center">
          <Input className="mr-4 w-10" type="checkbox" disabled />
          <Skeleton className="h-16 w-80" />
        </div>
        <div className="flex justify-center items-center">
          <Input className="mr-4 w-10" type="checkbox" disabled />
          <Skeleton className="h-16 w-80" />
        </div>
        <div className="flex justify-center items-center">
          <Input className="mr-4 w-10" type="checkbox" disabled />
          <Skeleton className="h-16 w-80" />
        </div>
        <div className="flex justify-center items-center">
          <Input className="mr-4 w-10" type="checkbox" disabled />
          <Skeleton className="h-16 w-80" />
        </div>
        <div className="flex justify-center items-center">
          <Input className="mr-4 w-10" type="checkbox" disabled />
          <Skeleton className="h-16 w-80" />
        </div>
      </div>
    </Container>
  )
}
