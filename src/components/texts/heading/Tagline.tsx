import classnames from "classnames"
import { AnimatePresence, motion } from "framer-motion"

import { DefaultDescription } from "@/components/texts/DefaultDescription"
import { IdleDescription } from "@/components/texts/IdleDescription"
import { ShortenedDescription } from "@/components/texts/ShortenedDescription"
import { useUI } from "@/contexts/useUI"

export const Tagline = () => {
  const { variants } = useUI()
  return (
    <AnimatePresence exitBeforeEnter={true}>
      <motion.div
        layout={"position"}
        initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
        animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
        exit={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
        transition={{ duration: 0.5 }}
        key={`tagline-${variants.is("default") ? "logged" : "notlogged"}`}
        className={classnames(
          "mt-2 flex items-center",
          variants.is("shortened") ? "text-malt-100" : "text-lapis-600"
        )}
      >
        <span className="ml-14 text-[38px] font-extralight sm:ml-20 sm:text-[64px]">
          /
        </span>
        {variants.is("default") && <DefaultDescription />}
        {variants.is("idle") && <IdleDescription />}
        {variants.is("shortened") && <ShortenedDescription />}
      </motion.div>
    </AnimatePresence>
  )
}
