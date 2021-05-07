import React from 'react'
import { css } from 'astroturf'
import { useRouter } from 'next/router'
import { useLists } from 'src/components/context/ListsContext'
import Search from 'src/components/shared-ui/Search'
import Button from 'src/components/shared-ui/Button'

const Content: React.FC = () => {
  const router = useRouter()
  const { state: listsState } = useLists()
  const currentList = listsState?.find(
    (list) => Number(list.id) === Number(router.query.id)
  )
  return currentList ? (
    <div className={s.container}>
      <button className={s.back} type="button" onClick={() => router.back()}>
        Back to list
      </button>
      <h2 className={s.title}>{currentList.title}</h2>
      <div className={s.description}>{currentList.description}</div>
      <div className={s.userCount}>{currentList.users.length} Contacts</div>
      <div className={s.content}>
        <div className={s.header}>
          <Search inputPlaceholder="Search contacts…" />
          <Button variant="outlined">...</Button>
          <Button variant="outlined">+ Add contact</Button>
          <Button variant="outlined">Send list</Button>
        </div>
        <table className={s.table}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Company</td>
              <td>Last Outreach</td>
              <td>Tags</td>
              <td>Notes</td>
              <td>Playlists</td>
              <td>Next outreac</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  ) : null
}

const s = css`
  .container {
    display: flex;
    flex-flow: column nowrap;
  }
`

export default Content
