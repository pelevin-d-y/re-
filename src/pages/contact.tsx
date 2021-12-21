import React from 'react'
import { css } from 'astroturf'
import { PopupProvider } from 'src/components/context/PopupContext'
import Layout from 'src/layouts/Layout'
import ContactContent from 'src/components/ContactContent'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'
import { PlaylistProvider } from 'src/components/context/PlaylistContext'

type Props = {
  className?: string
}

const Contact: React.FC<Props> = ({ className }) => (
  <Layout className={s.layout}>
    <PlaylistsProvider>
      <PlaylistProvider>
        <TemplatesProvider>
          <PopupProvider>
            <ContactContent />
          </PopupProvider>
        </TemplatesProvider>
      </PlaylistProvider>
    </PlaylistsProvider>
  </Layout>
)

const s = css`
  .container {
  }
`

export default Contact
