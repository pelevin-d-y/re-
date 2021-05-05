import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import CardList from 'src/components/shared-ui/cards/CardList'
import { useUsers } from 'src/components/context/UsersContext'
import SectionsHeader from '../SectionsHeader'

type Props = {
  className?: string
}

const ListsCatalog: React.FC<Props> = ({ className }) => {
  const { state: usersState } = useUsers()
  const users = usersState.data.slice(0, 6)
  return (
    <CardContainer className={classNames(s.container, className)}>
      <SectionsHeader
        title="Your lists"
        description="List of people with a common themes"
        icon="lists"
        iconBackground="#ECFFFD"
        iconColor="#0DB09D"
      />
      <div className={s.list}>
        <CardList
          title="Investors"
          description="Contacts in the network of investing"
          image={require('public/images/pens.png')}
          users={users}
        />
        <CardList
          title="Investors"
          description="Contacts in the network of investing"
          image={require('public/images/pens.png')}
          users={users}
        />
        <CardList
          title="Investors"
          description="Contacts in the network of investing"
          image={require('public/images/pens.png')}
          users={users}
        />
        <CardList
          title="Investors"
          description="Contacts in the network of investing"
          image={require('public/images/pens.png')}
          users={users}
        />
        <CardList
          title="Investors"
          description="Contacts in the network of investing"
          image={require('public/images/pens.png')}
          users={users}
        />
      </div>
    </CardContainer>
  )
}

const s = css`
  .list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    padding: 37px 21px 31px 21px;
  }
`

export default ListsCatalog
