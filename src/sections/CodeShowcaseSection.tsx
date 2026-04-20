import { CodeSampleCard } from '../components/CodeSampleCard'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import type { PortfolioSectionProps } from '../types/portfolio'

export default function CodeShowcaseSection({ data }: PortfolioSectionProps) {
  return (
    <div className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Code Blocks"
          title={[
            { text: 'Short code placeholders moved into their own ' },
            { text: 'dedicated section', accent: true },
            { text: '.' },
          ]}
          description={[
            { text: 'These blocks now live separately from the profile summary so they feel like future technical notes instead of mixed profile content.' },
          ]}
        />

        <div className="mt-14 grid gap-6 xl:grid-cols-2">
          {data.codeSamples.map((sample, index) => (
            <Reveal key={sample.id} delay={0.06 + index * 0.05} index={index} seed={37}>
              <CodeSampleCard sample={sample} site={data.site} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
