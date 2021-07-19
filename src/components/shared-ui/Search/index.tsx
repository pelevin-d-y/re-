import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  classes?: {
    container?: string
    input?: string
  }
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputPlaceholder: string
}

const Search: React.FC<Props> = ({ inputPlaceholder, classes, onChange }) => (
  <div className={classNames(classes?.container, s.search)}>
    <SvgIcon className={s.icon} icon="search.svg" />
    <input
      className={classNames(s.input, classes?.input)}
      type="text"
      placeholder={inputPlaceholder}
      onChange={onChange}
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
    width: 100%;
  }
`

export default Search
