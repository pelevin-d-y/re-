import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import PersonalizationSocial from './PersonalizationSocial'

type Props = {
  className?: string
}

const socials = [
  {
    background: '#29AAE3',
    text: 'Twitter',
    icon: 'social-tw.svg',
  },
  {
    background: '#1877F2',
    text: 'Facebok',
    icon: 'social-fb.svg',
  },
  {
    background: '#2867B2',
    text: 'LinkedIn',
    icon: 'social-ln.svg',
  },
]

const Socials: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    {socials.map((item) => (
      <PersonalizationSocial className={s.social} key={item.text} data={item} />
    ))}
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row wrap;
  }

  .social {
    margin-right: 7px;
  }
`

export default Socials
