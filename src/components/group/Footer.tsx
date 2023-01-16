import classnames from "classnames"

import { TUCMC } from "@/components/logo/TUCMC"
import { useUI } from "@/contexts/useUI"

export const Footer = () => {
  const { variants } = useUI()
  return (
    <div className="absolute bottom-0 mb-[66px] flex w-full items-center justify-center">
      <TUCMC
        className={classnames(
          "w-[132px] sm:w-[195px]",
          variants.is("shortened") ? "text-malt-100" : "text-lapis-600"
        )}
      />
    </div>
  )
}
