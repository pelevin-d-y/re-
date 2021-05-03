import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
  inputClassName?: string
  inputPlaceholder: string
}

const Search: React.FC<Props> = ({
  className,
  inputPlaceholder,
  inputClassName,
}) => (
  <div className={classNames(className, s.search)}>
    <SvgIcon
      className={s.icon}
      icon={require('public/svg/search.svg?include')}
    />
    <input
      className={classNames(s.input, inputClassName)}
      type="text"
      placeholder={inputPlaceholder}
    />
  </div>
)

const s = css`
  .search {
    position: relative;
  }

  .icon {
    position: absolute;
    left: 16px;
    top: 11px;
    width: 18px;
    height: 18px;
  }

  .input {
    padding: 11px 22px 12px 49px;
    border: 1px solid #d9d9d9;
    border-radius: 20px;
  }
`

export default Search
