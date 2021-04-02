import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

interface Props {
  className?: string
}

const ModalLastMessage: React.FC<Props> = ({ className }) => (
  <div className={classNames(s.container, className)}>
    <div className={s.header}>
      <div className={s.headerText}>Last Message</div>
      <div className={s.date}>2 weeks ago</div>
    </div>
    <div className={s.content}>
      Hi Hailey, <br />

      Hope all is well. <br />
      Below is a link to our presentation: <br />
      https://docsend.com/view/8zryc9243hgeu8eq <br />
      password is speedoftrust
    </div>
  </div>
)

const s = css`
  .container {
    width: 100%;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 9px;
  }

  .headerText {
    font-size: 12px;
    font-weight: var(--bold);
  }

  .date {
    font-size: 11px;
    line-height: 13px;
    color: #979797;
  }

  .content {
    padding: 13px;
    border: 1px solid #dcdcdc;

    font-size: 11px;
    line-height: 18px;
  }
`

export default ModalLastMessage
