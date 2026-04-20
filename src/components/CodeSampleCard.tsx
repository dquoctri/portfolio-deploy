import { useTheme } from './ThemeProvider'
import { getCardThemeStyle } from '../lib/cardTheme'
import type { CodeSample } from '../types/portfolio'
import type { SiteData } from '../types/portfolio'

const tokenClassNames = {
  accent: 'text-[var(--accent-blue)]',
  class: 'text-[var(--accent-blue)] font-semibold',
  comment: 'text-[var(--text-soft)]',
  keyword: 'text-[var(--accent-green)] font-semibold',
  plain: 'text-[var(--text-muted)]',
  string: 'italic text-[var(--text-primary)]',
} as const

interface CodeSampleCardProps {
  sample: CodeSample
  site: SiteData
}

export function CodeSampleCard({ sample, site }: CodeSampleCardProps) {
  const { resolvedTheme } = useTheme()

  return (
    <article
      className="neu-flat rounded-[2.2rem] p-6 sm:p-7"
      style={getCardThemeStyle(site, resolvedTheme, sample)}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {sample.language}
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-[var(--text-primary)]">
            {sample.title}
          </h3>
        </div>
        <div className="flex gap-2">
          <span className="code-dot code-dot-error" />
          <span className="code-dot code-dot-warning" />
          <span className="code-dot code-dot-success" />
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{sample.caption}</p>

      <div className="code-surface neu-inset scrollbar-soft mt-6 overflow-x-auto rounded-[1.7rem] p-5">
        <pre className="min-w-[18rem] text-sm leading-7">
          {sample.lines.map((line, lineIndex) => (
            <div key={`${sample.id}-${lineIndex}`} className="whitespace-pre">
              <span>{'  '.repeat(line.indent ?? 0)}</span>
              {line.tokens.map((token, tokenIndex) => (
                <span
                  key={`${sample.id}-${lineIndex}-${tokenIndex}`}
                  className={tokenClassNames[token.tone ?? 'plain']}
                >
                  {token.text}
                </span>
              ))}
            </div>
          ))}
        </pre>
      </div>
    </article>
  )
}
