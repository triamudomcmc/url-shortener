import type { FC, ReactNode } from "react"
import { createContext, useContext, useState } from "react"

import type { ShortenerValueType } from "@/types/ShortenerValueType"
import { defaultShortenerValue } from "@/types/ShortenerValueType"

export const ShortenerContext = createContext(defaultShortenerValue)

export const useShortener = () => {
  return useContext(ShortenerContext)
}

const useShortenerContextHook = (): ShortenerValueType => {
  const [contextUrl, setContextUrl] = useState<string>("")

  const clearUrl = () => {
    setContextUrl("")
  }

  const contextValue: ShortenerValueType = {
    url: {
      value: contextUrl,
      set: (subject) => {
        setContextUrl(subject)
      },
      clear: clearUrl
    }
  }

  return contextValue
}

export const ShortenerContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  return (
    <ShortenerContext.Provider value={useShortenerContextHook()}>
      {children}
    </ShortenerContext.Provider>
  )
}
