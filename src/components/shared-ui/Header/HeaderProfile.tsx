import React from 'react'
import { css } from 'astroturf'
import Avatar from 'src/components/shared-ui/Avatar'

type Props = {
  address: string
  avatar?: string
}

const HeaderProfile: React.FC<Props> = ({ address, avatar }) => (
  <div className={s.container}>
    <div className={s.email}>{address}</div>
    <Avatar image={require(`public/images/${avatar}`)} />
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer;
  }

  .email {
    font-size: 12px;
    margin-right: 18px;
  }
`

export default HeaderProfile
