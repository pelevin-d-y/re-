import React from 'react'
import Layout from 'src/layouts/Layout'
import PersonalizationContent from 'src/components/PersonalizationContent'
import { css } from 'astroturf'

type Props = {
  className?: string
}

const Personalization: React.FC<Props> = () => (
  <Layout className={s.layout}>
    <PersonalizationContent />
  </Layout>
)

const s = css`
  .layout {
    background: var(--shades2);
  }
`

export default Personalization
