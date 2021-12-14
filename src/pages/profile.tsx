import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { PopupProvider } from 'src/components/context/PopupContext'
import Layout from 'src/layouts/Layout'
import ContactModal from 'src/components/shared-ui/modals/ContactModal'
import ProfileContent from 'src/components/ProfileContent'

type Props = {
  className?: string
}

const Profile: React.FC<Props> = ({ className }) => (
  <PopupProvider>
    <Layout className={s.layout}>
      <ProfileContent />
      <ContactModal />
    </Layout>
  </PopupProvider>
)

const s = css`
  .container {
  }
`

export default Profile
