import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  className?: string
}

const HeaderToDos: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <FontAwesomeIcon icon={faList} className={s.icon} />
    <div className={s.text}>TO-DOs</div>
    <div className={s.number}>
      <div className={s.numberText}>13</div>
    </div>
  </div>
)

const s = css`
  .container {
    position: relative;

    display: flex;
    flex-flow: row nowrap;
    padding: 9px 8px 9px 12px;

    font-weight: var(--semibold);
    color: var(--green);
    border: 1px solid var(--green);
    border-radius: 16px;

    cursor: pointer;
  }

  .icon {
    margin-right: 6px;
  }

  .number {
    position: absolute;
    right: -6px;
    bottom: -11px;

    display: flex;
    justify-content: center;
    width: 22px;
    height: 22px;

    font-size: 11px;
    background: red;
    color: var(--white);
    border: 2px solid var(--white);
    border-radius: 50%;
  }
  .numberText {
    line-height: 20px;
  }
`

export default HeaderToDos
