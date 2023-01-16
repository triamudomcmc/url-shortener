import classnames from "classnames"
import { AnimateSharedLayout } from "framer-motion"
import type { FC } from "react"

import { BottomStrip } from "@/components/group/BottomStrip"
import { Footer } from "@/components/group/Footer"
import { Heading } from "@/components/group/Heading"
import { InputGroup } from "@/components/group/InputGroup"
import { ShortenerContextProvider } from "@/contexts/shortener"
import { useUI } from "@/contexts/useUI"

interface ShortenerSectionProps {}

export const ShortenerSection: FC<ShortenerSectionProps> = () => {
  const { variants } = useUI()

  return (
    <div
      className={classnames(
        "font-plus-jakarta-sans relative flex min-h-screen w-full flex-col justify-center transition-colors",
        variants.is("shortened") ? "bg-lapis-600" : "bg-malt-200"
      )}
    >
      <AnimateSharedLayout>
        <ShortenerContextProvider>
          <div className="relative flex w-full flex-col items-center justify-center px-6 sm:min-h-[600px]">
            <div
              className={classnames(
                "max-w-[342px] sm:max-w-[unset]",
                variants.is("default")
                  ? "sm:ml-14 md:ml-24"
                  : "sm:ml-14 md:ml-9"
              )}
            >
              <Heading />
              <InputGroup />
            </div>
            <BottomStrip />
          </div>
          <Footer />
        </ShortenerContextProvider>
      </AnimateSharedLayout>
    </div>
  )
}
