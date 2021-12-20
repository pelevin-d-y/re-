import React from 'react'
import { css } from 'astroturf'
import { PopupProvider } from 'src/components/context/PopupContext'
import Layout from 'src/layouts/Layout'
import ComposeModal from 'src/components/shared-ui/modals/ComposeModal'
import ContactContent from 'src/components/ContactContent'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'

type Props = {
  className?: string
}

const Contact: React.FC<Props> = ({ className }) => (
  <Layout className={s.layout}>
    <PlaylistsProvider>
      <TemplatesProvider>
        <PopupProvider>
          <ContactContent />
          <ComposeModal />
        </PopupProvider>
      </TemplatesProvider>
    </PlaylistsProvider>
  </Layout>
)

const s = css`
  .container {
  }
`

export default Contact
