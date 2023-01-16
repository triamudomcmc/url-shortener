import { ShortenerSection } from "@/components/sections/ShortenerSection"
import { UIContextProvider } from "@/contexts/useUI"

const Index = () => {
  return (
    <UIContextProvider>
      <ShortenerSection />
    </UIContextProvider>
  )
}

export default Index
