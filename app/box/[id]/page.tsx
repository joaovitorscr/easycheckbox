import BoxPage from './BoxPage'

export default function Box({ params }: { params: { id: string } }) {
  return (
    <div>
      <BoxPage boxUrl={params.id} />
    </div>
  )
}
