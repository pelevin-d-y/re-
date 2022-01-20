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
import Button from 'src/components/shared-ui/Button'
import Tabs from './Tabs'

type Props = {
  className?: string
  data: RecommendationUser | FormattedContact
}

const PopoverUserInfo: React.FC<Props> = ({ className, data }) => {
  const { dispatch } = usePopup()

  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: data })
  }

  const getName = () => {
    if ('name' in data) {
      return data.name
    }
    if ('emails' in data) {
      return data.emails && data.emails[0]?.data
    }
    return ''
  }

  const getAvatarUrl = () => {
    if ('image_url' in data) {
      return data.image_url
    }
    return data.avatar
  }

  const getSubject = () => {
    if ('message_template_subject' in data) {
      return data.message_template_subject
    }
    return ''
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions , jsx-a11y/click-events-have-key-events
    <div onClick={(e: any) => e.stopPropagation()}>
      <Popover
        showPopupEvent="click"
        nested
        triggerElement={
          <div className={classNames(className, s.trigger)}>{getName()}</div>
        }
        popupContent={
          <CardContainer className={classNames(s.popup)}>
            <div className={s.wrapper}>
              <div className={s.header}>
                <Avatar
                  image={getAvatarUrl()}
                  width={54}
                  height={54}
                  className={s.avatar}
                  // strength={data.relationshipStrength}
                />
                <div className={s.headerInfo}>
                  <div className={s.name}>{getName()}</div>
                  <div className={s.subject}>{getSubject()}</div>
                </div>
              </div>
              {/* <UserHeader
              className={s.summary}
              text={parseMessage(Summary, name)}
            /> */}
              <div className={s.actions}>
                <PopoverDots variant="outlined" />
                {/* <PopoverActions
                  variant="contained"
                  buttonClickHandler={buttonHandler}
                  isArrow
                >
                  Say Hi
                </PopoverActions> */}
                <Button
                  handler={buttonHandler}
                  className={classNames(s.button)}
                  variant="contained"
                >
                  Compose
                </Button>
              </div>
            </div>
            {data && <Tabs className={s.tabs} data={data} />}
          </CardContainer>
        }
      />
    </div>
  )
}

const s = css`
  .popup {
    max-width: 308px;
    width: 100%;
  }

  .trigger {
    cursor: pointer;
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
    margin-top: 0 px;
  }

  .button {
    text-align: center;
  }
`
export default PopoverUserInfo
