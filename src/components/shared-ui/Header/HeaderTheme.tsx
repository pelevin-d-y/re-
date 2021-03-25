import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Night from 'public/svg/night.svg'
import Light from 'public/svg/sun.svg'
import Thunder from 'public/svg/thunder.svg'

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
        <Night className={s.icon} />
      </button>
      <button
        type="button"
        className={classNames(s.item, theme === 'light' && s.active)}
        onClick={() => activeThemeHandler('light')}
      >
        <Light className={s.icon} />
      </button>
      <button
        type="button"
        className={classNames(s.item, theme === 'grey' && s.active)}
        onClick={() => activeThemeHandler('grey')}
      >
        <Thunder className={s.icon} />
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
