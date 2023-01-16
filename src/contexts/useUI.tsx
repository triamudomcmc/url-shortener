import type { FC, ReactNode } from "react"
import { createContext, useContext, useState } from "react"

import type { ComparativeFunction } from "@/types/ComparativeFunction"
import type { SetFunction } from "@/types/SetFunction"
import type { UIValueType } from "@/types/UIValueType"
import { defaultUIValue } from "@/types/UIValueType"
import type { UIVariants } from "@/types/UIVariants"

export const UIContext = createContext(defaultUIValue)

export const useUI = () => {
  return useContext(UIContext)
}

export const useUIContextHooks = (): UIValueType => {
  const [contextVariant, setContextVariant] = useState<UIVariants>(
    defaultUIValue.variants.value
  )

  const setVariant: SetFunction<UIVariants> = (variant) => {
    setContextVariant(variant)
  }

  const compareVariant: ComparativeFunction<UIVariants> = (comparable) => {
    return contextVariant === comparable
  }

  const contextValue: UIValueType = {
    variants: {
      value: contextVariant,
      set: setVariant,
      is: compareVariant
    }
  }
  return contextValue
}

export const UIContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  return (
    <UIContext.Provider value={useUIContextHooks()}>
      {children}
    </UIContext.Provider>
  )
}
