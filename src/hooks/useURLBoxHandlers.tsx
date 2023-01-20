import type { ChangeEventHandler } from "react"
import { useState } from "react"
import { useAuth } from "tucmc-auth"

import { useShortener } from "@/contexts/shortener"
import { useToast } from "@/contexts/useToast"
import { useUI } from "@/contexts/useUI"
import { generateUrlBridgeContext } from "@/handlers/init"

const autoCompleteURL = (text: string): string => {
  // Correct URL
  if (text === "http:/") {
    return text
  }
  if (text.includes("http://") || text.includes("https://")) {
    return text
  }

  if (text.replace("https:", "").length < 6) {
    return text
  }

  // Incorrect URL
  const protocal = text.slice(0, 8)
  if (protocal.includes("://")) return text
  if (protocal.includes("//")) return `https://${text.split("//")[1]}`
  if (protocal.includes("/")) return `https://${text.split("/")[1]}`
  if (protocal.includes(":")) return `https://${text.split(":")[1]}`

  return `https://${text}`
}

const validateUrl = (url: string) => {
  if (url.includes("tucm.cc")) {
    return false
  }
  if (!url.includes("https://") && !url.includes("http://")) {
    return false
  }

  if (!url.includes(".")) {
    return false
  }

  return true
}

export const useURLBoxHandlers = () => {
  const { url } = useShortener()
  const { loggedUser } = useAuth()
  const { variants } = useUI()
  const [isLoading, setIsLoading] = useState(false)
  const { pushToast } = useToast()

  const onCopy = async () => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(url.value)
    } else {
      document.execCommand("copy", true, url.value)
    }
    pushToast({
      text: "Copied",
      lifeSpan: 2000,
      options: {
        bg: "bg-malt-100",
        text: "text-lapis-600"
      }
    })
  }

  const onSubmit = async (onError: (error: string) => void) => {
    if (!validateUrl(url.value)) {
      onError("invalidURL")
      return
    }

    const loadTimeout = setTimeout(() => {
      setIsLoading(true)
    }, 300)

    const response = await generateUrlBridgeContext.call({
      url: url.value,
      owner: loggedUser.user.uuid
    })

    if (response.status) {
      url.set(response.data.shortenedURL)
      variants.set("shortened")
    } else {
      onError("invalidURL")
    }
    clearTimeout(loadTimeout)
    setIsLoading(false)
  }

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const completedUrl = autoCompleteURL(event.target.value)

    url.set(completedUrl)
  }

  return {
    onCopy,
    onSubmit,
    onInputChange,
    isLoading
  }
}
