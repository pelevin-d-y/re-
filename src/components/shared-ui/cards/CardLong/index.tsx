import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Avatar from 'src/components/shared-ui/Avatar'
import PopoverRate from 'src/components/shared-ui/popover/PopoverRate'
import { usePopup } from 'src/components/context/PopupContext'
import UserEvent from 'src/components/shared-ui/UserEvent'
import CardContainer from '../CardContainer'

type Props = {
  className?: string
  data: UserData
}

const LongCard: React.FC<Props> = ({ data, className }) => {
  const { avatar, name, position, event } = data
  const { toggleEmailPopup, updatePopupData } = usePopup()
  const buttonHandler = () => {
    updatePopupData({ name, avatar, event })
    toggleEmailPopup()
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <div className={s.profile}>
        <Avatar className={s.avatar} image={avatar} />
        <div className={s.text}>
          <div className={s.name}>{name}</div>
          <div className={s.position}>{position}</div>
        </div>
      </div>
      <UserEvent
        className={s.event}
        circleColor="black"
        text={event as string}
      />
      <PopoverRate
        className={s.button}
        buttonClickHandler={buttonHandler}
        variant="outlined"
      >
        Reach out
      </PopoverRate>
    </CardContainer>
  )
}

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    padding: 10px 22px 14px 17px;
    margin-bottom: 8px;
  }

  .profile {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    max-width: 250px;
    width: 100%;

    margin-right: 9%;
  }

  .avatar {
    margin-right: 26px;
  }

  .event {
    flex: 1 0 auto;
  }

  .name {
    margin-bottom: 4px;
    font-weight: var(--bold);
    line-height: 16px;
  }

  .position {
    font-size: 12px;
  }

  .button {
    max-width: 119px;
    width: 100%;
  }
`

export default LongCard
