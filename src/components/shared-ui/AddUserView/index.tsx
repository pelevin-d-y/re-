import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Search from 'src/components/shared-ui/Search'
import { css } from 'astroturf'
import { useDebounce } from 'use-debounce'
import { get, post } from 'src/api'
import formatContactData from 'src/helpers/utils/format-contact-data'
import useOnClickOutside from 'src/helpers/hooks/use-click-outside'
import chunk from 'lodash/chunk'
import { fetchDataQueue } from 'src/helpers/utils/fetchDataQueue'
import UserItem from './UserItem'
import { LoaderAbsolute } from '../Loader'

type Props = {
  className?: string
  handler: (user: FormattedContact) => void
  data: any // (FormattedContact | RecommendationUser)[] | undefined TODO: fix data: any
}

const AddUserView: React.FC<Props> = ({ className, handler, data }) => {
  const [searchState, setSearchState] = useState('')
  const [searchValue] = useDebounce(searchState, 700)
  const [isLoading, setIsLoading] = useState(false)
  const [contacts, setContacts] = useState<FormattedContact[]>([])

  const ref = useRef(null)

  useEffect(() => {
    if (searchValue) {
      const search = async () => {
        setIsLoading(true)
        try {
          const searchResponse = await post.postContactsSearch(searchValue)
          let formattedContacts: FormattedContact[] | [] = []
          const excludedUserIds = searchResponse.filter(
            (item) => !data?.find((contact: any) => contact.contact_id === item)
          )
          // TODO:fix contact: any

          if (excludedUserIds.length > 0) {
            const contactsChunks = chunk(excludedUserIds, 90)
            const requests = contactsChunks.map((contactChunk) => {
              return () => get.getContactsMutable(contactChunk)
            })

            const contactsResp = await fetchDataQueue(requests)
            const convertedContactsRespToObj = contactsResp.reduce(
              (acc, item) => {
                return { ...acc, ...item }
              }
            )
            formattedContacts = Object.entries(convertedContactsRespToObj).map(
              ([id, contact]) => formatContactData(contact, id)
            )
          }

          setIsLoading(false)
          setContacts(formattedContacts)
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log('search err ==>', err)
          setIsLoading(false)
        }
      }
      search()
    } else {
      setContacts([])
    }
  }, [data, searchValue])

  useOnClickOutside(ref, () => {
    setContacts([])
  })

  const searchHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(evt.target.value)
  }

  return (
    <CardContainer
      className={classNames(
        s.container,
        className,
        contacts.length > 0 && s.active
      )}
      ref={ref}
    >
      <Search
        classes={{ input: s.searchInput }}
        inputPlaceholder="Search contacts…"
        onChange={searchHandler}
      />
      <ul className={s.list}>
        {isLoading ? (
          <div className={s.loader}>
            <LoaderAbsolute />
          </div>
        ) : (
          contacts?.map((item) => (
            <UserItem data={item} key={item.contact_id} handler={handler} />
          ))
        )}
      </ul>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    position: relative;
    max-width: 356px;
    z-index: 18;
    box-shadow: none;
    width: 100%;
    @include mobile {
    }
  }

  .search {
    width: 100%;
  }

  .searchInput {
    outline: none;
    width: 100%;
  }

  .list {
    position: absolute;
    top: 100%;
    z-index: 20;
    left: 0;

    max-height: 300px;
    width: 100%;
    padding: 0;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.119865),
      0px 1px 1px rgba(34, 34, 34, 0.0989128);

    overflow: auto;
    background: var(--shades2);
    list-style: none;
  }

  .loader {
    width: 100%;
    height: 70px;
  }

  .active .list {
    padding: 5px;
  }
`

export default AddUserView
