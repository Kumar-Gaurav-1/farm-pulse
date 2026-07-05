import { renderHook, act } from "@testing-library/react"
import { useIsMobile } from "./use-mobile"

const MOBILE_BREAKPOINT = 768

describe("useIsMobile", () => {
  let originalMatchMedia: typeof window.matchMedia
  let originalInnerWidth: number
  let matchMediaMock: ReturnType<typeof vi.fn>

  beforeAll(() => {
    originalMatchMedia = window.matchMedia
    originalInnerWidth = window.innerWidth
  })

  afterAll(() => {
    window.matchMedia = originalMatchMedia
    window.innerWidth = originalInnerWidth
  })

  beforeEach(() => {
    matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    window.matchMedia = matchMediaMock as unknown as typeof window.matchMedia
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("should return false on initial render before hydration", () => {
    // In React 18, `renderHook` does not provide a direct way to test the exact state *before* `useEffect` runs,
    // because `useEffect` runs synchronously after paint in tests.
    // However, the hook's initial state is `undefined`, and it returns `!!isMobile` which is `false`.
    // We can simulate an environment where window is undefined or innerWidth is large to see the initial render behavior.
    window.innerWidth = 1024
    const { result } = renderHook(() => useIsMobile())

    // It should settle to false because innerWidth is 1024
    expect(result.current).toBe(false)
  })

  it("should return true when innerWidth is below mobile breakpoint", () => {
    window.innerWidth = MOBILE_BREAKPOINT - 1
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it("should return false when innerWidth is at or above mobile breakpoint", () => {
    window.innerWidth = MOBILE_BREAKPOINT
    const { result, rerender } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    window.innerWidth = MOBILE_BREAKPOINT + 100
    rerender()
    expect(result.current).toBe(false)
  })

  it("should respond to matchMedia change events", () => {
    let changeListener: ((e: any) => void) | undefined

    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: (type: string, listener: any) => {
        if (type === "change") {
          changeListener = listener
        }
      },
      removeEventListener: vi.fn(),
    }))

    window.innerWidth = 1024
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    // Simulate resize event
    act(() => {
      window.innerWidth = MOBILE_BREAKPOINT - 100
      if (changeListener) {
        changeListener({ matches: true }) // The hook actually checks window.innerWidth
      }
    })

    expect(result.current).toBe(true)
  })

  it("should clean up event listener on unmount", () => {
    const removeEventListenerMock = vi.fn()
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerMock,
    }))

    const { unmount } = renderHook(() => useIsMobile())
    unmount()

    expect(removeEventListenerMock).toHaveBeenCalledWith("change", expect.any(Function))
  })
})
