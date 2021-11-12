/* eslint-disable camelcase */
import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import TextareaAutosize from 'react-textarea-autosize'
import { useClient } from 'src/components/context/ClientContext'
import Chips from 'src/components/shared-ui/Chips'
import Selector from 'src/components/shared-ui/Select'

type Props = {
  className?: string
  data: SendMessageData
  setValue: (field: SendMessageField, value: any) => void
}

const ModalEditorHeader: React.FC<Props> = ({ className, data, setValue }) => {
  const { state } = useClient()
  const [isCc, setIsCc] = useState(false)
  const [isBcc, setIsBcc] = useState(false)

  const onChangeField = (value: string, field: SendMessageField) => {
    setValue(field, value)
  }

  return (
    <div className={classNames(s.container, className)}>
      <div className={s.item}>
        <div className={s.subtitle}>To:</div>
        <Chips setValue={setValue} name="to_contact_list" data={data} />
        <div className={s.buttons}>
          <button
            className={classNames(s.button, isCc && s.btnActive)}
            type="button"
            onClick={() => setIsCc(!isCc)}
          >
            Cc
          </button>
          <button
            className={classNames(s.button, isBcc && s.btnActive)}
            type="button"
            onClick={() => setIsBcc(!isBcc)}
          >
            Bcc
          </button>
        </div>
      </div>

      {isCc && (
        <div className={s.item}>
          <div className={s.subtitle}>Cc:</div>
          <Chips setValue={setValue} name="cc_contact_list" data={data} />
        </div>
      )}
      {isBcc && (
        <div className={s.item}>
          <div className={s.subtitle}>Bcc:</div>
          <Chips setValue={setValue} name="bcc_contact_list" data={data} />
        </div>
      )}

      <div className={s.item}>
        <div className={s.subtitle}>Subject:</div>
        <TextareaAutosize
          className={classNames(s.subject, s.textarea)}
          defaultValue={data.subject}
          name="subject"
          onChange={(evt: React.FormEvent<HTMLTextAreaElement>) =>
            onChangeField(evt.currentTarget.value, 'subject')
          }
        />
      </div>
      <div className={s.item}>
        <div className={s.subtitle}>From:</div>
        <div className={s.from}>
          {state.data?.syncedEmails && (
            <Selector
              handler={(select) => {
                onChangeField(select.value, 'from_contact')
              }}
              value={{
                value: data.from_contact || '',
                label: data.from_contact || '',
              }}
              options={state.data.syncedEmails.map((item) => ({
                label: item,
                value: item,
              }))}
              classes={{ arrow: s.selectArrow }}
              styles={{
                container: {
                  maxWidth: '230px',
                  width: '100%',
                },
                control: {
                  minHeight: 'auto',
                  border: 'none !important',
                },
                singleValue: {
                  width: 'calc(100% - 40px)',
                  fontSize: '12px',
                  color: '#1966ff',
                },
                valueContainer: {
                  padding: 0,
                },
                menu: {
                  border: 'none',
                  boxShadow: 0,
                  color: '#000000',
                },
                menuList: {
                  border: 'none',
                  boxShadow: 0,
                },
                indicatorsContainer: {
                  padding: '10px',
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const s = css`
  .container {
    display: block;
  }

  .item {
    display: grid;
    grid-template-columns: 52px auto 58px;
    padding: 12px 14px 10px 20px;

    border-bottom: 1px solid #dddddd;
    font-size: 12px;
    line-height: 14px;
    font-weight: var(--medium);
  }

  .subtitle {
    padding-right: 5px;
    padding-top: 1px;
  }

  .textarea {
    width: 100%;
    border: none;
    resize: none;
    outline: none;
    font-weight: var(--medium);
  }

  .to {
    color: var(--blue);
  }

  .from {
    color: var(--blue);
  }

  .buttons {
    flex: 1 0 auto;
  }

  .button {
    color: #a3a3a3;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      color: var(--blue);
    }
  }

  .btnActive {
    color: var(--blue);
  }

  .selectArrow {
    width: 9px;
    height: 9px;
  }
`

export default ModalEditorHeader
