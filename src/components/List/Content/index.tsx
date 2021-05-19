import React from 'react'
import { css } from 'astroturf'
import { useRouter } from 'next/router'
import { useLists } from 'src/components/context/ListsContext'
import PreviousPage from 'src/components/shared-ui/PreviousPage'
import TableHeader from './TableHeader'
import Table from './Table'

const Content: React.FC = () => {
  const router = useRouter()
  const { state: listsState } = useLists()
  const currentList = listsState?.find(
    (list) => Number(list.id) === Number(router.query.id)
  )
  return currentList ? (
    <div className={s.container}>
      <div className={s.header}>
        <PreviousPage text="Back to list" />
        <h2 className={s.title}>{currentList.title}</h2>
        <div className={s.description}>{currentList.description}</div>
        <div className={s.userCount}>{currentList.users.length} Contacts</div>
      </div>
      <div className={s.content}>
        <TableHeader list={currentList} />
        <Table data={currentList} />
      </div>
    </div>
  ) : null
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: column nowrap;
    background: var(--white);
  }

  .header {
    padding-top: 12px;
    padding-left: 30px;
    padding-bottom: 23px;

    @include mobile {
      padding-left: 16px;
    }
  }

  .title {
    margin-top: 13px;
    margin-bottom: 0;
    font-size: 26px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .description {
    font-weight: var(--bold);
    font-size: 16px;
  }

  .userCount {
    margin-top: 8px;
    font-size: 14px;
    font-weight: var(--bold);
    color: var(--blue);
  }
`

export default Content
