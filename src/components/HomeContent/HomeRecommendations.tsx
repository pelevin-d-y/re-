import React, { useMemo } from 'react'
import { css } from 'astroturf'
import CardContact from 'src/components/shared-ui/cards/CardContact'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Link from 'src/components/shared-ui/Link'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { useClient } from 'src/components/context/ClientContext'
import classNames from 'classnames'
import { sample } from 'lodash'

type Props = {
  className?: string
}

// const getRandomItem = (items: UserData[] | undefined): UserData => {
//   if (items) {
//     return sample(items.slice(1, items.length)) // item 0 is main now
//   }
//   return {}
// }

const HomeRecommendations: React.FC<Props> = ({ className }) => {
  const { state, updateUserData } = useClient()

  const contacts = useMemo(() => state?.recommendations, [state])
  // const changeRecommendationCard = (card: UserData) => {
  //   const recommendations = contacts?.filter(
  //     (item) => item.address !== card.address
  //   )
  //   const randomCard = getRandomItem(state?.contacts)
  //   recommendations?.push(randomCard)

  //   // sample(state?.contacts?.slice(1, state?.contacts.length))

  //   updateUserData({ ...state, recommendations })
  // }
  return (
    <CardContainer className={classNames(className, s.container)}>
      <div className={s.title}>
        Your Weekly Recommendations
        <Link className={s.link} href="#">
          View all
          <SvgIcon className={s.linkIcon} icon="back.svg" />
        </Link>
      </div>
      <div className={s.cards}>
        {contacts?.map((contactItem) => (
          <CardContact
            data={contactItem}
            className={s.column}
            key={contactItem.first_message_id}
            removeCard={() => null}
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
