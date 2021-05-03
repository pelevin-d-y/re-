import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardUserEvent from 'src/components/shared-ui/cards/CardUserEvent'
import CardMeetingsEvents from 'src/components/shared-ui/cards/CardMeetingsEvents'

type Props = {
  className?: string
}

const HomeTripleCards: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <div className={s.left}>
      <CardUserEvent
        title="Mary’s move?"
        event="Moved to Austin, Texas"
        name="Mary Smith"
        avatar={require('public/images/mary.jpeg')}
        image={require('public/images/pathIcon.png')}
      />
      <CardUserEvent
        title="Birthday Wishes!"
        event="It’s Taylor’s Birthday"
        name="Taylor Smith"
        avatar={require('public/images/gino.jpeg')}
        image={require('public/images/birthdayIcon.png')}
      />
    </div>
    <CardMeetingsEvents />
  </div>
)

const s = css`
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 13px;
  }

  .left {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-gap: 10px;
  }
`

export default HomeTripleCards
