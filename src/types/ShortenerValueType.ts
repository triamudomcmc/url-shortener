import type { SetFunction } from "@/types/SetFunction"

export interface ShortenerValueType {
  url: {
    value: string
    set: SetFunction<string>
    clear: () => void
  }
}

export const defaultShortenerValue: ShortenerValueType = {
  url: {
    value: "",
    set: (_) => {},
    clear: () => {}
  }
}
