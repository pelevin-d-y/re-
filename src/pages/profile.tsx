import React from 'react'
import { css } from 'astroturf'
import { PopupProvider } from 'src/components/context/PopupContext'
import Layout from 'src/layouts/Layout'
import ComposeModal from 'src/components/shared-ui/modals/ComposeModal'
import ProfileContent from 'src/components/ProfileContent'

type Props = {
  className?: string
}

const Profile: React.FC<Props> = ({ className }) => (
  <PopupProvider>
    <Layout className={s.layout}>
      <ProfileContent />
      <ComposeModal />
    </Layout>
  </PopupProvider>
)

const s = css`
  .container {
  }
`

export default Profile
