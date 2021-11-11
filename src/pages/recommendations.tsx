import React from 'react'
import Layout from 'src/layouts/Layout'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { css } from 'astroturf'
import AllRecommendationsContent from 'src/components/AllRecsContent'
import ContactModal from 'src/components/shared-ui/modals/ContactModal'
import { TableProvider } from 'src/components/context/TableContext'
import MultiEmailsModal from 'src/components/shared-ui/modals/MultiEmailsModal'
import 'react-quill/dist/quill.snow.css'

type Props = {
  className?: string
}

const Personalization: React.FC<Props> = () => (
  <Layout className={s.layout}>
    <TemplatesProvider>
      <TemplatesProvider>
        <PopupProvider>
          <TableProvider>
            <AllRecommendationsContent />
          </TableProvider>
          <ContactModal />
          <MultiEmailsModal />
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
