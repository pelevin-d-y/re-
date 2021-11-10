import React from 'react'
import Layout from 'src/layouts/Layout'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { css } from 'astroturf'
import AllRecommendationsContent from 'src/components/AllRecsContent'
import ContactModal from 'src/components/shared-ui/modals/ContactModal'

type Props = {
  className?: string
}

const Personalization: React.FC<Props> = () => (
  <Layout className={s.layout}>
    <TemplatesProvider>
      <TemplatesProvider>
        <PopupProvider>
          <AllRecommendationsContent />
          <ContactModal />
        </PopupProvider>
      </TemplatesProvider>
    </TemplatesProvider>
  </Layout>
)

const s = css`
  .layout {
    background: var(--lightGrey);
  }
`

export default Personalization
