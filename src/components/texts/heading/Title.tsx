import classnames from "classnames"
import { motion } from "framer-motion"

import { useUI } from "@/contexts/useUI"

export const Title = () => {
  const { variants } = useUI()
  return (
    <motion.div
      layout={"position"}
      className={classnames(
        variants.is("shortened") ? "text-malt-100" : "text-lapis-600"
      )}
    >
      <h1 className="font-antonio text-[60px] leading-[52px] sm:text-[84px] sm:leading-[72px]">
        URL
      </h1>
      <h2 className="text-[45.7px] font-bold leading-[40px] sm:text-[64px] sm:leading-[56px]">
        Shortener
      </h2>
    </motion.div>
  )
}
