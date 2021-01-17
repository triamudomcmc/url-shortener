import type { NextApiRequest, NextApiResponse } from 'next'
import {fetchTable} from "./lib/tablefetcher";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
      const output = await fetchTable()
      res.json(output)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}