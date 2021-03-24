import React from 'react'
import { css } from 'astroturf'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const name: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.date}>
      <div className={styles.month}>feb</div>
      <div className={styles.number}>18</div>
    </div>
    <div className={styles.text}>
      <div className={styles.bigText}>Your Upcoming Trip to Los Angeles</div>
      <div className={styles.smallText}>
        Plan your trip ahead but scheduling meeting with contacts in LA
      </div>
    </div>
    <div className={styles.star}>
      <FontAwesomeIcon icon={faStar} />
    </div>
  </div>
)

const styles = css`
  .container {
    position: relative;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    color: var(--white);

    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(9, 9, 121, 1) 35%,
      rgba(0, 116, 139, 1) 100%
    );
  }
`

export default name
