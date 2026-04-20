import type { ReactNode } from 'react'

import type { TextContent } from '../types/portfolio'
import { AccentText } from './AccentText'

interface RichTextProps {
  value: TextContent
  className?: string
}

export function RichText({ value, className }: RichTextProps) {
  const content: ReactNode =
    typeof value === 'string'
      ? value
      : value.map((segment, index) =>
          segment.accent ? (
            <AccentText key={`${segment.text}-${index}`}>{segment.text}</AccentText>
          ) : (
            <span key={`${segment.text}-${index}`}>{segment.text}</span>
          ),
        )

  if (!className) {
    return <>{content}</>
  }

  return <span className={className}>{content}</span>
}
