import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Search from 'src/components/shared-ui/Search'
import { css } from 'astroturf'
import { useDebounce } from 'use-debounce'
import { get, post } from 'src/api'
import formatContactData from 'src/helpers/utils/format-contact-data'
import useOnClickOutside from 'src/helpers/hooks/use-click-outside'
import UserItem from './UserItem'
import Loader from '../Loader'

type Props = {
  className?: string
}

const AddUserView: React.FC<Props> = ({ className }) => {
  const [searchState, setSearchState] = useState('')
  const [searchValue] = useDebounce(searchState, 700)
  const [isLoading, setIsLoading] = useState(false)
  const [contacts, setContacts] = useState<FormattedContacts[]>([])

  const ref = useRef(null)

  useEffect(() => {
    if (searchValue) {
      const search = async () => {
        setIsLoading(true)
        try {
          const searchResponse = await post.postContactsSearch(searchValue)
          let formattedContacts: FormattedContacts[] | [] = []

          if (searchResponse.length > 0) {
            const contactsResp = await get.getContactsMutable(
              searchResponse.map((item: any) => item)
            )
            formattedContacts = Object.entries(contactsResp).map(
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
  }, [searchValue])

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
            <Loader />
          </div>
        ) : (
          contacts?.map((item) => <UserItem data={item} key={item.id} />)
        )}
      </ul>
    </CardContainer>
  )
}

const s = css`
  .search {
    width: 100%;
  }

  .searchInput {
    outline: none;
  }

  .list {
    position: relative;
    list-style: none;
    padding: 0;
  }

  .loader {
    width: 100%;
    height: 70px;
  }

  .container.active {
    box-shadow: 0px 4px 8px rgb(0 0 0 / 12%), 0px 1px 1px rgb(34 34 34 / 10%);
  }
`

export default AddUserView
