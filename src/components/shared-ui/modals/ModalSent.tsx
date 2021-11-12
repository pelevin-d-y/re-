import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useClient } from 'src/components/context/ClientContext'

import Button from '../Button'
import Img from '../Img'
import CardContact from '../cards/CardContact'

type Props = {
  className?: string
  names?: string | (string | undefined)[]
  handler: () => void
}

const ModalSent: React.FC<Props> = ({ className, names, handler }) => {
  const { state } = useClient()

  const messageTemplate = () => {
    if (Array.isArray(names)) {
      return `Nice work on sending list to ${names.join(' & ')}`
    }

    if (typeof names === 'string') {
      return (
        <>
          <div>Nice work on following up!</div>
          <div className={s.smallText}>
            Keep it up and connect with {names}!{' '}
          </div>
        </>
      )
    }

    return 'Message sent'
  }

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.heder}>
        <Img className={s.check} img="sentCheck.png" alt="check" />
        <div className={s.text}>{messageTemplate()}</div>
      </div>
      <div className={s.cards}>
        {state.data?.contacts?.map((item, index) =>
          index < 6 ? (
            <CardContact className={s.card} data={item} key={item.contact_id} />
          ) : null
        )}
      </div>
      <Button variant="contained" className={s.buttonBack} handler={handler}>
        Back to home
      </Button>
    </div>
  )
}

const s = css`
  .container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    padding: 28px 12px 53px 12px;

    background: url('/svg/circles-background.svg') no-repeat center/cover;
  }

  .heder {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 20px;
  }

  .text {
    max-width: 467px;
    margin-left: 19px;

    font-weight: var(--bold);
    font-size: 26px;
    line-height: 32px;
  }

  .smallText {
    font-weight: var(--regular);
    font-size: 18px;
    line-height: 32px;
  }

  .check {
    width: 66px;
    height: 62px;
  }

  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
    margin-left: -17px;
  }

  .card {
    margin-left: 17px;
  }

  .buttonBack {
    display: block;
    max-width: 182px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 35px;
  }
`

export default ModalSent
