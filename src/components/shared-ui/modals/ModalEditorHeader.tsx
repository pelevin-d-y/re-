import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  name?: string
  className?: string
}

const ModalEditorHeader: React.FC<Props> = ({ name, className }) => (
  <div className={classNames(s.container, className)}>
    <span className={s.textTitle}>
      Follow up with {name || '<unknown>'} for meeting
    </span>
    <SvgIcon
      className={s.icon}
      icon={require('public/svg/templates.svg?include')}
    />
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 9px 15px 9px 23px;

    border-bottom: 1px solid #e0e0e0;
    border-top: 6px solid var(--red);
  }

  .icon {
    width: 26px;
    height: 26px;
  }

  .textTitle {
    font-weight: var(--bold);
  }
`

export default ModalEditorHeader
