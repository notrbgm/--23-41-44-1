import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { announcementConfig } from "@/config/announcement"
import { cn } from "@/lib/utils"

// Helper to get/set cookies
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : null
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`
}

export default function AnnouncementBanner() {
  const config = announcementConfig
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const dismissed = getCookie(`announcement_dismissed_${config.message}`)
    if (config.enabled && dismissed !== "true") {
      setIsVisible(true)
    }
  }, [config.enabled, config.message])

  const handleClose = () => {
    setCookie(`announcement_dismissed_${config.message}`, "true", 7) // Cookie lasts for 7 days
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
