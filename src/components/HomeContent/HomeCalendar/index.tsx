import React, { useCallback, useEffect, useState } from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classNames from 'classnames'
import { css } from 'astroturf'

import { usePopup } from 'src/components/context/PopupContext'
import Button from 'src/components/shared-ui/Button'
import { get } from 'src/api'
import LoaderStatic from 'src/components/shared-ui/Loader/LoaderStatic'
import millisecondsToSeconds from 'date-fns/millisecondsToSeconds'
import formatContactData from 'src/helpers/utils/format-contact-data'
import Selector from 'src/components/shared-ui/Select'
import UpcomingHeader from './CalendarHeader'
import UpcomingItem from './CalendarItem'

type Props = {
  className?: string
}

const getUserIds = async (duration: string) => {
  const date = new Date()
  const timeAgo =
    duration === 'lastWeek'
      ? millisecondsToSeconds(date.setDate(date.getDate() - 7)).toString()
      : millisecondsToSeconds(date.setDate(date.getDate() - 30)).toString()
  const nowDateSeconds = millisecondsToSeconds(Date.now()).toString()
  return get.getEventContacts(timeAgo, nowDateSeconds)
}

const HomeUpcoming: React.FC<Props> = ({ className }) => {
  const { dispatch: popupDispatch } = usePopup()
  const [contacts, setContacts] = useState<FormattedContact[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [selector, setSelector] = useState('lastWeek')

  const followUpWithAllHandler = () => {
    if (contacts) {
      popupDispatch({ type: 'UPDATE_POPUP_DATA', payload: null })
      popupDispatch({ type: 'UPDATE_COMPOSE_MULTI_DATA', payload: contacts })
      popupDispatch({ type: 'TOGGLE_COMPOSE_MULTI_POPUP' })
    }
  }

  const filterContactsHidden = (formattedContacts: FormattedContact[]) => {
    const storageKey = 'hidden_contacts_calendar'
    const localHidden = JSON.parse(localStorage.getItem(storageKey) || '[]')

    const hiddenContactsIds = localHidden.map(
      (contact: { contact_id: string }) => contact.contact_id
    )

    return formattedContacts.filter(
      (contact) => !hiddenContactsIds.includes(contact.contact_id)
    )
  }

  const fetchData = useCallback(async () => {
    try {
      const ids = await getUserIds(selector)
      let usersData: React.SetStateAction<FormattedContact[] | undefined> = []
      if (ids && ids.length > 0) {
        const mutableData = await get.getContactsMutable(ids)
        usersData = Object.entries(mutableData).map(([id, contact]) =>
          formatContactData(contact, id)
        )
      }

      usersData = filterContactsHidden(usersData)

      setContacts(usersData)
    } catch (error) {
      console.log('getUsersData ==>', error)
    }
  }, [selector])

  useEffect(() => {
    setIsLoading(true)
    fetchData().finally(() => setIsLoading(false))
  }, [fetchData])

  const hideItemCallback = () => {
    let contactsFiltered = [...(contacts as FormattedContact[])]
    contactsFiltered = filterContactsHidden(contactsFiltered)

    setContacts(contactsFiltered)
  }

  const renderContacts = () => {
    const isContactsEmpty = contacts ? contacts.length === 0 : true

    return (
      <>
        <div className={s.cards}>
          {isContactsEmpty ? (
            <div className={s.noContacts}>No events</div>
          ) : (
            contacts?.map((item) => (
              <UpcomingItem
                data={item}
                key={item.contact_id}
                hideItemCallback={hideItemCallback}
                updateDataCallback={fetchData}
              />
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
      <UpcomingHeader
        className={s.header}
        text={
          <div className={s.selectorWrapper}>
            <div className={s.bigText}>Follow up with people you met with</div>
            <Selector
              className={s.selector}
              styles={{
                valueContainer: {
                  padding: '0 0 0 15px',
                },
                singleValue: {
                  fontSize: '17px',
                  fontWeight: 'bold',
                },
              }}
              handler={(option) => setSelector(option.value)}
              options={[
                { value: 'lastWeek', label: 'Last Week' },
                { value: 'lastMonth', label: 'Last Month' },
              ]}
            />
          </div>
        }
      />
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

  .bigText {
    margin-right: 10px;
    flex: 1 0 auto;
    margin-bottom: 3px;
    font-size: 22px;
    line-height: 22px;
    font-weight: var(--bold);

    @include mobile {
      flex: auto;
      margin-bottom: 10px;
    }
  }

  .selectorWrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    @include mobile {
      justify-content: center;
    }
  }

  .selector {
    width: 150px;
  }
`

export default HomeUpcoming
