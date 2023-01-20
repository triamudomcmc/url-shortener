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
  const { signIn, loggedUser, loading } = useAuth()

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
      <motion.div
        animate={
          loading
            ? { opacity: 1, display: "flex" }
            : { opacity: 0, display: "none" }
        }
        transition={{ duration: 0.5 }}
        className="font-noto-sans-thai fixed top-0 left-0 z-[99] flex min-h-screen w-full flex-col items-center justify-center px-6 backdrop-blur-sm"
      >
        <div className="flex items-center space-x-2">
          <h1 className="font-semibold text-gray-800">กำลังเข้าสู่ระบบ</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.3}
            stroke="currentColor"
            className="animate-dynamic-spin h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
        <p className="max-w-[300px] text-center text-sm font-medium text-gray-500">
          ผู้ใช้สามารถเข้าสู่ระบบที่หน้าต่างที่เปิดขึ้น
          หากไม่พบหน้าต่างให้ลองใช้งาน browser อื่น
        </p>
      </motion.div>
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
