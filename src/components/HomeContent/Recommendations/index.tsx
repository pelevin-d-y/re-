import React from 'react'
import { css } from 'astroturf'
import CardContact from 'src/components/shared-ui/cards/CardContact'
import Link from 'src/components/shared-ui/Link'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import classNames from 'classnames'

type Props = {
  data?: RecommendationUser[]
  className?: string
}

const Recommendations: React.FC<Props> = ({ data, className }) => (
  <div className={classNames(s.container, className)}>
    <div className={s.title}>
      Your Weekly Recommendations <br />
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
        />
      ))}
    </div>
  </div>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 22px 30px 44px 36px;
    background: url('/svg/circles-background.svg') no-repeat center/cover;

    @include mobile {
      padding: 16px;
    }
  }

  .title {
    margin-bottom: 18px;
    font-size: 26px;
    font-weight: var(--bold);

    @include tablet {
      text-align: center;
    }

    br {
      display: none;

      @include mobile {
        display: block;
      }
    }
  }

  .link {
    margin-left: 14px;
    text-decoration: none;
    color: var(--blue);

    font-size: 14px;
    line-height: 16px;
  }

  .linkIcon {
    width: 9px;
    height: 9px;
    margin-left: 6px;

    transform: rotate(180deg);
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
`

export default Recommendations
