import React, { useState, useMemo } from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Search from 'src/components/shared-ui/Search'
import Avatar from 'src/components/shared-ui/Avatar'
import { useUsers } from 'src/components/context/UsersContext'
import { useDebounce } from 'use-debounce'
import Popover from '../PopoverBase'

type Props = {
  listUsers?: UserData[]
  className?: string
}

const PopoverAddContact: React.FC<Props> = ({ listUsers, className }) => {
  const {
    state: { data: users },
  } = useUsers()

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (item) =>
          !listUsers?.find((listUser) => listUser.address === item.address)
      ),
    [users, listUsers]
  )

  const [searchState, setSearchState] = useState('')
  const [searchValue] = useDebounce(searchState, 700)
  const searchHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(evt.target.value)
  }

  return (
    <Popover
      triggerElement={
        <Button
          className={classNames(className, s.contacts)}
          variant="outlined"
        >
          + Add contact
        </Button>
      }
      popupContent={
        <CardContainer className={s.popup}>
          <Search
            classes={{ input: s.searchInput }}
            inputPlaceholder="Search contacts…"
            onChange={searchHandler}
          />
          <ul className={s.list}>
            {filteredUsers?.map((item) => (
              <li className={s.item} key={item.first_message_id}>
                <div className={s.profile}>
                  <Avatar
                    className={s.avatar}
                    image={require(`public/images/${item.avatar}`)}
                  />
                  <span className={s.name}>{item.name}</span>
                </div>
                <Button className={s.button} variant="outlined">
                  add
                </Button>
              </li>
            ))}
          </ul>
        </CardContainer>
      }
    />
  )
}

const s = css`
  .popup {
    overflow: auto;
    min-width: 375px;
    padding: 18px 20px;
    padding-bottom: 0;
    max-height: 350px;
    background: var(--white);
  }

  .search {
    width: 100%;
  }

  .searchInput {
    outline: none;
  }

  .list {
    list-style: none;
    padding: 0;
  }

  .item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 22px 0;
    border-bottom: 1px solid #f6f6f6;
  }

  .profile {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .avatar {
    margin-right: 22px;
  }

  .name {
    font-size: 14px;
    line-height: 17px;
    font-weight: var(--bold);
  }
`

export default PopoverAddContact
