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
import chunk from 'lodash/chunk'
import { fetchDataQueue } from 'src/helpers/utils/fetchDataQueue'
import DropdownIndicator from 'src/components/shared-ui/Select/DropdownIndicator'
import Typography from 'src/components/shared-ui/Typography'
import { isDateBeforeLastMonday } from 'src/helpers/utils/date-tools'
import UpcomingHeader from './CalendarHeader'
import UpcomingItem from './CalendarItem'

type Props = {
  className?: string
}

const getUserIds = async (duration: string) => {
  const date = new Date()
  const nowDateSeconds = millisecondsToSeconds(Date.now()).toString()
  switch (duration) {
    case 'lastWeek': {
      const timeAgo = millisecondsToSeconds(
        date.setDate(date.getDate() - 7)
      ).toString()

      return get.getEventContacts(timeAgo, nowDateSeconds)
    }

    case 'lastMonth': {
      const timeAgo = millisecondsToSeconds(
        date.setDate(date.getDate() - 30)
      ).toString()

      return get.getEventContacts(timeAgo, nowDateSeconds)
    }

    case 'lastQuarter': {
      const timeAgo = millisecondsToSeconds(
        date.setDate(date.getDate() - 90)
      ).toString()

      return get.getEventContacts(timeAgo, nowDateSeconds)
    }

    default:
      return null
  }
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

    const contactsToHide = localHidden.filter((contact: any) =>
      isDateBeforeLastMonday(contact.time_hidden)
    )

    const hiddenContactsIds = contactsToHide.map(
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
          <>
            <div className={s.selectorWrapper}>
              <Typography className={s.bigText} fontVariant="inter">
                People you met with
              </Typography>
              <Selector
                className={s.selector}
                styles={{
                  container: {
                    width: '125px',
                  },
                  indicatorsContainer: {
                    padding: 0,
                  },
                  valueContainer: {
                    padding: 0,
                  },
                  singleValue: {
                    overflow: 'revert',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#5265af',
                    top: '43%',
                  },
                  control: {
                    minHeight: '0 !important',
                    border: 'none',
                    '&:hover': {
                      border: 'none !important',
                    },
                  },
                  menu: {
                    marginTop: '5px !important',
                  },
                }}
                handler={(option) => setSelector(option.value)}
                options={[
                  { value: 'lastWeek', label: 'last week' },
                  { value: 'lastMonth', label: 'last month' },
                  { value: 'lastQuarter', label: 'last quarter' },
                ]}
                dropdownIndicator={<DropdownIndicator icon="triangle.svg" />}
              />
            </div>
            <Typography className={s.smallText} fontVariant="inter">
              Follow up to to stay connected with them
            </Typography>
          </>
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
    margin-bottom: 9px;
    margin-right: 10px;
    flex: 1 0 auto;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;

    @include tablet {
      margin-bottom: 0 !important;
    }

    @include mobile {
      flex: auto;
      margin-bottom: 10px !important;
    }
  }

  .smallText {
    font-size: 12px;
    line-height: 14px;
  }

  .selectorWrapper {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    @include mobile {
      justify-content: center;
      margin-bottom: 10px;
    }
  }

  .selector {
    width: 150px;
  }
`

export default HomeUpcoming
