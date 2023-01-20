import { ShortenerSection } from "@/components/sections/ShortenerSection"
import { ToastProvider } from "@/contexts/useToast"
import { UIContextProvider } from "@/contexts/useUI"

const Index = () => {
  return (
    <UIContextProvider>
      <ToastProvider>
        <ShortenerSection />
      </ToastProvider>
    </UIContextProvider>
  )
}

export default Index
