import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { usePopup } from 'src/components/context/PopupContext'
import ModalLastMessage from './ModalLastMessage'
import ModalAdditionInfo from './ModalAdditionInfo'

type Props = {
  className?: string
}

const ModalMoreInfo: React.FC<Props> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    state: { data },
  } = usePopup()
  const {
    name,
    last_contact_time: lastContactTime,
    last_contact_text: lastContactText,
  } = data

  const collapseHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={classNames(className, s.container)}>
      <button type="button" onClick={collapseHandler} className={s.trigger}>
        {isOpen ? 'Less' : 'More'} Info about {name}{' '}
        <SvgIcon
          className={classNames(s.arrowIcon, isOpen && s.arrowOpen)}
          icon={require('public/svg/inputArrow.svg?include')}
        />
      </button>
      {isOpen && (
        <div className={s.content}>
          <ModalLastMessage
            className={s.contentItem}
            lastContactTime={lastContactTime}
            lastContactText={lastContactText}
          />
          <ModalAdditionInfo className={s.contentItem} />
        </div>
      )}
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

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

    @include mobile {
      flex-flow: column nowrap;
      padding: 16px;
      margin-left: 0;
    }
  }

  .contentItem {
    width: 50%;
    margin-left: 25px;

    @include mobile {
      width: auto;
      margin-left: 0;
      margin-bottom: 12px;
    }
  }
`

export default ModalMoreInfo
