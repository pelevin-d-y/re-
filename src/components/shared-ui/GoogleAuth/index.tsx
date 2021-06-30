import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
}

const GoogleAuth: React.FC<Props> = ({ className }) => (
  <div className={classNames(s.container, className)}>
    <a
      className={s.link}
      href="https://api.nylas.com/oauth/login?proposal_id=2ix79pthloshsbjd36d0d0z1x&state=USERID"
    >
      <SvgIcon icon={require(`public/svg/google-btn.svg?include`)} />
    </a>
  </div>
)

const s = css`
  .container {
    width: 100%;
    height: 100%;
  }

  .link {
    display: block;
  }
`

export default GoogleAuth
