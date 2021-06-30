import React from 'react'
import { css } from 'astroturf'
import SmallCard from 'src/components/shared-ui/cards/CardSmall'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Link from 'src/components/shared-ui/Link'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { useClient } from 'src/components/context/ClientContext'

const HomeRecommendations: React.FC = () => {
  const { state } = useClient()

  const contacts = state?.contacts?.slice(0, 3)

  return (
    <CardContainer className={s.container}>
      <div className={s.title}>
        Your Weekly Recommendations
        <Link className={s.link} href="#">
          View all
          <SvgIcon
            className={s.linkIcon}
            icon={require(`public/svg/back.svg?include`)}
          />
        </Link>
      </div>
      <div className={s.cards}>
        {contacts?.slice(0, 3).map((contactItem) => (
          <SmallCard
            data={contactItem}
            className={s.column}
            key={contactItem.first_message_id}
            template={contactItem.templateData}
          />
        ))}
      </div>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 22px 28px 44px;
    background: url('/svg/circles-background.svg') no-repeat center/cover;

    @include mobile {
      padding: 22px;
    }
  }

  .title {
    margin-bottom: 18px;
    font-size: 26px;
    font-weight: var(--bold);

    @include tablet {
      text-align: center;
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
    display: flex;
    flex-flow: row nowrap;
    margin-left: -17px;

    @include mobile {
      flex-flow: column nowrap;
      margin-left: 0;
    }
  }

  .column {
    width: 33.3%;
    margin-left: 17px;

    @include mobile {
      max-width: 300px;
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      margin-bottom: 13px;
    }
  }
`

export default HomeRecommendations
