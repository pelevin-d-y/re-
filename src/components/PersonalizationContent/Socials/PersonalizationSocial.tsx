import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
  data: {
    background: string
    text: string
    icon: string
  }
}

const PersonalizationSocial: React.FC<Props> = ({ className, data }) => (
  <div
    className={classNames(className, s.container)}
    style={{ background: data.background }}
  >
    <SvgIcon icon={data.icon} className={s.icon} />
    <span>{data.text}</span>
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 5px 23px;

    font-weight: var(--semibold);
    color: var(--white);
    border-radius: 16px;
  }

  .icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`

export default PersonalizationSocial
