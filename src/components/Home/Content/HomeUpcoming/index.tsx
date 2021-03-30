import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import CardHeader from 'src/components/shared-ui/cards/CardHeader'
import LongCard from 'src/components/shared-ui/cards/LongCard'
import Star from 'src/components/shared-ui/Star'
import classNames from 'classnames'
import { css } from 'astroturf'

interface Props {
  className?: string
}

const users = [
  {
    src: '/images/gino.jpeg',
    name: 'Landon Tucker',
    position: 'Founder at Company X',
    event: 'Landon is traveling in LA',
  },
  {
    src: '/images/maker.jpeg',
    name: 'Taylor Smith',
    position: 'Founder at Company X',
    event: 'Taylor is based in LA',
  },
  {
    src: '/images/mary.jpeg',
    name: 'Gino Mo',
    position: 'Founder at Company X',
    event: 'Gino took you to dinner',
  },
]

const HomeUpcoming: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(className, s.container)}>
    <Star className={s.star} />
    <CardHeader month="feb" day="18" />
    <div className={s.cards}>
      {users.map((item) => (
        <LongCard data={item} key={item.name} />
      ))}
    </div>
  </CardContainer>
)

const s = css`
  .container {
    position: relative;
    padding: 16px 16px 32px 18px;
  }

  .star {
    position: absolute;
    top: 26px;
    right: 19px;
    z-index: 10;
  }
`

export default HomeUpcoming
