import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Star from 'src/components/shared-ui/Star'
import PopoverDots from 'src/components/shared-ui/popover/PopoverDots'
import Button from 'src/components/shared-ui/Button'
import CardHeader from 'src/components/shared-ui/cards/CardHeader'
import CardLikes from 'src/components/shared-ui/cards/CardLikes'
import { usePopup } from 'src/helpers/context/PopupContext'
import { useUsers } from 'src/helpers/context/UsersContext'

interface Props {
  className?: string
}

const cards = [
  {
    id: 1,
    image: require('public/images/gino.jpeg'),
    name: 'Landon Tucker',
    description: 'Founder at Company X',
    event: 'Landon is traveling in LA',
  },
  {
    id: 2,
    image: require('public/images/maker.jpeg'),
    name: 'Taylor Smith',
    description: 'Founder at Company X',
    event: 'Taylor is based in LA',
  },
  {
    id: 3,
    image: require('public/images/mary.jpeg'),
    name: 'Gino Mo',
    description: 'Founder at Company X',
    event: 'Gino took you to dinner',
  },
  {
    id: 4,
    image: require('public/images/james.png'),
    name: 'James Malone',
    description: 'Founder at Company X',
    event: 'James is based in LA',
  },
  {
    id: 5,
    image: require('public/images/gino.jpeg'),
    name: 'Mary Smith',
    description: 'Founder at Company X',
    event: 'Mary has a startup in LA',
  },
  {
    id: 6,
    image: require('public/images/maker.jpeg'),
    name: 'Mary Smith',
    description: 'Founder at Company X',
    event: 'Mary has a startup in LA',
  },
]

const headerData = {
  month: 'feb',
  day: '18',
  title: 'Your meeting with Company X ',
  description: 'February 12, 2021 - Frontend Round table',
}

const HomeMeeting: React.FC<Props> = ({ className }) => {
  const { toggleMultiEmailsPopup, updatePopupData } = usePopup()
  const { updateUsersData } = useUsers()
  const followUpWithAllHandler = () => {
    updatePopupData({})
    updateUsersData(cards)
    toggleMultiEmailsPopup()
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <Star className={s.star} />
      <CardHeader data={headerData} />
      <div className={s.cards}>
        {cards.map(
          (item, index) =>
            index <= 5 && (
              <CardLikes
                key={item.id}
                className={s.card}
                name={item.name}
                image={item.image}
                description={item.description}
              />
            )
        )}
      </div>
      <div className={s.buttons}>
        <PopoverDots
          className={classNames(s.buttonDots, s.button)}
          variant="outlined"
        />
        <Button
          className={classNames(s.buttonFollow, s.button)}
          variant="contained"
          handler={followUpWithAllHandler}
        >
          Follow up with all
        </Button>
      </div>
    </CardContainer>
  )
}

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

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-gap: 17px;
    margin-top: 18px;
  }

  .buttons {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 9px 18px;

    max-width: 300px;
    width: 100%;
    margin-top: 27px;
    margin-left: auto;
  }
`

export default HomeMeeting
