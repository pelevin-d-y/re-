import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

interface Props {
  className?: string
  names: string | (string | undefined)[]
}

const ModalSent: React.FC<Props> = ({ className, names }) => {
  const messageTemplate =
    typeof names === 'string'
      ? `Nice work on following up w/ ${names}. Ready to keep it going?`
      : `Nice work on sending list to ${names.join(' & ')}`

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.check}>
        <SvgIcon
          className={s.icon}
          icon={require('public/svg/check.svg?include')}
        />
      </div>
      <div className={s.text}>{messageTemplate}</div>
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
`

export default ModalSent
