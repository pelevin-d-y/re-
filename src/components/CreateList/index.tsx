import React, { useEffect, useState } from 'react'
import { css } from 'astroturf'
import { TableProvider } from 'src/components/context/TableContext'
import Table from 'src/components/shared-ui/ListTable'
import TableHeader from 'src/components/shared-ui/ListTableHeader'
import { useLists } from 'src/components/context/ListsContext'
import { useRouter } from 'next/router'
import CreateListHeader from './CreateListHeader'

const Content: React.FC = () => {
  const router = useRouter()
  const { state: listsState, dispatch: listsDispatch } = useLists()
  const [list, setLists] = useState<List>({
    id: (listsState?.length as number) + 1,
    title: '',
    description: '',
    users: [],
    icon: '',
  })

  const updateField = (type: 'title' | 'description', text: string) => {
    const newList = {
      ...list,
      [type]: text,
    }
    setLists(newList)
  }

  const addContact = (users: UserData[]) => {
    setLists({
      ...list,
      users: [...list.users, ...users],
    })
  }

  const removeContacts = (users: UserData[]) => {
    setLists({
      ...list,
      users: list.users.filter(
        (listUser) =>
          !users.find(
            (selectedUser) => selectedUser.address === listUser.address
          )
      ),
    })
  }

  useEffect(() => {
    const handleRouteChange = () => {
      if (list.title) {
        listsDispatch({ type: 'ADD_LIST', payload: { list } })
      }
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  })

  return (
    <div className={s.container}>
      <CreateListHeader updateField={updateField} data={list} />
      <div className={s.content}>
        <TableProvider>
          <TableHeader
            list={list}
            addContact={addContact}
            removeContacts={removeContacts}
          />
          <Table data={list} removeContacts={removeContacts} />
        </TableProvider>
      </div>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: column nowrap;
    background: var(--white);
  }
`

export default Content
