import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import { usePinned } from 'src/components/context/PinnedContext'
import PinnedCard from './PinnedCard'
import Typography from '../Typography'
import Img from '../Img'
import { LoaderStatic } from '../Loader'

type Props = {
  className?: string
}

const PinnedUsers: React.FC<Props> = ({ className }) => {
  const { dispatch: popupDispatch } = usePopup()
  const { state } = usePinned()
  const { data: pinnedData, isLoading } = state

  const openModal = () => {
    if (pinnedData) {
      popupDispatch({
        type: 'UPDATE_COMPOSE_MULTI_DATA',
        payload: pinnedData,
      })
      popupDispatch({ type: 'TOGGLE_PINNED_USERS_POPUP' })
    }
  }

  return (
    <CardContainer
      className={classNames(className, s.container, 'pinned-welcome')}
    >
      <div className={s.header}>
        <div className={s.headerText}>
          <Typography className={s.headerImportant} fontVariant="damion">
            Pinned
          </Typography>
          <Img className={s.underline} alt="" img="decorate-line-2.png" />
        </div>
        <button className={s.headerAction} type="button" onClick={openModal}>
          Add/Create List
        </button>
      </div>
      {!pinnedData?.length && (
        <div className={s.paragraph}>
          Pin people to remember to followup up later.
        </div>
      )}
      {isLoading ? (
        <LoaderStatic />
      ) : (
        <div className={s.cards}>
          {pinnedData?.map((item) => (
            <PinnedCard
              className={s.card}
              key={item.contact_id}
              data={item}
              template={item.templateData}
            />
          ))}
        </div>
      )}
    </CardContainer>
  )
}

const s = css`
  .container {
    padding: 21px 19px 23px;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    align-items: center;

    width: 100%;
  }

  .headerText {
    font-size: 32px;
    line-height: 44px;
  }

  .headerAction {
    margin-left: auto;

    color: var(--primary1);
    border: none;
    background: none;
    cursor: pointer;
    padding-bottom: 40px;
  }

  .cards {
    margin-top: 9px;
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

  .underline {
    max-width: 135px;
  }
`

export default PinnedUsers
