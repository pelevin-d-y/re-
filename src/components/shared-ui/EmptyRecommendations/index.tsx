import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import SvgIcon from '../SvgIcon'
import Img from '../Img'
import Button from '../Button'
import CardContainer from '../cards/CardContainer'

type Props = {
  className?: string
}

const EmptyRecommendations: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(s.container, className)}>
    <div className={s.titles}>
      <div className={s.title}>Weekly Recommendations</div>
      <div className={s.subtitle}>
        Strata’s engine is analyzing your network for top recommendations to
        reach out to.
      </div>
    </div>
    <div className={s.progress}>
      <div className={s.circle}>
        <SvgIcon className={s.icon} icon="google-mail.svg" />
      </div>
      <Img className={s.progressImg} alt="" img="progress-bar.png" />
      <div className={s.circle}>
        <SvgIcon className={s.icon} icon="geometry.svg" />
      </div>
    </div>
    <div className={s.buttonBlock}>
      <Button className={s.button} variant="outlined">
        + Add another account
      </Button>
    </div>
    <Img
      className={s.image}
      alt="recommendations cards"
      img="recommendationsCard.png"
    />
  </CardContainer>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    position: relative;
    padding: 20px;

    background: url('/svg/circles-background.svg') no-repeat center/cover;
  }

  .title {
    font-size: 26px;
    font-weight: 800;
    line-height: 32px;
    margin-bottom: 11px;
  }

  .subtitle {
    font-size: 20px;
    font-weight: 500;
    line-height: 26px;
    margin-bottom: 18px;
  }

  .progress {
    margin-bottom: 25px;
    display: flex;
    align-items: center;

    @include mobile {
      justify-content: center;
    }
  }
  .buttonBlock {
    @include mobile {
      display: flex;
      justify-content: center;
    }
  }

  .button {
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    padding: 9px 11px;
  }

  .image {
    position: absolute;
    transform: translateY(-50%);
    width: 40%;
    height: 90%;
    top: 50%;
    right: 0%;
    object-fit: contain;

    @include mobile {
      display: none;
    }
  }

  .titles {
    max-width: 60%;

    @include mobile {
      max-width: 100%;
    }
  }

  .circle {
    width: 51px;
    height: 51px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1.2px solid #e4e4e4;
  }

  .icon {
    width: 24px;
    height: 24px;
  }

  .progressImg {
    width: 108px;
    height: 3px;
    margin-left: 12px;
    margin-right: 12px;
  }
`

export default EmptyRecommendations
