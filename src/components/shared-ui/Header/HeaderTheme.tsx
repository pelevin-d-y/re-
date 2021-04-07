import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type TType = 'light' | 'dark' | 'grey'

const HeaderTheme: React.FC = () => {
  const [theme, setTheme] = useState<TType>('light')

  const activeThemeHandler = (type: React.SetStateAction<TType>) => {
    setTheme(type)
  }

  return (
    <div className={s.container}>
      <button
        type="button"
        className={classNames(s.item, theme === 'dark' && s.active)}
        onClick={() => activeThemeHandler('dark')}
      >
        <SvgIcon
          className={s.icon}
          icon={require('public/svg/theme-normal.svg?include')}
        />
      </button>
      <button
        type="button"
        className={classNames(s.item, theme === 'light' && s.active)}
        onClick={() => activeThemeHandler('light')}
      >
        <SvgIcon
          className={s.icon}
          icon={require('public/svg/theme-light.svg?include')}
        />
      </button>
      <button
        type="button"
        className={classNames(s.item, theme === 'grey' && s.active)}
        onClick={() => activeThemeHandler('grey')}
      >
        <SvgIcon
          className={s.icon}
          icon={require('public/svg/theme-dark.svg?include')}
        />
      </button>
    </div>
  )
}

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    min-width: 96px;
    min-height: 32px;

    background: var(--lightGrey);
    border-radius: 16px;
  }

  .item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    width: 28px;
    height: 28px;
    border: none;
    border-radius: 50%;
    background: var(--lightGrey);
    color: var(--grey);

    outline: none;
    cursor: pointer;

    &.active {
      color: var(--white);
      background: var(--blue);
    }
  }

  .icon {
    width: 16px;
    height: 16px;
  }

  .active .icon {
    width: 18px;
    height: 18px;
  }
`

export default HeaderTheme
