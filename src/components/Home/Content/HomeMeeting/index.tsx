import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Star from 'src/components/shared-ui/Star'
import PopoverDots from 'src/components/shared-ui/popover/PopoverDots'
import Button from 'src/components/shared-ui/Button'
import CardHeader from 'src/components/shared-ui/cards/CardHeader'
import CardLikes from 'src/components/shared-ui/cards/CardLikes'
import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import { users } from 'src/testData'

type Props = {
  className?: string
}

const headerData = {
  month: 'feb',
  day: '18',
  title: 'Your meeting with Company X ',
  description: 'February 12, 2021 - Frontend Round table',
}

const HomeMeeting: React.FC<Props> = ({ className }) => {
  const { toggleMultiEmailsPopup } = usePopup()
  const { updateUsersData } = useUsers()
  const followUpWithAllHandler = () => {
    updateUsersData(users)
    toggleMultiEmailsPopup()
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <Star className={s.star} />
      <CardHeader data={headerData} />
      <div className={s.cards}>
        {users.slice(0, 6).map((item) => (
          <CardLikes
            key={item.id}
            className={s.card}
            name={item.name}
            avatar={item.avatar}
            position={item.position}
            event={item.event}
          />
        ))}
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
    top: 19px;
    right: 13px;
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
