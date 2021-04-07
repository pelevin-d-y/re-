import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import CardHeader from 'src/components/shared-ui/cards/CardHeader'
import LongCard from 'src/components/shared-ui/cards/LongCard'
import Star from 'src/components/shared-ui/Star'
import classNames from 'classnames'
import { css } from 'astroturf'
import Button from 'src/components/shared-ui/Button'

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
  {
    src: '/images/james.png',
    name: 'James Malone',
    position: 'Founder at Company X',
    event: 'James is based in LA',
  },
  {
    src: '/images/gino.jpeg',
    name: 'Mary Smith',
    position: 'Founder at Company X',
    event: 'Mary has a startup in LA',
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
    <div className={s.buttons}>
      <Button className={classNames(s.buttonDots, s.button)} variant="outlined">
        •••
      </Button>
      <Button
        className={classNames(s.buttonFollow, s.button)}
        variant="contained"
      >
        Follow up with all
      </Button>
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

  .buttons {
    display: flex;
    flex-flow: row nowrap;

    max-width: 300px;
    width: 100%;
    margin-top: 26px;
    margin-left: auto;
  }

  .buttonDots {
    width: 30%;
  }

  .buttonFollow {
    width: 70%;
    margin-left: 17px;
  }
`

export default HomeUpcoming
