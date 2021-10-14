import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import ShareLink from 'src/components/shared-ui/ShareLink'
import Img from 'src/components/shared-ui/Img'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
  variant: 'dark' | 'light'
  image: string
  title: string
  event: string
  link?: string
}

const CardShare: React.FC<Props> = ({
  className,
  variant,
  image,
  title,
  event,
  link,
}) => (
  <CardContainer
    className={classNames(
      s.container,
      variant === 'dark' ? s.dark : s.light,
      className
    )}
  >
    <div className={s.info}>
      <div className={s.cardEvent}>
        <SvgIcon className={s.logo} icon="logo-mini.svg" /> {event}
      </div>
      <div className={s.title}>{title}</div>
      <Img alt="fintech" className={s.cardImage} img={image} />
    </div>
    {link && <ShareLink link={link} className={s.shareLink} />}
  </CardContainer>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    overflow: hidden;
    position: relative;
    padding: 25px 24px 33px 29px;
  }

  .info {
    margin-bottom: 32px;
  }

  .cardImage {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 24px;

    width: 262px;
    height: 196px;
    object-fit: contain;

    @include mobile {
      display: none;
    }
  }

  .cardEvent {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    margin-bottom: 10px;

    font-size: 22px;
    line-height: 42px;
    font-weight: var(--semibold);
  }

  .logo {
    width: 25px;
    height: 25px;
    margin-right: 16px;
  }

  .title {
    font-size: 38px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .shareLink {
    z-index: 10;
  }

  .dark {
    background: linear-gradient(90deg, #000000 0%, #383838 100%);
    .info {
      color: var(--white);
    }
  }

  .light {
    .info {
      color: var(--black);
      background: var(--white);
    }
  }
`

export default CardShare
