import React from 'react'
import { css } from 'astroturf'
import SmallCard from 'src/components/shared-ui/cards/CardSmall'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'

import { useTemplates } from 'src/components/context/TemplatesContext'
import findTemplate from 'src/helpers/utils/find-template'
import testUsers from 'src/testUsersWithPlaceholderFields'

const HomeRecommendations: React.FC = () => {
  const { state: templatesState } = useTemplates()

  const contacts = testUsers.slice(0, 3)

  return (
    <CardContainer className={s.container}>
      <div className={s.title}>Your Weekly Recommendations</div>
      <div className={s.cards}>
        {contacts.slice(0, 3).map((contactItem) => (
          <div className={s.column} key={contactItem.first_message_id}>
            <SmallCard
              data={contactItem}
              template={findTemplate(templatesState.data, contactItem.template)}
            />
          </div>
        ))}
      </div>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 22px 35px 44px 35px;
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
