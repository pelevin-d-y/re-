import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import PopoverRate from 'src/components/shared-ui/popover/PopoverRate'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Star from 'src/components/shared-ui/Star'
import Avatar from 'src/components/shared-ui/Avatar'
import Likes from 'src/components/shared-ui/Likes'
import { usePopup } from 'src/helpers/context/PopupContext'

interface Props {
  className?: string
  name: string
  image: string
  description: string
}

const CardLikes: React.FC<Props> = ({
  className,
  image,
  name,
  description,
}) => {
  const { openPopup, updatePopupData } = usePopup()
  const buttonHandler = () => {
    updatePopupData({ name, image })
    openPopup()
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      <Star className={s.star} />
      <Avatar className={s.avatar} image={image} />
      <div className={s.name}>{name}</div>
      <div className={s.description}>{description}</div>
      <div className={s.buttons}>
        <Likes />
        <PopoverRate
          className={s.button}
          buttonClickHandler={buttonHandler}
          variant="outlined"
        >
          Followup
        </PopoverRate>
      </div>
    </CardContainer>
  )
}

const s = css`
  .container {
    overflow: hidden;
    position: relative;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding: 14px 10px 17px;
  }

  .star {
    position: absolute;
    right: 13px;
    top: 13px;
  }

  .avatar {
    margin-bottom: 9px;
  }

  .name {
    margin-bottom: 4px;
    font-weight: var(--bold);
  }

  .buttons {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin-top: 13px;
    width: 100%;
  }

  .button {
    max-width: 93px;
    width: 100%;
    margin-left: 5px;

    font-size: 12px;
  }
`

export default CardLikes
