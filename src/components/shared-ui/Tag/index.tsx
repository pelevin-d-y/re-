import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
  text: string
}

const Tag: React.FC<Props> = ({ className, text }) => (
  <div className={classNames(className, s.container)}>{text}</div>
)

const s = css`
  .container {
    display: inline-block;
    padding: 5px 8px;

    border: 1px solid #efefef;
    border-radius: 100px;

    font-size: 11px;
    line-height: 13px;
  }
`

export default Tag
