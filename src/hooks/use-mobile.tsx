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

/** The width the mobile tree is designed to lay out at. */
const PHONE_WIDTH = 400

/** The scale itself, so the height hook can divide by the same number. */
const forcedZoom = (): number => {
  if (typeof window === "undefined") return 1
  const forced =
    window.matchMedia(TOUCH_PRIMARY).matches && window.innerWidth >= MOBILE_BREAKPOINT
  return forced ? window.innerWidth / PHONE_WIDTH : 1
}

/**
 * How much to scale the page up when a phone is in desktop-site mode.
 * Returns 1 when there is nothing to correct.
 *
 * The earlier version of this returned a boolean and the shell clamped itself
 * to 34rem, which fixed the wrong half of the problem. Chrome lays the page out
 * in a ~980px virtual viewport and then scales the whole result down to fit the
 * physical screen, roughly 0.42 on a 410px handset. Clamping the column changed
 * its width and left the scale alone, so the page became a 228px strip of a
 * 410px screen with 6px body text and dead margins either side. Every mobile
 * fix was present and correct, and then multiplied by 0.42.
 *
 * Scaling is the other half. Lay out at 400px, render at `980 / 400`, and
 * Chrome's fit-to-width puts it back at 1:1. `zoom` on the root element is what
 * does this: it changes the used value of every length, so the document lays
 * out as a phone and paints at desktop size, and fixed positioning still pins
 * to the visual viewport. A transform would not, because it would make the
 * dock's containing block the page rather than the screen.
 */
export function useForcedDesktopZoom() {
  const [zoom, setZoom] = React.useState(1)

  React.useEffect(() => {
    const onChange = () => setZoom(forcedZoom())
    onChange()
    return subscribe(onChange)
  }, [])

  return zoom
}

/**
 * The height of the visible screen, in the layout pixels the mobile tree is
 * laid out in. Zero until a window exists.
 *
 * `svh`, `dvh` and `vh` are as unusable in this tree as `md:` is, and for the
 * same reason: zoom changes the used value of a length but not the viewport a
 * viewport unit resolves against. Measured in desktop-site mode, an element
 * asking for `100svh` came back 1750 layout pixels tall inside a document 714
 * layout pixels tall, and painted at 4288. Anything sized that way is a hero
 * six screens deep.
 *
 * So height gets the same correction width already gets: divide by the zoom.
 */
export function useMobileViewportHeight() {
  const measure = () =>
    typeof window === "undefined" ? 0 : window.innerHeight / forcedZoom()

  const [height, setHeight] = React.useState(measure)

  React.useEffect(() => {
    let lastWidth = window.innerWidth
    const onChange = () => {
      // A height-only resize is the URL bar sliding away under a moving thumb,
      // or a keyboard opening. Resampling then would reflow the hero mid-scroll,
      // which is the shift `svh` exists to avoid, so only a width change (a
      // rotation, or the forced-desktop zoom recalculating) resamples.
      if (window.innerWidth === lastWidth) return
      lastWidth = window.innerWidth
      setHeight(measure())
    }
    setHeight(measure())
    return subscribe(onChange)
  }, [])

  return height
}
