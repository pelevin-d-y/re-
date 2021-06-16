import React from 'react'
import classNames from 'classnames'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import PopoverDots from 'src/components/shared-ui/popover/PopoverDots'
import Avatar from 'src/components/shared-ui/Avatar'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import PopoverActions from 'src/components/shared-ui/popover/PopoverActions'
import { usePopup } from 'src/components/context/PopupContext'
import { css } from 'astroturf'

type Props = {
  className?: string
  data: UserData
  template: Template
}

const PopoverUserInfo: React.FC<Props> = ({ className, data, template }) => {
  const { name, avatar } = data
  const { Subject, Summary } = template

  const { dispatch } = usePopup()

  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_CONTACT_POPUP', payload: data })
  }

  return (
    <Popover
      triggerElement={
        <div className={classNames(className, s.trigger)}>{name}</div>
      }
      popupContent={
        <CardContainer className={classNames(className, s.popup)}>
          <div className={s.header}>
            <Avatar
              image={require(`public/images/${avatar}`)}
              width={54}
              height={54}
              className={s.avatar}
              straight={data.connection_E}
            />
            <div className={s.headerInfo}>
              <div className={s.name}>{name}</div>
              <div className={s.name}>{Subject}</div>
            </div>
          </div>
          <div className={s.summary}>{Summary}</div>
          <div className="actions">
            <PopoverDots variant="outlined" />
            <PopoverActions
              variant="contained"
              buttonClickHandler={buttonHandler}
            />
          </div>
        </CardContainer>
      }
    />
  )
}

const s = css``
export default PopoverUserInfo
