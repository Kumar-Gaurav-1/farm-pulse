import { renderHook, act } from "@testing-library/react"
import { useIsMobile } from "./use-mobile"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"

const MOBILE_BREAKPOINT = 768

describe("useIsMobile", () => {
  let originalInnerWidth: number
  let matchMediaMock: ReturnType<typeof vi.fn>
  let addEventListenerMock: ReturnType<typeof vi.fn>
  let removeEventListenerMock: ReturnType<typeof vi.fn>
  let triggerChange: (event: Event) => void

  beforeEach(() => {
    originalInnerWidth = window.innerWidth

    addEventListenerMock = vi.fn((event, callback) => {
      if (event === "change") {
        triggerChange = callback
      }
    })
    removeEventListenerMock = vi.fn()

    matchMediaMock = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
      dispatchEvent: vi.fn(),
    }))

    Object.defineProperty(window, "matchMedia", {
      writable: true, configurable: true,
      value: matchMediaMock,
    })
  })

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true, configurable: true,
      value: originalInnerWidth,
    })
    vi.clearAllMocks()
  })

  it("should return true when innerWidth is below MOBILE_BREAKPOINT", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true, configurable: true,
      value: 500,
    })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it("should return false when innerWidth is above or equal to MOBILE_BREAKPOINT", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true, configurable: true,
      value: 800,
    })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })

  it("should update when matchMedia change event is triggered", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true, configurable: true,
      value: 800,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    // Simulate resizing window to mobile
    act(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true, configurable: true,
        value: 500,
      })
      if (triggerChange) {
        triggerChange(new Event("change"))
      }
    })

    expect(result.current).toBe(true)
  })

  it("should remove event listener on unmount", () => {
    const { unmount } = renderHook(() => useIsMobile())
    unmount()
    expect(removeEventListenerMock).toHaveBeenCalledWith("change", expect.any(Function))
  })
})
