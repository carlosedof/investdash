import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url } = req.query
  try {
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      Accept: 'application/json',
    }
    const response = await axios.get(url as string, { headers })
    res.status(200).json(response.data)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Error fetching data: ${error.message}` })
    } else {
      res.status(500).json({ message: 'Unknown error fetching data' })
    }
  }
}
