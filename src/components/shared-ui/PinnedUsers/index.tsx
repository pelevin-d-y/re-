import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import { usePinned } from 'src/components/context/PinnedContext'
import { chunk } from 'lodash'
import { fetchDataQueue } from 'src/helpers/utils/fetchDataQueue'
import formatContactData from 'src/helpers/utils/format-contact-data'
import { get } from 'src/api/requests'
import PinnedCard from './PinnedCard'
import Typography from '../Typography'
import Img from '../Img'
import { LoaderStatic } from '../Loader'

type Props = {
  className?: string
}

const PinnedUsers: React.FC<Props> = ({ className }) => {
  const [pinned, setPinned] = React.useState<FormattedContact[]>()
  const [isLoading, setIsLoading] = React.useState(false)

  const { dispatch: popupDispatch } = usePopup()
  const { state } = usePinned()

  const fetchData = React.useCallback(async () => {
    try {
      const ids = state.data
      let usersData: React.SetStateAction<FormattedContact[] | undefined> = []
      if (ids && ids.length > 0) {
        const contactsChunks = chunk(ids, 90)
        const requests = contactsChunks.map((contactChunk) => {
          return () => get.getContactsMutable(contactChunk)
        })

        const responses = await fetchDataQueue(requests)
        const convertedContactsRespToObj = responses.reduce((acc, item) => {
          return { ...acc, ...item }
        })
        usersData = Object.entries(convertedContactsRespToObj).map(
          ([id, contact]) => formatContactData(contact, id)
        )
      }

      setPinned(usersData)
    } catch (error) {
      console.log('getUsersData ==>', error)
    }
  }, [state.data])

  React.useEffect(() => {
    setIsLoading(true)
    fetchData().finally(() => setIsLoading(false))
  }, [fetchData])

  const openModal = () => {
    if (pinned) {
      popupDispatch({
        type: 'UPDATE_COMPOSE_MULTI_DATA',
        payload: pinned,
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
      {!pinned?.length && (
        <div className={s.paragraph}>
          Pin people to remember to followup up later.
        </div>
      )}
      {isLoading ? (
        <LoaderStatic />
      ) : (
        <div className={s.cards}>
          {pinned?.map((item) => (
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
