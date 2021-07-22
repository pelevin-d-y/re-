import React, { useState } from 'react'
import classNames from 'classnames'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import Close from 'src/components/shared-ui/Close'
import ModalClose from 'src/components/shared-ui/Close'
import Avatar from 'src/components/shared-ui/Avatar'
import PopoverUserInfo from 'src/components/shared-ui/popover/PopoverUserInfo'
import UserHeader from 'src/components/shared-ui/UserHeader'
import parseEmailMessage from 'src/helpers/utils/parse-message'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { css } from 'astroturf'

type Props = {
  className?: string
  classRemove?: string
  data: UserData
  removeHandler: (card?: UserData) => void
}

const PopoverRemoveCard: React.FC<Props> = ({
  className,
  classRemove,
  data,
  removeHandler,
}) => {
  const { name, avatar, templateData, relationshipStrength } = data
  const [isOpen, setIsOpen] = useState(false)

  const closeHandler = () => {
    setIsOpen(false)
  }

  return (
    <Popover
      position="bottom center"
      triggerElement={
        <div>
          <Close
            className={classRemove}
            handler={() => {
              removeHandler()
              setIsOpen(true)
            }}
          />
        </div>
      }
      open={isOpen}
      popupContent={
        <CardContainer className={classNames(className, s.popup)}>
          <div className={s.title}>
            <div className={s.titleText}>Ignore reason?</div>
            <ModalClose handler={closeHandler} className={s.close} />
          </div>
          <Avatar
            image={avatar}
            width={54}
            height={54}
            className={s.avatar}
            strength={relationshipStrength}
          />
          {templateData && (
            <PopoverUserInfo
              className={s.name}
              data={data}
              template={templateData}
            />
          )}
          {templateData && (
            <UserHeader
              className={s.description}
              text={parseEmailMessage(templateData.Header, name)}
            />
          )}
          <div className={s.buttons}>
            <button className={s.button} type="button" onClick={closeHandler}>
              Not relevant
            </button>
            <button className={s.button} type="button" onClick={closeHandler}>
              Not a good time
            </button>
            <button className={s.button} type="button" onClick={closeHandler}>
              We spoke offline
            </button>
            <button className={s.button} type="button" onClick={closeHandler}>
              Will reach out later
            </button>
            <button
              className={classNames(s.button, s.buttonWithoutBorder)}
              type="button"
              onClick={closeHandler}
            >
              Never will contact
            </button>
          </div>
        </CardContainer>
      }
      showPopupEvent="click"
    />
  )
}

const s = css`
  .popup {
    padding: 22px 12px 10px 22px;
    margin-top: 5px;
    background: var(--white);
  }

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 19px;
  }

  .titleText {
    font-weight: 800;
    font-size: 16px;
    line-height: 19px;
    margin-right: 62px;
  }

  .avatar {
    margin-bottom: 12px;
  }

  .name {
    margin-bottom: 6px;
    font-weight: var(--bold);
  }

  .description {
    margin-bottom: 14px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
  }

  .button {
    cursor: pointer;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;

    background-color: white;
    border: none;
    border-bottom: 1px solid #f6f6f6;
    margin-bottom: 7px;
    padding: 0 0 9px 0;
    text-align: start;

    &:hover {
      color: var(--blue);
    }
  }

  .buttonWithoutBorder {
    border-bottom: none;
  }
`

export default PopoverRemoveCard
