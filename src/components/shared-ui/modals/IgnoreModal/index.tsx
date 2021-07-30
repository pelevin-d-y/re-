import React from 'react'
import classNames from 'classnames'
import Close from 'src/components/shared-ui/Close'
import Avatar from 'src/components/shared-ui/Avatar'
import UserHeader from 'src/components/shared-ui/UserHeader'
import parseEmailMessage from 'src/helpers/utils/parse-message'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { css } from 'astroturf'
import { useClient } from 'src/components/context/ClientContext'
import ModalBase from 'src/components/shared-ui/modals/ModalBase'
import { random } from 'lodash'
import { usePopup } from 'src/components/context/PopupContext'

type Props = {
  className?: string
}

const Ignore: React.FC<Props> = ({ className }) => {
  const { state: popupState, dispatch: popupDispatch } = usePopup()
  const { state: clientState, updateUserData } = useClient()
  const { name, avatar, templateData, address, relationshipStrength } =
    popupState.data

  const getRandomIndex = () =>
    random(
      (clientState?.contacts as []).filter(
        (item: UserData) => item.address !== address
      ).length - 1
    )

  const closeHandler = () => {
    popupDispatch({ type: 'TOGGLE_IGNORE_POPUP', payload: {} })
  }

  const removeCard = () => {
    popupDispatch({ type: 'TOGGLE_IGNORE_POPUP', payload: {} })
    const contacts: UserData[] = clientState?.contacts as []
    const prevIndex = contacts.findIndex(
      (item) => item.address === popupState.data.address
    )
    const nextIndex = getRandomIndex()
    const newContacts = contacts.map((item, index) => {
      if (index === prevIndex) {
        return contacts[nextIndex]
      }
      if (index === nextIndex) {
        return contacts[prevIndex]
      }
      return item
    })
    updateUserData({ ...clientState, contacts: newContacts })
  }

  return (
    <ModalBase
      className={classNames(className, s.container)}
      isOpen={popupState.ignoreModalIsOpen}
      onClose={closeHandler}
    >
      <CardContainer className={classNames(className, s.popup)}>
        <div className={s.title}>
          <div className={s.titleText}>Ignore reason?</div>
          <Close handler={closeHandler} className={s.close} />
        </div>
        <Avatar
          image={avatar}
          width={54}
          height={54}
          className={s.avatar}
          strength={relationshipStrength}
        />
        <div className={s.name}>{name}</div>
        {templateData && (
          <UserHeader
            className={s.description}
            text={parseEmailMessage(templateData.Header, name)}
          />
        )}
        <div className={s.buttons}>
          <button className={s.button} type="button" onClick={removeCard}>
            Not relevant
          </button>
          <button className={s.button} type="button" onClick={removeCard}>
            Not a good time
          </button>
          <button className={s.button} type="button" onClick={removeCard}>
            We spoke offline
          </button>
          <button className={s.button} type="button" onClick={removeCard}>
            Will reach out later
          </button>
          <button
            className={classNames(s.button, s.buttonWithoutBorder)}
            type="button"
            onClick={removeCard}
          >
            Never will contact
          </button>
        </div>
      </CardContainer>
    </ModalBase>
  )
}

const s = css`
  .container {
    max-width: 254px;
    width: 100%;
    min-height: auto;
  }

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
    max-width: 220px;
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

export default Ignore
