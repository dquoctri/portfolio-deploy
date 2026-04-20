import { useEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from 'react'

import { AppLink } from './AppLink'
import { cn } from '../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: ButtonVariant
}

export function ButtonLink({
  children,
  className,
  href,
  onClick,
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  const [isPressed, setIsPressed] = useState(false)
  const resetTimeoutRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current)
      }
    },
    [],
  )

  const handleClick: AnchorHTMLAttributes<HTMLAnchorElement>['onClick'] = (event) => {
    onClick?.(event)

    if (event.defaultPrevented || !href?.startsWith('#')) {
      return
    }

    setIsPressed(true)

    if (resetTimeoutRef.current) {
      window.clearTimeout(resetTimeoutRef.current)
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setIsPressed(false)
    }, 700)
  }

  return (
    <AppLink
      {...props}
      href={href}
      onClick={handleClick}
      className={cn(
        'neu-button',
        isPressed && 'is-pressed',
        variant === 'primary' && 'neu-button-primary',
        variant === 'secondary' && 'neu-button-secondary',
        variant === 'ghost' && 'neu-button-ghost',
        className,
      )}
    >
      {children}
    </AppLink>
  )
}
