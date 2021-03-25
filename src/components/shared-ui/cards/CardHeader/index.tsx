import React from 'react'
import { css } from 'astroturf'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const name: React.FC = () => (
  <div className={s.container}>
    <div className={s.date}>
      <div className={s.month}>feb</div>
      <div className={s.number}>18</div>
    </div>
    <div className={s.text}>
      <div className={s.bigText}>Your Upcoming Trip to Los Angeles</div>
      <div className={s.smallText}>
        Plan your trip ahead but scheduling meeting with contacts in LA
      </div>
    </div>
    <div className={s.star}>
      <FontAwesomeIcon icon={faStar} />
    </div>
  </div>
)

const s = css`
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
