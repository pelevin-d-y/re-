import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import TextareaAutosize from 'react-textarea-autosize'
import parseMessage from 'src/helpers/utils/parse-message'
import { useClient } from 'src/components/context/ClientContext'

type Props = {
  className?: string
  data: UserData
}

const ModalEditorHeader: React.FC<Props> = ({
  className,
  data: { templateData, name, address },
}) => {
  const { state } = useClient()
  const [isCc, setIsCc] = useState(false)
  const [isBcc, setIsBcc] = useState(false)

  const parsedTextHeader =
    templateData && parseMessage(templateData.Subject, name)
  return (
    <div className={classNames(s.container, className)}>
      <div className={s.item}>
        <div className={s.subtitle}>To:</div>
        <TextareaAutosize
          className={classNames(s.to, s.textarea)}
          defaultValue={address}
          name="to"
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
          />
        </div>
      )}
      {isBcc && (
        <div className={s.item}>
          <div className={s.subtitle}>Bcc:</div>
          <TextareaAutosize
            className={classNames(s.textarea, s.cc)}
            name="cc"
          />
        </div>
      )}
      <div className={s.item}>
        <div className={s.subtitle}>Subject:</div>
        <TextareaAutosize
          className={classNames(s.subject, s.textarea)}
          defaultValue={parsedTextHeader}
          name="subject"
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
