import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import SvgIcon from '../SvgIcon'
import Img from '../Img'
import Button from '../Button'
import CardContainer from '../cards/CardContainer'
import Typography from '../Typography'

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
        <Typography tagVariant="div" styleVariant="h3">
          Getting your Weekly{' '}
          <Typography
            tagVariant="span"
            styleVariant="h1"
            fontVariant="damion"
            fontWeight="regular"
          >
            Recommendations
          </Typography>
        </Typography>
      </div>
      <Typography
        className={s.description}
        tagVariant="div"
        styleVariant="body1"
      >
        Strata’s engine is analyzing your network for top recommendations to
        reach out to.
      </Typography>
      <div className={s.buttonBlock}>
        <Button
          className={s.button}
          variant="contained"
          handler={openPersonalizationPage}
        >
          + Add another account
        </Button>
      </div>
      <Img className={s.image} alt="logo" img="google-strata-logo.png" />
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    position: relative;
    padding: 45px 42px 60px 42px;
    color: var(--neutral5);

    background: var(--gradientDark);
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
    max-width: 60%;
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
      background: var(--neutral1);
      color: var(--shades2);
    }
  }

  .image {
    position: absolute;
    width: 22%;
    max-height: 170px;

    right: 2%;
    bottom: 30px;
    object-fit: contain;

    @include tablet {
      width: 139px;
      max-height: 131px;
    }

    @include mobile {
      display: none;
    }
  }
`

export default EmptyRecommendations
