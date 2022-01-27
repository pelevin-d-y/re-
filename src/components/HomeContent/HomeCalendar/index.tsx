import React, { useEffect, useState } from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classNames from 'classnames'
import { css } from 'astroturf'

import { usePopup } from 'src/components/context/PopupContext'
import Button from 'src/components/shared-ui/Button'
import { get } from 'src/api'
import LoaderStatic from 'src/components/shared-ui/Loader/LoaderStatic'
import millisecondsToSeconds from 'date-fns/millisecondsToSeconds'
import formatContactData from 'src/helpers/utils/format-contact-data'
import UpcomingHeader from './CalendarHeader'
import UpcomingItem from './CalendarItem'

type Props = {
  className?: string
  headerData: {
    month: string
    day: string
    title: string
    description: string
  }
}

const getUserIds = async () => {
  const date = new Date()
  const sevenDaysAgoDateSeconds = millisecondsToSeconds(
    date.setDate(date.getDate() - 7)
  ).toString()
  const nowDateSeconds = millisecondsToSeconds(Date.now()).toString()
  return get.getEventContacts(sevenDaysAgoDateSeconds, nowDateSeconds)
}

const HomeUpcoming: React.FC<Props> = ({ className, headerData }) => {
  const { dispatch: popupDispatch } = usePopup()
  const [contacts, setContacts] = useState<FormattedContact[]>()
  const [isLoading, setIsLoading] = useState(false)

  const followUpWithAllHandler = () => {
    if (contacts) {
      popupDispatch({ type: 'UPDATE_POPUP_DATA', payload: null })
      popupDispatch({ type: 'UPDATE_COMPOSE_MULTI_DATA', payload: contacts })
      popupDispatch({ type: 'TOGGLE_COMPOSE_MULTI_POPUP' })
    }
  }

  useEffect(() => {
    const getUsersData = async () => {
      try {
        setIsLoading(true)
        const ids = await getUserIds()
        let usersData: React.SetStateAction<FormattedContact[] | undefined> = []
        if (ids && ids.length > 0) {
          const mutableData = await get.getContactsMutable(ids)
          usersData = Object.entries(mutableData).map(([id, contact]) =>
            formatContactData(contact, id)
          )
        }
        setContacts(usersData)
        setIsLoading(false)
      } catch (error) {
        console.log('getUsersData ==>', error)
      }
    }
    getUsersData()
  }, [])

  const renderContacts = () => {
    const isContactsEmpty = contacts ? contacts.length === 0 : true

    return (
      <>
        <div className={s.cards}>
          {isContactsEmpty ? (
            <div className={s.noContacts}>No events</div>
          ) : (
            contacts?.map((item) => (
              <UpcomingItem data={item} key={item.contact_id} />
            ))
          )}
        </div>

        <div className={s.actions}>
          <Button
            className={s.button}
            variant="contained"
            disabled={isContactsEmpty}
            handler={followUpWithAllHandler}
          >
            Follow up with all
          </Button>
        </div>
      </>
    )
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <UpcomingHeader className={s.header} data={headerData} />
      {isLoading ? <LoaderStatic /> : renderContacts()}
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    position: relative;
    padding: 16px 16px 32px 16px;
  }

  .cards {
    @include mobile {
      display: flex;
      flex-flow: column nowrap;
    }
  }

  .header {
    margin-bottom: 27px;
  }

  .button {
    min-width: 212px;
  }

  .dots {
    margin-right: 17px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 26px;
  }

  .noContacts {
    font-size: 20px;
    padding-left: 18px;
  }
`

export default HomeUpcoming
