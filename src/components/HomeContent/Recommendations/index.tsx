import React from 'react'
import { css } from 'astroturf'
import CardContact from 'src/components/shared-ui/cards/CardContact'
import Link from 'src/components/shared-ui/Link'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import classNames from 'classnames'
import Typography from 'src/components/shared-ui/Typography'

type Props = {
  data?: RecommendationUser[]
  className?: string
}

const Recommendations: React.FC<Props> = ({ data, className }) => (
  <div
    className={classNames(s.container, className, 'recommendations-welcome')}
  >
    <div className={s.title}>
      <Typography
        className={s.weekly}
        tagVariant="h2"
        styleVariant="h3"
        fontWeight="bold"
      >
        Weekly{' '}
        <Typography
          className={s.damion}
          styleVariant="h1"
          tagVariant="span"
          fontWeight="regular"
        >
          Recommendations
        </Typography>
      </Typography>
      <Link className={s.link} href="/recommendations">
        View all
        <SvgIcon className={s.linkIcon} icon="arrow-left.svg" />
      </Link>
    </div>
    <div className={s.cards}>
      {data?.map((contactItem) => (
        <CardContact
          data={contactItem}
          className={s.column}
          key={contactItem.first_message_id}
          pin
        />
      ))}
    </div>
  </div>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 24px 32px 32px 32px;
    background: var(--gradientDark);
    border-radius: 6px;

    @include mobile {
      padding: 16px;
    }
  }

  .title {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 37px;
    font-size: 24px;
    line-height: 29px;
    font-weight: var(--bold);
    color: var(--neutral5);

    @include tablet {
      text-align: center;
      justify-content: center;
    }
  }

  .link {
    margin-left: 14px;
    text-decoration: none;
    font-weight: var(--regular);
    color: var(--neutral5);

    font-size: 14px;
    line-height: 16px;
  }

  .linkIcon {
    width: 9px;
    height: 9px;
    margin-left: 6px;

    transform: rotate(180deg);
  }

  .damion {
    position: relative;

    font-size: 42px;
    line-height: 57px;
    font-family: Damion;
    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 0;
      display: block;
      background: url('/images/decorate-line-1.png') no-repeat center/contain;
      width: 100%;
      height: 11px;
    }
  }

  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 17px;

    @include mobile {
      grid-template-columns: 1fr;
      margin-left: 0;
    }
  }

  .column {
    width: 100%;

    @include mobile {
      max-width: 300px;
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      margin-bottom: 13px;
    }
  }

  .weekly {
    @include mobile {
      margin-bottom: 15px;
    }
  }
`

export default Recommendations
