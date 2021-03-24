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

const SidebarList: React.FC<Props> = ({ className }) => (
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
  className: undefined,
}

const styles = css`
  .list {
    padding: 0;
    list-style: none;
  }

  .title {
    padding-left: 34px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .item {
    position: relative;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 12px 5px 12px 73px;

    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background: var(--lightBlue);
      color: var(--blue);
      border-right: 1px solid var(--blue);
    }
  }

  .icon {
    position: absolute;
    left: 34px;
    top: 12px;
  }
`

export default SidebarList
