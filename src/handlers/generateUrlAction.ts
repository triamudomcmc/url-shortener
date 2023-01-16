import { generateUrlBridgeContext } from "@/handlers/init"
import { urlGen } from "@/lib/urlGen"

export const generateUrlAction = generateUrlBridgeContext.helper.createAction(
  async (api, parameters) => {
    const genResult = await urlGen(parameters.url, parameters.owner)
    if (genResult.status === "failed") {
      return {
        status: false,
        report: "failed"
      }
    }

    return {
      status: true,
      report: "success",
      data: { shortenedURL: genResult.shortURL }
    }
  }
)
