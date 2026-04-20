import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
  window.localStorage.clear()
  window.history.replaceState({}, '', '/')
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('dark'),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
})

type ObserverEntry = {
  callback: IntersectionObserverCallback
  element?: Element
}

const observerEntries: ObserverEntry[] = []

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds = []
  private readonly callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    observerEntries.push({ callback })
  }

  disconnect() {}

  observe(element: Element) {
    const entry = observerEntries.find((item) => item.callback === this.callback)

    if (entry) {
      entry.element = element
    }
  }

  takeRecords(): IntersectionObserverEntry[] {
    return []
  }

  unobserve() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: IntersectionObserverMock,
})

Object.defineProperty(globalThis, '__triggerIntersection', {
  writable: true,
  value: (element: Element) => {
    const match = observerEntries.find((entry) => entry.element === element)

    if (!match) {
      return
    }

    match.callback(
      [
        {
          isIntersecting: true,
          intersectionRatio: 1,
          target: element,
          boundingClientRect: element.getBoundingClientRect(),
          intersectionRect: element.getBoundingClientRect(),
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    )
  },
})
