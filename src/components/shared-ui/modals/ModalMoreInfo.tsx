import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Arrow from 'public/svg/inputArrow.svg'
import ModalLastMessage from './ModalLastMessage'
import ModalAdditionInfo from './ModalAdditionInfo'

const ModalMoreInfo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const collapseHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={s.container}>
      <button type="button" onClick={collapseHandler} className={s.trigger}>
        {isOpen ? 'Less' : 'More'} Info about Landon <Arrow className={classNames(s.arrowIcon, isOpen && s.arrowOpen)} />
      </button>
      {isOpen && (
        <div className={s.content}>
          <ModalLastMessage className={s.contentItem} />
          <ModalAdditionInfo className={s.contentItem} />
        </div>
      )}
    </div>
  )
}

const s = css`
  .trigger {
    width: 100%;
    background: #fbfbfb;
    padding: 23px 18px 25px;
    cursor: pointer;

    border: none;
    outline: none;
    color: #949494;
  }

  .arrowIcon {
    width: 9px;
    height: 7px;
    margin-left: 14px;
  }

  .arrowOpen {
    transform: rotate(180deg);
  }

  .content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    padding: 35px 34px 40px;
    margin-left: -25px;
  }

  .contentItem {
    width: 50%;
    margin-left: 25px;
  }
`

export default ModalMoreInfo
