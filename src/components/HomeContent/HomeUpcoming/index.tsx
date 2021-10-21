import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classNames from 'classnames'
import { css } from 'astroturf'

import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import Button from 'src/components/shared-ui/Button'
import { useLists } from 'src/components/context/ListsContext'
import PopoverDots from 'src/components/shared-ui/popover/PopoverDots'
import UpcomingHeader from './UpcomingHeader'
import UpcomingItem from './UpcomingItem'

type Props = {
  className?: string
  headerData: {
    month: string
    day: string
    title: string
    description: string
  }
}

const HomeUpcoming: React.FC<Props> = ({ className, headerData }) => {
  const { state: stateLists } = useLists()
  const { dispatch: usersDispatch } = useUsers()
  const list = stateLists?.find((item) => item.title === headerData.title)

  const { dispatch: popupDispatch } = usePopup()

  const followUpWithAllHandler = () => {
    popupDispatch({ type: 'UPDATE_POPUP_DATA', payload: null })
    usersDispatch({ type: 'UPDATE_USERS_DATA', payload: list?.users || [] })
    popupDispatch({ type: 'TOGGLE_CONTACTS_POPUP' })
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <UpcomingHeader className={s.header} data={headerData} />
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
      <div className={s.actions}>
        <PopoverDots className={s.dots} variant="outlined" />
        <Button
          className={s.button}
          variant="contained"
          handler={followUpWithAllHandler}
        >
          Follow up with all
        </Button>
      </div>
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
`

export default HomeUpcoming
