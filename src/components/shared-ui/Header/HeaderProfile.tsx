import React from 'react'
import { css } from 'astroturf'
import Avatar from 'src/components/shared-ui/Avatar'

const HeaderProfile: React.FC = () => (
  <div className={s.container}>
    <div className={s.email}>hailey@strata.cc</div>
    <Avatar />
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
