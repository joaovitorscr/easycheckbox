'use client'

import Container from '@/components/Container'
import axios from 'axios'
import Link from 'next/link'

import { useEffect, useState } from 'react'

interface BoxesProps {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  authorId: string
}

export default function Boxes() {
  const [boxes, setBoxes] = useState<BoxesProps[]>([])

  const client = axios.create({
    baseURL: '/api/checkboxlist',
  })

  useEffect(() => {
    client.get('?_limit=10').then((response) => {
      setBoxes(response.data.boxes)
    })
  }, [])

  return (
    <Container>
      <div className="grid grid-cols-4 bg-zinc-600 rounded-md">
        {boxes.map((box) => (
          <div key={box.id}>
            <div>{box.name}</div>
            <div>Last modified at {box.updatedAt}</div>
            <Link href={`boxes/${box.id}`}>Acessar lista</Link>
          </div>
        ))}
      </div>
    </Container>
  )
}
