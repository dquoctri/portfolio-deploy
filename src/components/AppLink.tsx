import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from 'react'

import { isInternalPath, isPlainLeftClick, useRouter } from '../app/router'

export const AppLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ href = '', onClick, target, ...props }, ref) => {
    const { navigate } = useRouter()

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event)

      if (!isInternalPath(href) || target === '_blank' || !isPlainLeftClick(event)) {
        return
      }

      event.preventDefault()
      navigate(href)
    }

    return <a ref={ref} href={href} onClick={handleClick} target={target} {...props} />
  },
)

AppLink.displayName = 'AppLink'
