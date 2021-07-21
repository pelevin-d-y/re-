import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { useClient } from 'src/components/context/ClientContext'
import { isEmpty } from 'lodash'
import PinnedCard from './PinnedCard'

type Props = {
  className?: string
}

const PinnedCards: React.FC<Props> = ({ className }) => {
  const { state } = useClient()
  const contacts = state?.contacts?.filter((item) => item.pinned)

  return (
    <CardContainer className={classNames(className, s.container)}>
      <div className={s.header}>
        <div className={s.headerText}>
          <div className={s.headerImportant}>Pinned</div>
        </div>
        <div className={s.headerStar}>
          <SvgIcon className={s.headerStarIcon} icon="pin.svg" />
        </div>
      </div>
      <div className={s.paragraph}>
        Pin actions, playlist and people to remember to followup up later.
      </div>
      <div className={s.cards}>
        {contacts?.map((item) => (
          <PinnedCard
            className={s.card}
            key={item.first_message_id}
            data={item}
            template={item.templateData}
          />
        ))}
      </div>
    </CardContainer>
  )
}

const s = css`
  .container {
    padding: 24px 13px 22px 16px;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    align-items: center;
  }

  .headerText {
    font-weight: var(--bold);
    font-size: 24px;
    line-height: 31px;
  }

  .headerNext {
    color: var(--ginger);
  }

  .headerStar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    padding: 13px;

    border-radius: 50%;
    border: 1px solid #e4e4e4;
  }

  .headerStarIcon {
    width: 23px;
    height: 23px;
    color: var(--blue);
  }

  .cards {
    margin-top: 19px;
  }

  .card {
    margin-bottom: 5px;
  }
  
  .paragraph {
    max-width: 80%;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
`

export default PinnedCards
