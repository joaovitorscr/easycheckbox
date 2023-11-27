import BoxList from '@/components/BoxList'

export default function Box({ params }: { params: { id: string } }) {
  return (
    <div>
      <BoxList boxUrl={params.id} />
    </div>
  )
}
