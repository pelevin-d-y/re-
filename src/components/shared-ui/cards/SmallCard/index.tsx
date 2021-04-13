import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Star from 'src/components/shared-ui/Star'
import Avatar from 'src/components/shared-ui/Avatar'
import ColorfulCircle from 'src/components/shared-ui/ColorfulCircle'
import { usePopup } from 'src/components/context/PopupContext'
import PopoverRate from 'src/components/shared-ui/popover/PopoverRate'
import CardContainer from '../CardContainer'

interface dataProps {
  id: number
  name: string
  image: string
}
interface Props {
  className?: string
  data: dataProps
}

const SmallCard: React.FC<Props> = ({ className, data }) => {
  const { toggleEmailPopup, updatePopupData } = usePopup()
  const { name, image } = data

  const buttonHandler = () => {
    updatePopupData({ name, image })
    toggleEmailPopup()
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <Avatar image={image} width={44} height={44} className={s.avatar} />
      <div className={s.name}>{name}</div>
      <div className={s.actionType}>
        <ColorfulCircle />
        Follow up on Meetings
      </div>
      <PopoverRate
        buttonClickHandler={buttonHandler}
        className={s.button}
        variant="contained"
      >
        Follow Up
      </PopoverRate>
      <Star className={s.star} />
    </CardContainer>
  )
}

const s = css`
  .container {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background: var(--white);

    width: 100%;
    padding: 14px 24px 18px 24px;
  }

  .avatar {
    margin-bottom: 15px;
  }

  .actionType {
    margin-bottom: 12px;
  }

  .button {
    max-width: 140px;
    width: 100%;
  }

  .name {
    margin-bottom: 4px;
    font-weight: var(--bold);
  }

  .star {
    position: absolute;
    top: 13px;
    right: 13px;
  }
`

export default SmallCard
