import React from 'react'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classnames from 'classnames'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Img from 'src/components/shared-ui/Img'
import SpotlightLongCard from './SpotlightLongCard'

type Props = {
  className?: string
}

const Spotlight: React.FC<Props> = ({ className }) => (
  <CardContainer className={classnames(className, s.container)}>
    <div className={s.header}>
      <div className={s.title}>Spotlight</div>
      <div className={s.imageWrapper}>
        <Img className={s.image} alt="avatar" img="spotlight.png" />
      </div>
    </div>
    <div className={s.score}>
      <div className={s.left}>
        <div className={s.scoreTitle}>Network Score</div>
        <span className={s.rating}>Good</span>
      </div>
      <div className={s.right}>
        <div className={s.radar}>
          <SvgIcon icon="radar.svg" />
        </div>
      </div>
    </div>
    <div className={s.longCards}>
      <SpotlightLongCard
        className={s.longCard}
        from={12}
        to={50}
        bar={44}
        period="within 30 Days"
        text="Reconnects made"
        barColor="blue"
      />
      <SpotlightLongCard
        className={s.longCard}
        from={19}
        to={20}
        period="within 30 Days"
        text="Intros made"
        bar={86}
        barColor="green"
      />
      <SpotlightLongCard
        className={s.longCard}
        from={9}
        to={12}
        period="made within 30 Days"
        text="Urgent followup"
        bar={21}
        barColor="red"
      />
    </div>
  </CardContainer>
)

const s = css`
  .container {
    padding: 12px 21px 28px 12px;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 27px;

    line-height: 31px;
  }

  .title {
    font-size: 24px;
    line-height: 31px;
    font-weight: var(--bold);
  }

  .score {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  .scoreTitle {
    margin-bottom: 12px;

    font-size: 18px;
    font-weight: var(--bold);
  }

  .right {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
  }

  .rating {
    font-size: 38px;
    font-weight: var(--bold);
    color: var(--blue);
  }

  .longCard {
    margin-bottom: 8px;
  }

  .imageWrapper {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    width: 50px;
    height: 50px;

    border: 1px solid #e4e4e4;
    border-radius: 50%;
  }

  .image {
    width: 40px;
    height: 34px;
    object-fit: contain;
  }
`

export default Spotlight
