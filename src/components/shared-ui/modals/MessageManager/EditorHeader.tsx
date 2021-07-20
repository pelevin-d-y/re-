/* eslint-disable camelcase */
import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import TextareaAutosize from 'react-textarea-autosize'
import { useClient } from 'src/components/context/ClientContext'

type Props = {
  className?: string
  data: SendMessageData
  setValue: (field: SendMessageField, value: any) => void
}

const ModalEditorHeader: React.FC<Props> = ({ className, data, setValue }) => {
  const { state } = useClient()
  const [isCc, setIsCc] = useState(false)
  const [isBcc, setIsBcc] = useState(false)

  const onChangeField = (
    event: React.FormEvent<HTMLTextAreaElement>,
    field: SendMessageField
  ) => {
    setValue(field, [{ address: event.currentTarget.value }])
  }

  const onChangeList = (
    event: React.FormEvent<HTMLTextAreaElement>,
    field: SendMessageField
  ) => {
    setValue(field, [{ address: event.currentTarget.value }])
  }

  return (
    <div className={classNames(s.container, className)}>
      <div className={s.item}>
        <div className={s.subtitle}>To:</div>
        <TextareaAutosize
          className={classNames(s.to, s.textarea)}
          defaultValue={
            data.to_contact_list ? data.to_contact_list[0]?.address : ''
          }
          name="to"
          onChange={(evt: React.FormEvent<HTMLTextAreaElement>) =>
            onChangeList(evt, 'to_contact_list')
          }
        />
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
      {isCc && (
        <div className={s.item}>
          <div className={s.subtitle}>Cc:</div>
          <TextareaAutosize
            className={classNames(s.textarea, s.cc)}
            name="cc"
            onChange={(evt: React.FormEvent<HTMLTextAreaElement>) =>
              onChangeList(evt, 'cc_contact_list')
            }
          />
        </div>
      )}
      {isBcc && (
        <div className={s.item}>
          <div className={s.subtitle}>Bcc:</div>
          <TextareaAutosize
            className={classNames(s.textarea, s.cc)}
            name="bcc"
            onChange={(evt: React.FormEvent<HTMLTextAreaElement>) =>
              onChangeList(evt, 'bcc_contact_list')
            }
          />
        </div>
      )}
      <div className={s.item}>
        <div className={s.subtitle}>Subject:</div>
        <TextareaAutosize
          className={classNames(s.subject, s.textarea)}
          defaultValue={data.subject}
          name="subject"
          onChange={(evt: React.FormEvent<HTMLTextAreaElement>) =>
            onChangeField(evt, 'subject')
          }
        />
      </div>
      <div className={s.item}>
        <div className={s.subtitle}>From:</div>
        <div className={s.from}>{state?.name}</div>
      </div>
    </div>
  )
}

const s = css`
  .container {
    display: block;
  }

  .item {
    display: flex;
    flex-flow: row nowrap;
    padding: 12px 14px 10px 20px;

    border-bottom: 1px solid #dddddd;
    font-size: 12px;
    line-height: 14px;
    font-weight: var(--medium);
  }

  .subtitle {
    min-width: 52px;
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
`

export default ModalEditorHeader
