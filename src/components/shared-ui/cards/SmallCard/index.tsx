import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CardContainer from '../CardContainer'

interface Props {
  className?: string | undefined
}

const SmallCard: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(className, styles.card)}>
    <div className={styles.avatar}>
      <FontAwesomeIcon icon={faUserCircle} size="3x" />
    </div>
    <div className={styles.name}>Landon Tucker</div>
    <button type="button" className={styles.button}>
      Follow Up
    </button>
  </CardContainer>
)

const styles = css`
  .card {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    width: 100%;
    padding: 9px;
  }

  .avatar {
    margin-bottom: 15px;
  }

  .name {
    margin-bottom: 10px;
  }
`

export default SmallCard
