import React from 'react'
import classNames from 'classnames'
import NextLink from 'next/link'
import { css } from 'astroturf'

const Header = (): JSX.Element => (
  <header className={classNames(styles.header)}>
    <div className={classNames('container', styles.container)}>
      <div className={styles.menu}>Menu</div>
      <div className={styles.logo}>
        <NextLink href="/">
          <a className={styles.logoLink}>
            Logo
          </a>
        </NextLink>
      </div>
      <div className={styles.profile}>
        <div className={styles.link}>
          <NextLink href="/sign-up">
            <a className={styles.profileLink}>Sign up</a>
          </NextLink>
        </div>
      </div>
    </div>
  </header>
)

const styles = css`
  .header {
    width: 100%;
    padding-top: 35px;
  }

  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }

  .menu {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    line-height: 14px;
    color: inherit;
    cursor: pointer;
  }


  .logoLink {
    font-size: 50px;
    text-decoration: none;
    color: black;
  }

  .profile {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .profileLink {
    padding: 10px 22px;
    border: 1px solid var(--black);
    color: inherit;
    text-decoration: none;
  }
`

export default Header
