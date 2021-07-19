import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Social from './Social'

type Props = {
  className?: string
}

const Socials: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <Social className={s.social} icon="social-ln.svg" />
    <Social className={s.social} icon="social-fb.svg" />
    <Social className={s.social} icon="social-in.svg" />
    <Social className={s.social} icon="social-tw.svg" />
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
