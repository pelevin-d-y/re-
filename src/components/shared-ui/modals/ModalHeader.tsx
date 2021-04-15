import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

interface Props {
  className?: string
  name: string
  title: string
  date?: string
  image: string
}

const ModalHeader: React.FC<Props> = ({
  className,
  name,
  title,
  date,
  image,
}) => (
  <div className={classNames(className, s.container)}>
    <div className={s.name}>{name}</div>
    <div className={s.title}>{title}</div>
    {date && <div className={s.date}>{date}</div>}
    <SvgIcon className={s.icon} icon={image} />
  </div>
)

const s = css`
  .container {
    position: relative;
    padding: 7px 0 40px 0;
  }

  .name {
    margin-bottom: 10px;

    font-weight: var(--bold);
    font-size: 24px;
    line-height: 42px;
    color: #c7c7c7;
  }

  .title {
    margin-bottom: 11px;

    color: var(--black);
    font-weight: var(--bold);
    font-size: 38px;
    line-height: 42px;
  }

  .date {
    font-weight: var(--bold);
    font-size: 16px;
    line-height: 12px;
  }

  .icon {
    position: absolute;
    top: 36px;
    right: 77px;
    width: 109px;
    height: 109px;
  }
`

export default ModalHeader
