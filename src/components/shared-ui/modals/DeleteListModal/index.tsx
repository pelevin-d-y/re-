import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import Close from 'src/components/shared-ui/Close'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import ModalBase from 'src/components/shared-ui/modals/ModalBase'
import ModalListActions from '../ModalListActions'

type Props = {
  className?: string
}

const DeleteListModal: React.FC<Props> = ({ className }) => {
  const { state: popupState, dispatch: popupDispatch } = usePopup()
  const closeHandler = () => {
    popupDispatch({ type: 'TOGGLE_DELETE_LIST_POPUP' })
  }

  return (
    <ModalBase
      className={classNames(className, s.container)}
      isOpen={popupState.deleteListModalIsOpen}
      onClose={closeHandler}
    >
      <CardContainer className={classNames(className, s.popup)}>
        <div className={s.title}>
          <div className={s.titleText}>Delete list?</div>
          <Close handler={closeHandler} className={s.close} />
        </div>
        <ModalListActions
          items={[
            {
              text: 'Not relevant',
              action: () => null,
            },
            {
              text: 'Bad recommendations',
              action: () => null,
            },
            {
              text: 'Not useful',
              action: () => null,
            },
            {
              text: 'Recommend later',
              action: () => null,
            },
          ]}
        />
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

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 19px;
  }

  .titleText {
    font-weight: var(--bold);
    font-size: 16px;
    line-height: 19px;
    margin-right: 62px;
  }

  .popup {
    padding: 15px 12px 10px 22px;
    margin-top: 5px;
    background: var(--white);
  }
`

export default DeleteListModal
