import type { NextApiHandler } from "next"
import { establishNextApi } from "next-bridge"

import { generateUrlAction } from "@/handlers/generateUrlAction"
import { generateUrlBridgeContext } from "@/handlers/init"

const api = <NextApiHandler>(
  establishNextApi("POST", generateUrlBridgeContext.init(generateUrlAction))
)

export default api
