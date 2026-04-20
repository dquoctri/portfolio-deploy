import { AccentText } from './AccentText'

interface InlineHighlightProps {
  text: string
  highlight?: string
}

export function InlineHighlight({ text, highlight }: InlineHighlightProps) {
  if (!highlight || !text.includes(highlight)) {
    return <>{text}</>
  }

  const [before, after] = text.split(highlight, 2)

  return (
    <>
      {before}
      <AccentText>{highlight}</AccentText>
      {after}
    </>
  )
}
