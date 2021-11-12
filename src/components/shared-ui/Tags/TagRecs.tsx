import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
  text: string
}

const TagRecs: React.FC<Props> = ({ className, text }) => (
  <button className={classNames(className, s.container)} type="button">
    {text}
  </button>
)

const s = css`
  .container {
    display: inline-block;
    padding: 8px 7px;
    background: none;

    border: 1px solid #efefef;
    border-radius: 100px;

    font-size: 14px;
    line-height: 16px;
    color: #949494;
    cursor: pointer;
  }
`

export default TagRecs
