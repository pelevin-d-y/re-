import React from 'react'
import Layout from 'src/layouts/Layout'
import PersonalizationContent from 'src/components/PersonalizationContent'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { css } from 'astroturf'

type Props = {
  className?: string
}

const Personalization: React.FC<Props> = () => (
  <Layout className={s.layout}>
    <TemplatesProvider>
      <PersonalizationContent />
    </TemplatesProvider>
  </Layout>
)

const s = css`
  .layout {
    background: var(--shades2);
  }
`

export default Personalization
