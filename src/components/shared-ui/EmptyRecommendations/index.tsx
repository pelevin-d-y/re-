import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import SvgIcon from '../SvgIcon'
import Img from '../Img'
import Button from '../Button'
import CardContainer from '../cards/CardContainer'

type Props = {
  className?: string
}

const EmptyRecommendations: React.FC<Props> = ({ className }) => {
  const router = useRouter()

  const openPersonalizationPage = () => {
    router.push(`/personalization`)
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      <div className={s.header}>
        <div className={s.circle}>
          <SvgIcon className={s.iconGoogle} icon="google-mail.svg" />
          <Img className={s.iconStrata} alt="logo" img="logo-user-info.svg" />
        </div>
        <div className={s.title}>Getting your Weekly Recommendations</div>
      </div>
      <div className={s.description}>
        Strata’s engine is analyzing your network for top recommendations to
        reach out to.
      </div>
      <div className={s.buttonBlock}>
        <Button
          className={s.button}
          variant="outlined"
          handler={openPersonalizationPage}
        >
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
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    position: relative;
    padding: 45px 42px 60px 42px;

    background: url('/svg/circles-background.svg') no-repeat center/cover;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;

    max-width: 60%;
    width: 100%;
    margin-bottom: 24px;

    font-size: 24px;
    font-weight: var(--semiBold);

    @include mobile {
      max-width: 100%;
    }
  }

  .description {
    max-width: 60%;
    width: 100%;

    margin-bottom: 31px;
  }

  .buttonBlock {
    @include mobile {
      display: flex;
      justify-content: center;
    }
  }

  .button {
    font-size: 12px;
    line-height: 14px;
    padding: 9px 12px;
  }

  .circle {
    position: relative;

    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 62px;
    width: 100%;
    height: 62px;
    margin-right: 29px;

    border: 1.2px solid #e4e4e4;
    border-radius: 50%;
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

  .iconGoogle {
    width: 30px;
    height: 30px;
  }

  .iconStrata {
    position: absolute;
    bottom: -2px;
    right: -5px;
    width: 22px;
    height: 22px;
  }

  .progressImg {
    width: 108px;
    height: 3px;
    margin-left: 12px;
    margin-right: 12px;
  }
`

export default EmptyRecommendations
