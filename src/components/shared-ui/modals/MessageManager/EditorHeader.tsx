/* eslint-disable camelcase */
import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import TextareaAutosize from 'react-textarea-autosize'
import Chips from 'src/components/shared-ui/Chips'

type Props = {
  className?: string
  data: SendMessageData
  setValue: (field: SendMessageField, value: any) => void
}

const ModalEditorHeader: React.FC<Props> = ({ className, data, setValue }) => {
  const [isCc, setIsCc] = useState(false)
  const [isBcc, setIsBcc] = useState(false)

  const onChangeField = (value: string, field: SendMessageField) => {
    setValue(field, value)
  }

  return (
    <div className={classNames(s.container, className)}>
      <div className={s.item}>
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
        <TextareaAutosize
          className={classNames(s.subject, s.textarea)}
          defaultValue={data.subject}
          name="subject"
          onChange={(evt: React.FormEvent<HTMLTextAreaElement>) =>
            onChangeField(evt.currentTarget.value, 'subject')
          }
        />
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
    grid-template-columns: auto 58px;
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
