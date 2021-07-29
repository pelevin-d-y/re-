import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from '../SvgIcon'
import CardRecs from '../cards/CardRecs'
import { useLists } from 'src/components/context/ListsContext'

type Props = {
  className?: string
  contacts?: UserData[]
  list: List
}

const ListRecs: React.FC<Props> = ({ className, contacts, list }) => {
  const { updateList } = useLists()

  const filtredContacts = useMemo(() => contacts?.filter(
    (item) =>
      !list?.users?.find((listUser) => listUser.address === item.address)
  ),[contacts, list])

  const addUsers = (user: UserData) => {
    const updatedList = { ...list, users: [...list.users, user] }
    updateList(updatedList)
  }
  
  return filtredContacts?.length !== 0 ? (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <SvgIcon className={s.svg} icon='lists.svg' />
        <div className={s.title}>Add these recs to list?</div>
      </div>
      <div className={s.cards}>
        {filtredContacts?.map((user) => (
          <CardRecs addUsers={addUsers} key={user.address} data={user} />
        ))}
      </div>
    </div>
  ) : null
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 12px 16px 23px 30px;

    @include mobile {
      padding-left: 16px;
    }
  }

  .header {
    display: flex;
    align-items: center;
  }

  .svg {
    width: 24px;
    height: 24px;
    color: #1966FF;
    margin-right: 16px;
  }

  .title {
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    color: #1966FF;
  }

  .cards {
    display: flex;
    overflow: scroll;
    min-height: 150px;
    padding: 19px 19px 9px 19px;
  }
`

export default ListRecs
