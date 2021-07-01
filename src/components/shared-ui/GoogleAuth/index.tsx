import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
}

const GoogleAuth: React.FC<Props> = ({ className }) => (
  <div className={classNames(s.container, className)}>
    <a className={s.link} href="http://login.strata.cc">
      <img
        className={s.image}
        src={require('public/images/btn_google_signin_dark_normal_web@2x.png')}
        alt="google auth btn"
      />
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
    width: 100%;
    height: 100%;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    &:hover {
      box-shadow: 0 0 14px -3px rgba(57, 108, 173, 0.6);
    }
  }
`

export default GoogleAuth
