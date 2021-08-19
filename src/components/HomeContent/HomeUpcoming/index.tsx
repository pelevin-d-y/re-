import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classNames from 'classnames'
import { css } from 'astroturf'

import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import Button from 'src/components/shared-ui/Button'
import { useLists } from 'src/components/context/ListsContext'
import UpcomingHeader from './UpcomingHeader'
import UpcomingItem from './UpcomingItem'

type Props = {
  className?: string
}

const HomeUpcoming: React.FC<Props> = ({ className }) => {
  const { state: stateLists } = useLists()
  const { dispatch: usersDispatch } = useUsers()

  const list = stateLists?.find(
    (item) => item.title === 'Your Upcoming Trip to Los Angeles'
  )
  const { dispatch: popupDispatch } = usePopup()

  const followUpWithAllHandler = () => {
    popupDispatch({ type: 'UPDATE_POPUP_DATA', payload: null })
    usersDispatch({ type: 'UPDATE_USERS_DATA', payload: list?.users || [] })
    popupDispatch({ type: 'TOGGLE_CONTACTS_POPUP' })
  }

  const headerData = {
    month: 'feb',
    day: '20',
    title: list?.title as string,
    description: list?.description as string,
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <UpcomingHeader data={headerData} />
      <div className={s.cards}>
        {list?.users &&
          list.users.map((item) => (
            <UpcomingItem
              data={item}
              key={item.first_message_id}
              template={item.templateData}
            />
          ))}
      </div>
      <Button
        className={s.button}
        variant="contained"
        handler={followUpWithAllHandler}
      >
        Follow up with all
      </Button>
    </CardContainer>
  )
}

const s = css`
  .container {
    position: relative;
    padding: 16px 16px 32px 16px;
  }
  .star {
    position: absolute;
    top: 19px;
    right: 13px;
    z-index: 10;
  }

  .button {
    min-width: 212px;
    display: block;
    margin-top: 26px;
    margin-left: auto;
  }
`

export default HomeUpcoming
