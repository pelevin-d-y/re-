import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Typography from 'src/components/shared-ui/Typography'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Button from 'src/components/shared-ui/Button'
import Img from 'src/components/shared-ui/Img'
import { useFreeStorage } from 'src/components/context/FreeStorageContext'
import { useRouter } from 'next/router'
import { LoaderAbsolute } from 'src/components/shared-ui/Loader'
import { type } from 'os'

type Props = {
  className?: string
}

const PersonalizationProductTour: React.FC<Props> = ({ className }) => {
  const router = useRouter()

  const { dispatch, state } = useFreeStorage()

  const tourLaunched = () => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: { ...state, product_tour_shown: false },
    })
    router.push('/')
  }

  return (
    <CardContainer
      className={classNames(s.container, className, 'recommendations-welcome')}
    >
      <div className={s.header}>
        <Typography tagVariant="div" styleVariant="h3">
          Product Tour
        </Typography>
      </div>
      <Typography
        className={s.description}
        tagVariant="div"
        styleVariant="body1"
      >
        Learn how to maximize Strata to see full potential of your network
      </Typography>
      <div className={s.buttonBlock}>
        <Button className={s.button} variant="contained" handler={tourLaunched}>
          Take Tour
        </Button>
      </div>
      <div className={s.imageContainer}>
        <Img className={s.image} alt="logo" img="pers-product-tour1.png" />
        <Img className={s.image2} alt="logo" img="pers-product-tour2.png" />
      </div>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    position: relative;
    padding: 45px 42px 60px 42px;
    color: var(--white);

    background: var(--gradientLight);
  }

  .header {
    display: flex;
    flex-flow: row nowrap;

    width: 100%;
    margin-bottom: 24px;

    font-size: 24px;
    font-weight: var(--semiBold);
  }

  .description {
    max-width: 30%;
    width: 100%;

    margin-bottom: 31px;

    @include mobile {
      max-width: 100%;
    }
  }

  .buttonBlock {
    @include mobile {
      display: flex;
      justify-content: center;
    }
  }

  .button {
    padding: 9px 12px;
    max-width: 212px;
    width: 100%;

    font-size: 12px;
    line-height: 14px;

    &:hover {
      background: var(--shades2);
      color: var(--neutral1);
    }
  }

  .imageContainer {
    position: absolute;
    display: flex;
    top: 10%;
    right: -8px;

    @include tablet {
      right: -6px;
      top: 18%;
    }

    @include mobile {
      display: none;
    }
  }

  .image {
    width: 359px;

    @include tablet {
      width: 294px;
    }

    @include mobile {
      display: none;
    }
  }

  .image2 {
    width: 220px;

    @include tablet {
      width: 180px;
    }

    @include mobile {
      display: none;
    }
  }
`

export default PersonalizationProductTour
