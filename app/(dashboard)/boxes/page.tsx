'use client'

import { BoxProps } from '@/components/Checkbox'
import Container from '@/components/Container'
import { BoxListCreation } from '@/components/form/BoxListCreation'
import axios from 'axios'
import Link from 'next/link'

import { useEffect, useState } from 'react'

export interface BoxesProps {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  authorId: string
  content: BoxProps[]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <BoxListCreation />
      <div className="grid grid-cols-4 bg-zinc-600 rounded-md">
        {boxes.map((box) => (
          <div key={box.id}>
            <div>{box.name}</div>
            <div>Last modified at {box.updatedAt}</div>
            <Link href={`box/${box.id}`}>Acessar lista</Link>
          </div>
        ))}
      </div>
    </Container>
  )
}
