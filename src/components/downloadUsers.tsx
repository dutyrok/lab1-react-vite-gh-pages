import type { User } from '../types/User'

export const downloadUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    return data as User[]
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

