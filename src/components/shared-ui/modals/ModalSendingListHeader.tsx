import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

interface Props {
  className?: string
}

const ModalSendingListHeader: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <div className={s.name}>Sending List</div>
    <div className={s.title}>MSG Fund</div>
    <div className={s.date}>January 12, 2012</div>
    <SvgIcon
      className={s.icon}
      icon={require('public/svg/lists.svg?include')}
    />
  </div>
)

const s = css`
  .container {
    position: relative;
    padding: 7px 0 40px 0;
  }

  .name {
    margin-bottom: 10px;

    font-weight: var(--bold);
    font-size: 24px;
    line-height: 42px;
    color: #c7c7c7;
  }

  .title {
    margin-bottom: 11px;

    font-weight: var(--bold);
    font-size: 38px;
    line-height: 42px;
  }

  .date {
    font-weight: var(--bold);
    font-size: 16px;
    line-height: 12px;
  }

  .icon {
    position: absolute;
    top: 36px;
    right: 77px;
    width: 109px;
    height: 109px;

    color: var(--blue);
  }
`

export default ModalSendingListHeader
