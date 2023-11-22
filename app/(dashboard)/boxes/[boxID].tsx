import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface BoxesProps {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  authorId: string
}

export default function Page() {
  const [boxes, setBoxes] = useState<BoxesProps[]>([])

  const client = axios.create({
    baseURL: '/api/checkboxlist',
  })

  useEffect(() => {
    client.get('?_limit=10').then((response) => {
      setBoxes(response.data.boxes)
    })
  }, [])
  const router = useRouter()
  return <p>BOX: {router.query.boxID}</p>
}
