import Checkbox from '@/components/Checkbox'

interface BoxListProps {
  data: object
}
export default function BoxList({ data }: BoxListProps) {
  return (
    <div>
      <Checkbox checked={true} content="lasanha" />
    </div>
  )
}
