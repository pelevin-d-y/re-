import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useClient } from 'src/components/context/ClientContext'

import { usePopup } from 'src/components/context/PopupContext'
import Button from '../Button'
import Img from '../Img'
import CardContact from '../cards/CardContact'
import Typography from '../Typography'
import CloseButton from '../Close'

type Props = {
  className?: string
  names?: string | (string | undefined)[]
  handler: () => void
}

const ModalSent: React.FC<Props> = ({ className, names, handler }) => {
  const { state } = useClient()
  const { dispatch, state: popupState } = usePopup()

  const closeHandler = () => {
    if (popupState.multiEmailsIsOpen) {
      return dispatch({ type: 'TOGGLE_COMPOSE_MULTI_POPUP' })
    }
    return dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: null })
  }

  const messageTemplate = () => {
    if (Array.isArray(names)) {
      return `Nice work on sending list to ${names.join(' & ')}`
    }

    if (typeof names === 'string') {
      return (
        <>
          <Typography tagVariant="div" styleVariant="h3">
            Nice work on following up!
          </Typography>
          <Typography tagVariant="div" styleVariant="h4" fontWeight="regular">
            Keep it up and connect with {names}!{' '}
          </Typography>
        </>
      )
    }

    return 'Message sent'
  }

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.content}>
        <div className={s.top}>
          <Typography fontVariant="inter" styleVariant="h4" fontWeight="bold">
            Message Sent!
          </Typography>
          <CloseButton className={s.closeContainer} handler={closeHandler} />
        </div>
        <div
          className={classNames(
            s.header,
            state.data?.contacts?.length === 0 && s.headerEmpty
          )}
        >
          <Img className={s.check} img="sentCheck.png" alt="check" />
          <div className={s.text}>{messageTemplate()}</div>
        </div>
        <div className={s.cards}>
          {state.data?.contacts?.map((item, index) =>
            index < 6 ? (
              <CardContact
                className={s.card}
                data={item}
                key={item.contact_id}
              />
            ) : null
          )}
        </div>
      </div>
      <Button variant="outlined" className={s.buttonBack} handler={handler}>
        Return to Dashboard
      </Button>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 28px 12px;
    min-height: 350px;
  }

  .content {
    flex: 1 0 auto;
  }

  .top {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header {
    position: relative;
    display: flex;
    justify-content: center;
    flex-flow: row nowrap;
    margin-bottom: 20px;

    @include mobile {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &::after {
      content: '';
      position: absolute;
      display: block;
      background: var(--gradientLight);
      border-radius: 8px;
      width: 100%;
      height: 208px;
      z-index: 0;
      top: -20px;
    }
  }

  .headerEmpty {
    &::after {
      height: 137px;
    }
  }

  .text {
    z-index: 1;
    max-width: 467px;
    margin-left: 19px;
    color: white;
    font-weight: var(--bold);
    font-size: 26px;
    line-height: 32px;
  }

  .check {
    width: 66px;
    height: 62px;
    z-index: 1;
  }

  .cards {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  .card {
    width: 100%;
    margin: 11px;
    flex: 1 0 calc(33.333% - 90px);
    width: 100%;
    min-width: 193px;
    max-width: 193px;
  }

  .buttonBack {
    flex-shrink: 0;
    display: block;
    max-width: 262px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 35px;
  }
`

export default ModalSent
