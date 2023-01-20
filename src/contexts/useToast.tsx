import classnames from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import type { Dispatch, FC, ReactNode } from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface Toast {
  text: string
  lifeSpan: number
  description?: string
  options?: any
}

interface ToastValue {
  pushToast: (toast: Toast) => void
}
interface ToastElementRenderer {
  render: () => ReactNode
}

type ToastRenderer = (toast: Toast) => ReactNode

const defaultToastValue: ToastValue = {
  pushToast: (toast: Toast) => {}
}

const UseToastContext = createContext(defaultToastValue)

export const useToast = () => {
  return useContext(UseToastContext)
}

const defaultRenderer: ToastRenderer = (toast) => {
  return (
    <motion.div
      initial={{ y: -34 }}
      animate={{ y: 0 }}
      exit={{ y: -34 }}
      className={classnames(
        "mt-2 rounded-full py-0.5 px-4 text-xs font-medium",
        toast.options?.bg || "bg-lapis-600",
        toast.options?.text || "text-malt-200"
      )}
    >
      {toast.text}
    </motion.div>
  )
}

const useToastHook = (
  setToastElement: Dispatch<ToastElementRenderer | null>,
  renderer: ToastRenderer
): ToastValue => {
  const [queue, setQueue] = useState<Toast[]>([])

  const pushToast = (toast: Toast) => {
    setQueue((prev) => [toast, ...prev])
  }

  const runToast = (tqueue: Toast[]) => {
    const curToast = tqueue[0]
    if (!curToast) return
    setToastElement({
      render: () => {
        return renderer(curToast)
      }
    })

    setTimeout(() => {
      setToastElement(null)
      tqueue.pop()
      runToast(tqueue)
    }, curToast.lifeSpan)
  }

  useEffect(() => {
    runToast(queue)
  }, [queue])

  return {
    pushToast
  }
}

export const ToastProvider: FC<{
  children: ReactNode
  renderer?: ToastRenderer
}> = ({ children, renderer = defaultRenderer }) => {
  const [toastElement, setToastElement] = useState<ToastElementRenderer | null>(
    null
  )

  return (
    <UseToastContext.Provider value={useToastHook(setToastElement, renderer)}>
      <div className="fixed top-0 left-0 z-[98] flex w-full justify-center">
        <AnimatePresence exitBeforeEnter={true}>
          {toastElement?.render()}
        </AnimatePresence>
      </div>
      {children}
    </UseToastContext.Provider>
  )
}
