import type { ComparativeFunction } from "@/types/ComparativeFunction"
import type { SetFunction } from "@/types/SetFunction"
import type { UIVariants } from "@/types/UIVariants"

export const defaultUIValue: UIValueType = {
  variants: {
    value: "default",
    set: (_) => {},
    is: (_) => false
  }
}

export interface UIValueType {
  variants: {
    value: UIVariants
    is: ComparativeFunction<UIVariants>
    set: SetFunction<UIVariants>
  }
}
