import React from 'react'
import { css } from 'astroturf'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HeaderToDos: React.FC = () => (
  <div className={styles.container}>
    <FontAwesomeIcon icon={faList} className={styles.icon} />
    <div className={styles.text}>TO-DOs</div>
    <div className={styles.number}>
      <div className="numberText">13</div>
    </div>
  </div>
)

const styles = css`
  .container {
    position: relative;

    display: flex;
    flex-flow: row nowrap;
    padding: 12px;

    background: #baf3b9;
    color: #0fb73b;
    border-radius: 18px;

    cursor: pointer;
  }

  .icon {
    margin-right: 6px;
  }

  .number {
    position: absolute;
    right: -6px;
    bottom: -9px;

    display: flex;
    justify-content: center;
    width: 22px;
    height: 22px;

    font-size: 13px;
    background: red;
    color: var(--white);
    border: 2px solid var(--white);
    border-radius: 50%;
  }
`

export default HeaderToDos
