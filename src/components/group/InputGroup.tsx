import { motion } from "framer-motion"
import { useEffect } from "react"
import { useAuth } from "tucmc-auth"

import { LoginButton } from "@/components/buttons/LoginButton"
import { URLBox } from "@/components/group/URLBox"
import { useShortener } from "@/contexts/shortener"
import { useUI } from "@/contexts/useUI"
import { useURLBoxHandlers } from "@/hooks/useURLBoxHandlers"

export const InputGroup = () => {
  const { variants } = useUI()
  const { url } = useShortener()
  const { signIn, loggedUser } = useAuth()

  const { onCopy, onSubmit, onInputChange, isLoading } = useURLBoxHandlers()

  const login = () => {
    signIn()
  }

  useEffect(() => {
    if (loggedUser) {
      variants.set("idle")
    } else {
      variants.set("default")
    }
  }, [loggedUser])

  return (
    <motion.div
      key={`section-${variants.is("default") ? "logged" : "notlogged"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: 0.6 }}
      className="mb-5 flex h-[6rem] flex-col items-center justify-center sm:h-[7rem] sm:items-start"
    >
      {variants.is("default") && <LoginButton onClick={login} />}
      {!variants.is("default") && (
        <URLBox
          onSubmit={onSubmit}
          onCopy={onCopy}
          onChange={onInputChange}
          value={url.value}
          isLoading={isLoading}
        />
      )}
    </motion.div>
  )
}
