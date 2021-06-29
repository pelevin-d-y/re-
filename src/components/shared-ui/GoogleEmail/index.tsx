import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Close from 'src/components/shared-ui/Close'

type Props = {
  className?: string
  email: string
}

const GoogleEmail: React.FC<Props> = ({ className, email }) => (
  <CardContainer className={classNames(className, s.container)}>
    <SvgIcon
      className={s.icon}
      icon={require('public/svg/google-mail.svg?include')}
    />
    <div className={s.content}>
      <div className={s.email}>{email}</div>
      <div className={s.status}>Synced</div>
    </div>
    <Close className={s.close} handler={() => null} />
  </CardContainer>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 13px 12px 14px 16px;
  }

  .icon {
    display: flex;
    flex-flow: row nowrap;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;

    width: 43px;
    height: 43px;
    margin-right: 17px;

    border: 1px solid #e4e4e4;
    border-radius: 50%;

    svg {
      width: 50%;
    }
  }

  .status {
    color: var(--blue);
    font-size: 12px;
    line-height: 14px;
  }

  .email {
    margin-bottom: 5px;
    word-break: break-word;

    font-size: 12px;
    line-height: 14px;
  }

  .close {
    flex: 0 0 auto;
    margin-left: auto;
  }
`

export default GoogleEmail
