import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router'

function isRoutablePath(href: string, target?: string) {
  return href.startsWith('/') && !href.startsWith('//') && !href.includes('#') && target !== '_blank'
}

export const AppLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ href = '', target, ...props }, ref) => {
    if (isRoutablePath(href, target)) {
      return <Link ref={ref} to={href} target={target} {...props} />
    }

    return <a ref={ref} href={href} target={target} {...props} />
  },
)

AppLink.displayName = 'AppLink'
