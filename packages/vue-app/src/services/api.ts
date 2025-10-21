import type { IpResult, ApiError } from '../types'

const API_BASE_URL = 'http://localhost:3001/api'

export class ResponseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ResponseError'
  }
}

export async function ipLookup(ip: string): Promise<IpResult> {
  const response = await fetch(`${API_BASE_URL}/lookup/${ip}`)
  const data = await response.json()

  if (!response.ok) {
    throw new ResponseError((data as ApiError).error)
  }

  return data as IpResult
}