import { lazy, startTransition, Suspense, useEffect, useMemo, useRef, useState } from 'react'

import type { PortfolioData, SectionDefinition } from '../types/portfolio'
import { SectionLoading } from './SectionLoading'
import { SectionShell } from './SectionShell'

interface DeferredSectionProps {
  definition: SectionDefinition
  data: PortfolioData
}

export function DeferredSection({ definition, data }: DeferredSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [shouldMount, setShouldMount] = useState(false)
  const [isPendingLoad, setIsPendingLoad] = useState(false)

  const LazyComponent = useMemo(
    () => (definition.loader ? lazy(definition.loader) : null),
    [definition.loader],
  )

  useEffect(() => {
    if (!definition.loader || shouldMount) {
      return undefined
    }

    const node = sectionRef.current

    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting)

        if (!isVisible) {
          return
        }

        setIsPendingLoad(true)
        void definition.loader?.()
        startTransition(() => setShouldMount(true))
        observer.disconnect()
      },
      { rootMargin: definition.preloadOffset },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [definition, shouldMount])

  return (
    <SectionShell
      ref={sectionRef}
      id={definition.id}
      tone={definition.themeTone}
      loaded={shouldMount}
    >
      {shouldMount && LazyComponent ? (
        <Suspense
          fallback={
            <SectionLoading
              label={definition.label}
              minHeightClassName={definition.placeholderClassName}
              pending
            />
          }
        >
          <LazyComponent data={data} />
        </Suspense>
      ) : (
        <SectionLoading
          label={definition.label}
          minHeightClassName={definition.placeholderClassName}
          pending={isPendingLoad}
        />
      )}
    </SectionShell>
  )
}
