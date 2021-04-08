import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Avatar from 'src/components/shared-ui/Avatar'
import ColorfulCircle from 'src/components/shared-ui/ColorfulCircle'
import PopoverRate from 'src/components/shared-ui/popover/PopoverRate'
import { usePopup } from 'src/helpers/context/PopupContext'
import CardContainer from '../CardContainer'

interface Props {
  className?: string
  data: {
    image: string
    name: string
    position: string
    event: string
  }
}

const LongCard: React.FC<Props> = ({ data, className }) => {
  const { image, name, position, event } = data
  const { openPopup, updatePopupData } = usePopup()
  const buttonHandler = () => {
    updatePopupData({ name, image })
    openPopup()
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <div className={s.profile}>
        <Avatar className={s.avatar} image={image} />
        <div className={s.text}>
          <div className={s.name}>{name}</div>
          <div className={s.position}>{position}</div>
        </div>
      </div>
      <div className={s.event}>
        <ColorfulCircle color="black" />
        {event}
      </div>
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

  .button {
    max-width: 119px;
    width: 100%;
  }
`

export default LongCard
