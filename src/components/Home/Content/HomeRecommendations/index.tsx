import React from 'react'
import { css } from 'astroturf'
import SmallCard from 'src/components/shared-ui/cards/SmallCard'

const HomeRecommendations = (): JSX.Element => (
  <div className={styles.container}>
    <div className={styles.title}>Your Weekly Recommendations</div>
    <div className={styles.cards}>
      <div className={styles.column}>
        <SmallCard />
      </div>
      <div className={styles.column}>
        <SmallCard />
      </div>
      <div className={styles.column}>
        <SmallCard />
      </div>
    </div>
  </div>
)

const styles = css`
  .container {
    border: 1px solid grey;
    border-radius: 5px;
    margin-right: 20px;
    padding: 10px;
  }

  .title {
    margin-bottom: 18px;
    font-size: 25px;
  }

  .cards {
    display: flex;
    flex-flow: row nowrap;
    margin-left: -10px;
  }

  .column {
    width: 33.3%;
    margin-left: 10px;
  }
`

export default HomeRecommendations
