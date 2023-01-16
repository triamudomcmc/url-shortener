import classnames from "classnames"
import { useAuth } from "tucmc-auth"

import { Back } from "@/components/icons/Back"
import { useShortener } from "@/contexts/shortener"
import { useUI } from "@/contexts/useUI"

export const BottomStrip = () => {
  const { variants } = useUI()
  const { url } = useShortener()
  const { signOut } = useAuth()

  return (
    <div
      className={classnames(
        "absolute -bottom-3 max-w-[342px] sm:bottom-24 sm:max-w-[unset]",
        variants.is("default") ? "sm:ml-14 md:ml-24" : "sm:ml-14 md:ml-9"
      )}
    >
      {variants.is("shortened") && (
        <button
          onClick={() => {
            url.clear()
            variants.set("idle")
          }}
          className="flex items-center space-x-1.5 rounded-full border border-malt-100 px-3 py-0.5 text-malt-100"
        >
          <Back className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" />
          <span className="font-noto-sans-thai text-[0.65rem] font-light sm:text-[0.78rem]">
            ย้อนกลับ
          </span>
        </button>
      )}
      {variants.is("idle") && (
        <button
          onClick={signOut}
          className="-mt-10 flex items-center space-x-1.5 rounded-full px-3 py-0.5 text-lapis-600 sm:-mt-14"
        >
          <span className="font-noto-sans-thai font-base text-[0.65rem] hover:underline sm:text-[0.78rem]">
            ออกจากระบบ
          </span>
        </button>
      )}
    </div>
  )
}
