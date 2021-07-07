import React from 'react'
import classNames from 'classnames'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import PopoverDots from 'src/components/shared-ui/popover/PopoverDots'
import Avatar from 'src/components/shared-ui/Avatar'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import PopoverActions from 'src/components/shared-ui/popover/PopoverActions'
import { usePopup } from 'src/components/context/PopupContext'
import parseMessage from 'src/helpers/utils/parse-message'
import UserHeader from 'src/components/shared-ui/UserHeader'
import { css } from 'astroturf'
import Tabs from './Tabs'

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
      showPopupEvent="click"
      triggerElement={
        <div className={classNames(className, s.trigger)}>{name}</div>
      }
      popupContent={
        <CardContainer className={classNames(s.popup)}>
          <div className={s.wrapper}>
            <div className={s.header}>
              <Avatar
                image={avatar}
                width={54}
                height={54}
                className={s.avatar}
                strength={data.relationshipStrength}
              />
              <div className={s.headerInfo}>
                <div className={s.name}>{name}</div>
                <div className={s.subject}>{Subject}</div>
              </div>
            </div>
            <UserHeader
              className={s.summary}
              text={parseMessage(Summary, name)}
            />
            <div className={s.actions}>
              <PopoverDots variant="outlined" />
              <PopoverActions
                variant="contained"
                buttonClickHandler={buttonHandler}
                isArrow
              >
                Say Hi
              </PopoverActions>
            </div>
          </div>
          {data && <Tabs className={s.tabs} data={data} />}
        </CardContainer>
      }
    />
  )
}

const s = css`
  .popup {
    max-width: 308px;
    width: 100%;
  }

  .wrapper {
    padding: 20px;
  }

  .header {
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 12px;
  }

  .avatar {
    margin-right: 18px;
  }

  .name {
    margin-bottom: 7px;
    font-size: 16px;
    line-height: 19px;

    font-weight: var(--bold);
  }

  .summary {
    width: 100%;
    padding: 10px 13px;

    color: var(--blue);
    background: var(--lightBlue);
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 6px;
    margin-top: 14px;
  }
`
export default PopoverUserInfo
