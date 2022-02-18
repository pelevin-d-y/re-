import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Link from 'src/components/shared-ui/Link'

type Props = {
  className?: string
  icon: string
}

const Social: React.FC<Props> = ({ className, icon }) => (
  <Link className={classNames(className, s.container)} href="#">
    <SvgIcon className={s.icon} icon={icon} />
  </Link>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;

    background: var(--shades2);
    border-radius: 50%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.116013);
  }

  .icon {
    width: 18px;
    height: 18px;
  }
`

export default Social
