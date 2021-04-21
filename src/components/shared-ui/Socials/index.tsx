import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Social from './Social'

type Props = {
  className?: string
}

const Socials: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <Social
      className={s.social}
      icon={require('public/svg/social-ln.svg?include')}
    />
    <Social
      className={s.social}
      icon={require('public/svg/social-fb.svg?include')}
    />
    <Social
      className={s.social}
      icon={require('public/svg/social-in.svg?include')}
    />
    <Social
      className={s.social}
      icon={require('public/svg/social-tw.svg?include')}
    />
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    z-index: 20;
  }

  .social {
    margin-right: 13px;

    &:last-child {
      margin-right: 0;
    }
  }
`

export default Socials
