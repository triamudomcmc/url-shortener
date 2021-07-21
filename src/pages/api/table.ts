import type { NextApiRequest, NextApiResponse } from 'next'
import {fetchPage, updatePage, validateToken} from "./lib/pageFetcher";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
      if (req.body.action === "fetchPage") {
        const output = await fetchPage(req)
        res.json(output)
      }
      if (req.body.action === "updatePage") {
        const output = await updatePage(req)
        res.json(output)
      }
      if (req.body.action === "validateToken") {
        const output = await validateToken(req)
        res.json(output)
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}