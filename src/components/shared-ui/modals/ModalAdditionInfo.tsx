import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

interface Props {
  className?: string
}

const ModalAdditionInfo: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <div className={s.item}>
      Introduced by <b>Michael Jameson</b> on Dec 1, 2019
    </div>
    <div className={s.item}>Mutual friends</div>
    <div className={s.item}>VCs in Phil’s Network</div>
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-flow: column nowrap;
  }

  .item {
    width: 100%;
    padding: 13px 15px;
    margin-bottom: 6px;

    border: 1px solid #ececec;
    border-radius: 18px;
  }
`

export default ModalAdditionInfo
