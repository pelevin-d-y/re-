import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

interface Props {
  className?: string
}

const ModalSent: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <SvgIcon
      className={s.icon}
      icon={require('public/svg/check.svg?include')}
    />
    <div className={s.text}>
      Nice work on following up w/ Landon. Ready to keep it going?
    </div>
  </div>
)

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
`

export default ModalSent
