import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Img from 'src/components/shared-ui/Img'

type Props = {
  className?: string
  authUrl: string
}

const GoogleAuth: React.FC<Props> = ({ className, authUrl }) => (
  <div className={classNames(s.container, className)}>
    <a className={s.link} href={authUrl}>
      <Img
        className={s.image}
        img="btn_google_signin_dark_normal_web@2x.png"
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
