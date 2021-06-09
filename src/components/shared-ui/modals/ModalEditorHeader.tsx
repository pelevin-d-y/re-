import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import parseMessage from 'src/helpers/utils/parse-message'

type Props = {
  className?: string
  data: UserData
}

const ModalEditorHeader: React.FC<Props> = ({
  className,
  data: { templateData, name },
}) => {
  const parsedText = templateData && parseMessage(templateData.Header, name)
  return (
    <div className={classNames(s.container, className)}>
      {parsedText && <span className={s.textTitle}>{parsedText}</span>}
      <SvgIcon
        className={s.icon}
        icon={require('public/svg/templates.svg?include')}
      />
    </div>
  )
}

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
