import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Close from 'src/components/shared-ui/Close'

type Props = {
  className?: string
  data: { email: string; status: number }
}

const GoogleEmail: React.FC<Props> = ({ className, data }) => (
  <CardContainer className={classNames(className, s.container)}>
    <SvgIcon className={s.icon} icon="google-mail.svg" />
    <div className={s.content}>
      <div className={s.email}>{data.email}</div>
      {data.status === 2 && (
        <div className={classNames(s.status, s.synced)}>Synced</div>
      )}
      {data.status === 1 && (
        <div className={classNames(s.status, s.unSynced)}>Unsynced</div>
      )}
      {data.status === -1 && (
        <div className={classNames(s.status, s.unSynced)}>
          Re-authorize account
        </div>
      )}
    </div>
    <Close className={s.close} handler={() => null} />
  </CardContainer>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 13px 12px 14px 16px;
    &:hover {
      .close {
        visibility: visible;
      }
    }
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

  .unSynced {
    color: var(--red);
  }

  .content {
    margin-right: 10px;
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
    background: white;
    visibility: hidden;
    @include mobile {
      visibility: visible;
    }
  }
`

export default GoogleEmail
