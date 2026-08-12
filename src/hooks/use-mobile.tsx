import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * A phone is a phone even when it lies about its width.
 *
 * Width alone is not enough. Chrome for Android's "Request desktop site", and
 * the equivalent in Samsung Internet and Firefox, lays the page out in a
 * virtual viewport of roughly 980 CSS pixels and then scales the result down to
 * fit the physical screen. The viewport meta tag is ignored on purpose, so
 * nothing we put in the document changes it.
 *
 * Under that setting every `sm:` and `md:` breakpoint fires and the desktop
 * tree renders, shrunk to about 40% on a 410px handset. That is the failure
 * mode this second query exists to catch.
 *
 * What does survive the switch is the input model: the only pointer is still a
 * finger, so the device keeps reporting `pointer: coarse` and `hover: none`.
 * A touchscreen laptop reports neither, because its *primary* pointer is a
 * trackpad, which is what keeps this from stealing the desktop tree from a
 * Surface or a touch-enabled MacBook.
 *
 * The width ceiling keeps a large tablet in landscape on the desktop tree,
 * where it belongs, while still catching a handset at the forced 980.
 */
const NARROW = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
const TOUCH_PRIMARY = "(pointer: coarse) and (hover: none)"
const FORCED_DESKTOP_CEILING = 1024

const resolve = (): boolean => {
  if (typeof window === "undefined") return false
  if (window.matchMedia(NARROW).matches) return true
  return (
    window.matchMedia(TOUCH_PRIMARY).matches &&
    window.innerWidth <= FORCED_DESKTOP_CEILING
  )
}

const getInitial = (): boolean | undefined => {
  if (typeof window === "undefined") return undefined
  return resolve()
}

/** Subscribe to everything that can change the answer. */
const subscribe = (onChange: () => void) => {
  const narrow = window.matchMedia(NARROW)
  const touch = window.matchMedia(TOUCH_PRIMARY)
  narrow.addEventListener("change", onChange)
  touch.addEventListener("change", onChange)
  // Rotating a handset in forced-desktop mode changes innerWidth without
  // crossing either media query, so the resize event is load-bearing here.
  window.addEventListener("resize", onChange)
  return () => {
    narrow.removeEventListener("change", onChange)
    touch.removeEventListener("change", onChange)
    window.removeEventListener("resize", onChange)
  }
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(getInitial)

  React.useEffect(() => {
    const onChange = () => setIsMobile(resolve())
    onChange()
    return subscribe(onChange)
  }, [])

  return !!isMobile
}

export function useIsMobileResolved() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(getInitial)

  React.useEffect(() => {
    const onChange = () => setIsMobile(resolve())
    onChange()
    return subscribe(onChange)
  }, [])

  return isMobile
}

/**
 * True when a touch-primary device has been handed a desktop-width viewport.
 *
 * The mobile tree is designed for a single thumb-width column. Letting it run
 * to 980px would trade one bad layout for another, so the shell clamps itself
 * when this is true. On a real handset the clamp is wider than the screen and
 * costs nothing.
 */
export function useIsForcedDesktopViewport() {
  const [forced, setForced] = React.useState(false)

  React.useEffect(() => {
    const onChange = () =>
      setForced(
        window.matchMedia(TOUCH_PRIMARY).matches &&
          window.innerWidth >= MOBILE_BREAKPOINT,
      )
    onChange()
    return subscribe(onChange)
  }, [])

  return forced
}
