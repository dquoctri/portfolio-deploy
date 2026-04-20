import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'

interface RouterContextValue {
  pathname: string
  navigate: (href: string, options?: { replace?: boolean }) => void
}

const RouterContext = createContext<RouterContextValue | null>(null)

function getCurrentPathname() {
  if (typeof window === 'undefined') {
    return '/'
  }

  return window.location.pathname || '/'
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState(getCurrentPathname)

  useEffect(() => {
    const handlePopState = () => setPathname(getCurrentPathname())

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((href: string, options?: { replace?: boolean }) => {
    if (!href.startsWith('/')) {
      window.location.assign(href)
      return
    }

    const nextPathname = href || '/'

    if (options?.replace) {
      window.history.replaceState({}, '', nextPathname)
    } else {
      window.history.pushState({}, '', nextPathname)
    }

    setPathname(getCurrentPathname())

    if (typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      } catch {
        window.scrollTo(0, 0)
      }
    }
  }, [])

  const value = useMemo(
    () => ({
      pathname,
      navigate,
    }),
    [navigate, pathname],
  )

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const context = useContext(RouterContext)

  if (!context) {
    throw new Error('useRouter must be used inside RouterProvider')
  }

  return context
}

export function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>) {
  return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.altKey && !event.ctrlKey && !event.shiftKey
}

export function isInternalPath(href?: string) {
  return Boolean(href && href.startsWith('/') && !href.startsWith('//'))
}
