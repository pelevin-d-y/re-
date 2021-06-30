import React from 'react'
import Layout from 'src/layouts/Layout'
import { css } from 'astroturf'
import PersonalizationContent from 'src/components/PersonalizationContent'

type Props = {
  className?: string
}

const Personalization: React.FC<Props> = () => (
  <Layout className={s.layout}>
    <PersonalizationContent />
  </Layout>
)

const s = css`
  .container {
  }
`

export default Personalization
