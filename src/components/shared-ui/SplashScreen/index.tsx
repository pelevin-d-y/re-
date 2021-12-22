import React from 'react'
import { css } from 'astroturf'
import SvgIcon from '../SvgIcon'

const SplashScreen: React.FC = () => {
  return (
    <div className={s.container}>
      <SvgIcon className={s.logo} icon="logo-icon.svg" />
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    z-index: 9999;
  }

  .logo {
    width: 200px;
    height: 200px;
    animation-name: blink;
    animation-timing-function: linear;
    animation-duration: 2s;
    animation-iteration-count: infinite;

    @include mobile {
      width: 100px;
      height: 100px;
    }
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`

export default SplashScreen
