'use client'

import Container from '@/components/Container'
import { useState } from 'react'

export default function Home() {
  const itens: string[] = []
  const [todo, setTodo] = useState<string[]>([])

  function handleSubmit(e: Event) {
    const target = e.target as HTMLButtonElement
    itens.push(target.value)
    setTodo(itens)
  }

  return (
    <main>
      <Container>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" />
          <button type="submit" onClick={() => handleSubmit}>
            Submit
          </button>
        </form>
        {todo.map((todo, i) => (
          <div key={i} className="flex">
            <input className="cursor-pointer mr-2" type="checkbox" />
            <h3 className="font-medium">{todo}</h3>
          </div>
        ))}
      </Container>
    </main>
  )
}
