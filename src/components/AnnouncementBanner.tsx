import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { announcementConfig } from "@/config/announcement"
import { cn } from "@/lib/utils"

export default function AnnouncementBanner() {
  const config = announcementConfig
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(`announcement_dismissed_${config.message}`)
    if (config.enabled && dismissed !== "true") {
      setIsVisible(true)
    }
  }, [config.enabled, config.message])

  const handleClose = () => {
    localStorage.setItem(`announcement_dismissed_${config.message}`, "true")
    setIsVisible(false)
  }

  if (!isVisible || !config.message) return null

  const Wrapper = config.href ? "a" : "div"

  return (
    <Wrapper
      className={cn(
        "relative flex items-center justify-center px-4 py-3 text-sm font-medium text-white transition-colors",
        config.className,
        config.href && "cursor-pointer hover:underline"
      )}
      {...(config.href
        ? { href: config.href, target: config.target ?? "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {config.icon && <span className="mr-2">{config.icon}</span>}
      <span>{config.message}</span>
      <button
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          handleClose()
        }}
        className="absolute right-2 top-2 text-white opacity-75 hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
    </Wrapper>
  )
}
