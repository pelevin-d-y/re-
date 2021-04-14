import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import CardHeader from 'src/components/shared-ui/cards/CardHeader'
import LongCard from 'src/components/shared-ui/cards/LongCard'
import Star from 'src/components/shared-ui/Star'
import classNames from 'classnames'
import { css } from 'astroturf'
import Button from 'src/components/shared-ui/Button'
import PopoverDots from 'src/components/shared-ui/popover/PopoverDots'
import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import { users } from 'src/testData'

interface Props {
  className?: string
}

const headerData = {
  month: 'feb',
  day: '20',
  title: 'Your Upcoming Trip to Los Angeles',
  description:
    'Plan your trip ahead but scheduling meetings with contacts in LA',
}

const HomeUpcoming: React.FC<Props> = ({ className }) => {
  const { toggleMultiEmailsPopup, updatePopupData } = usePopup()
  const { updateUsersData } = useUsers()
  const followUpWithAllHandler = () => {
    updatePopupData({})
    updateUsersData(users)
    toggleMultiEmailsPopup()
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <Star className={s.star} />
      <CardHeader data={headerData} />
      <div className={s.cards}>
        {users.map((item) => (
          <LongCard data={item} key={item.id} />
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
    top: 26px;
    right: 19px;
    z-index: 10;
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

export default HomeUpcoming
