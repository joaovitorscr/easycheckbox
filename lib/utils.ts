import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  const justDate = date.slice(0, 10)
  const stringArray = justDate.split('-')
  stringArray.reverse()
  const returnString = stringArray.join('/')

  return returnString
}
