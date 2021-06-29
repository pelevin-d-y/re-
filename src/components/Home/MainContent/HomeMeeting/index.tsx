import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Pin from 'src/components/shared-ui/Pin'
import CardHeader from 'src/components/shared-ui/cards/CardHeader'
import CardLikes from 'src/components/shared-ui/cards/CardLikes'
import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import CardActions from 'src/components/shared-ui/cards/CardActions'

type Props = {
  className?: string
  data?: List
}

const HomeMeeting: React.FC<Props> = ({ className, data }) => {
  const { dispatch: popupDispatch } = usePopup()
  const { dispatch: usersDispatch } = useUsers()
  const users = data?.users.slice(0, 6)

  const followUpWithAllHandler = () => {
    usersDispatch({ type: 'UPDATE_USERS_DATA', payload: users || [] })
    popupDispatch({ type: 'TOGGLE_CONTACTS_POPUP' })
  }

  const headerData = {
    month: 'feb',
    day: '18',
    title: data?.title as string,
    description: data?.description as string,
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <Pin className={s.star} />
      {headerData && <CardHeader data={headerData} />}
      <div className={s.cards}>
        {users?.map(
          (item) =>
            item?.templateData && (
              <CardLikes
                key={item.first_message_id}
                data={item}
                template={item.templateData}
              />
            )
        )}
      </div>
      <CardActions
        className={s.actions}
        mainAction={followUpWithAllHandler}
        mainText="Follow up with all"
      />
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    position: relative;
    padding: 16px 16px 32px 18px;
  }

  .star {
    position: absolute;
    top: 19px;
    right: 13px;
    z-index: 10;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-gap: 17px;
    margin-top: 18px;

    @include mobile {
      grid-template-columns: auto;
    }
  }

  .actions {
    margin-top: 26px;
    margin-left: auto;
  }
`

export default HomeMeeting
