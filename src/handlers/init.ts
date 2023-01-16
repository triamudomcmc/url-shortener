import type { BridgeContext } from "next-bridge"
import { createBridgeContext } from "next-bridge"

export const generateUrlBridgeContext: BridgeContext<{
  url: string
  owner: string
}> = createBridgeContext("generateUrl", "generate")
