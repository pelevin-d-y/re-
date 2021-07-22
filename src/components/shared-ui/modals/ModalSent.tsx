import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Button from '../Button'

type Props = {
  className?: string
  names?: string | (string | undefined)[]
  handler: () => void
}

const ModalSent: React.FC<Props> = ({ className, names, handler }) => {
  const messageTemplate = () => {
    if (Array.isArray(names)) {
      return `Nice work on sending list to ${names.join(' & ')}`
    }

    if (typeof names === 'string') {
      return `Nice work on following up w/ ${names}. Ready to keep it going?`
    }

    return 'Message sent'
  }

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.check}>
        <SvgIcon className={s.icon} icon="check.svg" />
      </div>
      <div className={s.text}>{messageTemplate()}</div>
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
    max-width: 637px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    padding: 28px 12px 53px 12px;

    background: url('/svg/circles-background.svg') no-repeat center/cover;
  }

  .icon {
    position: absolute;
    left: 12px;
    bottom: 5px;
    width: 84px;
    height: 84px;
    color: var(--green);
  }

  .text {
    margin-top: 33px;
    max-width: 467px;

    font-weight: var(--bold);
    font-size: 26px;
    line-height: 32px;
    text-align: center;
  }

  .check {
    position: relative;
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background: #c0ffeb;
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
