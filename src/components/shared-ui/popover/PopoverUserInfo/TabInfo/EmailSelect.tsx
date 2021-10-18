import React, { useRef, useState } from 'react'
import classNames from 'classnames'
import Select from 'src/components/shared-ui/Select'
import Img from 'src/components/shared-ui/Img'
import { css } from 'astroturf'
import useOnClickOutside from 'src/helpers/hooks/use-click-outside'

type Props = {
  emails: string[]
}

const EmailSelect: React.FC<Props> = ({ emails }) => {
  const [selectedEmail, setSelectedEmail] = useState(emails[0])
  const [selectIsOpen, setSelectIsOpen] = useState(true)

  const selectOpenHandler = () => {
    setSelectIsOpen(!selectIsOpen)
  }

  const selectRef = useRef(null)

  useOnClickOutside(selectRef, () => {
    if (selectIsOpen) {
      selectOpenHandler()
    }
  })

  return (
    <>
      <div className={s.itemTitle}>
        <div
          className={s.titleContainer}
          onClick={selectOpenHandler}
          onKeyDown={selectOpenHandler}
          role="button"
          tabIndex={0}
        >
          <span>Email ({emails.length})</span>
          <div className={s.changeButton}>
            <span>Primary</span>
          </div>
          <Select
            ref={selectRef}
            handler={(select) => {
              setSelectedEmail(select.value)
            }}
            isOpen={selectIsOpen}
            styles={{
              container: {
                width: '180px',
              },
              control: {
                border: 'none',
                '&:hover': {
                  border: 'none !important',
                },
                backgroundColor: 'white',
                minHeight: 'auto',
                width: 'max-content',
              },
              indicatorsContainer: {
                right: 'auto',
                padding: 0,
              },
              valueContainer: {
                padding: 0,
              },
              singleValue: {
                display: 'none',
              },
            }}
            value={{
              value: selectedEmail,
              label: selectedEmail,
            }}
            options={emails.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </div>
      </div>
      <div className={s.value}>{selectedEmail}</div>
    </>
  )
}

const s = css`
  .titleContainer {
    display: flex;
  }

  .itemTitle {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 10px;
    white-space: nowrap;
    color: #adadad;
  }

  .changeButton {
    display: flex;
    margin-left: 5px;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #1966ff;
  }
`

export default EmailSelect
