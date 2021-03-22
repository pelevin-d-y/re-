import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  className?: string
}

const SmallCard = ({ className }: Props): JSX.Element => (
  <div className={classNames(className, styles.card)}>
    <div className={styles.avatar}>
      <FontAwesomeIcon icon={faUserCircle} size="3x" />
    </div>
    <div className={styles.name}>Landon Tucker</div>
    <button type="button" className={styles.button}>
      Follow Up
    </button>
  </div>
)

const styles = css`
  .card {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    width: 100%;
    padding: 9px;
    border: 1px solid grey;
    border-radius: 5px;
  }

  .avatar {
    margin-bottom: 15px;
  }

  .name {
    margin-bottom: 10px;
  }
`
SmallCard.defaultProps = {
  className: null,
}

export default SmallCard
