import classnames from "classnames"
import { motion } from "framer-motion"
import type { ChangeEventHandler, FC } from "react"
import { useState } from "react"

import { Copy } from "@/components/icons/Copy"
import { Scissors } from "@/components/icons/Scissors"
import { useToast } from "@/contexts/useToast"
import { useUI } from "@/contexts/useUI"

export const URLBox: FC<{
  onSubmit: (errHandler: (err: string) => void) => void
  onCopy: () => void
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string
  isLoading: boolean
}> = ({ onSubmit, onCopy, onChange, value, isLoading }) => {
  const { variants } = useUI()
  const [isInvalid, setInvalid] = useState(false)
  const [isShaking, setShaking] = useState(false)
  const { pushToast } = useToast()

  const shake = () => {
    setShaking(false)
    setShaking(true)
    setTimeout(() => {
      setShaking(false)
    }, 900)
  }

  const onURLSubmit = () => {
    onSubmit((err) => {
      switch (err) {
        case "invalidURL":
          setInvalid(true)
          shake()
          pushToast({
            text: "Invalid URL",
            lifeSpan: 2000,
            options: {
              bg: "bg-red-500"
            }
          })
          break
        default:
          break
      }
    })
  }

  const onURLInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInvalid(false)
    variants.set("idle")
    onChange(e)
  }

  return (
    <div
      className={classnames(
        "relative w-full min-w-[320px] sm:min-w-[540px]",
        isShaking ? "animate-shake" : ""
      )}
    >
      <input
        placeholder={"https://example.com"}
        className={classnames(
          "w-full rounded-2xl border py-3.5 pl-6 pr-12 font-light shadow-md outline-none transition-colors delay-[10ms] sm:py-4 sm:pr-16 sm:text-xl",
          variants.is("shortened")
            ? "border-malt-100 bg-lapis-600 text-malt-100 placeholder:text-malt-100"
            : "border-lapis-600 bg-malt-200 text-lapis-600 placeholder:text-lapis-600",
          isInvalid && "border-1 border-red-400"
        )}
        value={value}
        onChange={onURLInputChange}
        autoCorrect={"off"}
        autoComplete={"off"}
        autoCapitalize={"off"}
      />
      <div
        className={classnames(
          "absolute right-0 top-0 flex h-full items-center pr-6",
          variants.is("shortened") ? "text-malt-100" : "text-lapis-600"
        )}
      >
        {variants.is("shortened") ? (
          <motion.div
            key={variants.value}
            initial={{ rotate: -90 }}
            animate={{ rotate: 0 }}
            whileHover={{ rotate: 5 }}
            whileTap={{ rotate: -5 }}
          >
            <Copy
              onClick={onCopy}
              className="w-[18px] cursor-pointer sm:w-[26px]"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotate: -90 }}
            animate={{ rotate: 0 }}
            whileHover={{ rotate: -90 }}
            className={classnames(
              isLoading
                ? "animate-dynamic-spin cursor-pointer"
                : "cursor-progress"
            )}
          >
            <Scissors
              className="w-[18px] cursor-pointer sm:w-[26px]"
              onClick={onURLSubmit}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
