import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import {
  faAws,
  faAccessibleIcon,
  faAirbnb,
  faAmilia,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  className?: string
}

const SidebarList = ({ className }: Props): JSX.Element => (
  <div className={classNames(className)}>
    <div className={styles.title}>Connect</div>
    <ul className={styles.list}>
      <li className={styles.item}>
        <FontAwesomeIcon className={styles.icon} icon={faAws} /> Home
      </li>
      <li className={styles.item}>
        <FontAwesomeIcon className={styles.icon} icon={faAccessibleIcon} /> List
      </li>
      <li className={styles.item}>
        <FontAwesomeIcon className={styles.icon} icon={faAirbnb} />{' '}
        Recommendations
      </li>
      <li className={styles.item}>
        <FontAwesomeIcon className={styles.icon} icon={faAmilia} /> Contacts
      </li>
      <li className={styles.item}>
        <FontAwesomeIcon className={styles.icon} icon={faAws} /> Templates
      </li>
    </ul>
  </div>
)

SidebarList.defaultProps = {
  className: null,
}

const styles = css`
  .list {
    padding: 0;
    list-style: none;
  }

  .title {
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .item {
    position: relative;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 10px 5px 10px 30px;

    cursor: pointer;

    &:hover {
      background: #7ab3e4;
    }
  }

  .icon {
    position: absolute;
    left: 0;
    top: 12px;
  }
`

export default SidebarList
