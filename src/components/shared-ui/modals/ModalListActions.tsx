import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
  items: {
    text: string
    action: () => void
  }[]
}

const ModalListActions: React.FC<Props> = ({ className, items }) => (
  <div className={classNames(s.container, className)}>
    {items.map((item) => (
      <button
        className={s.button}
        type="button"
        onClick={item.action}
        key={item.text}
      >
        {item.text}
      </button>
    ))}
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-direction: column;
  }

  .button {
    cursor: pointer;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;

    background-color: white;
    border: none;
    border-bottom: 1px solid #f6f6f6;
    margin-bottom: 7px;
    padding: 0 0 9px 0;
    text-align: start;

    &:hover {
      color: var(--blue);
    }
  }
`

export default ModalListActions
