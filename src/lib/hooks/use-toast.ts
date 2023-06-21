import { useEffect, useState } from "react"

import {
  dispatch,
  listeners,
  memoryState,
  toast,
  type ToasterState,
} from "./utils"

export const useToast = () => {
  const [toasterState, listener] = useState<ToasterState>(memoryState)

  useEffect(() => {
    listeners.push(listener)

    return () => {
      const index = listeners.indexOf(listener)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [toasterState])

  return {
    ...toasterState,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}
