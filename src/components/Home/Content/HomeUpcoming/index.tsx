import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import CardHeader from 'src/components/shared-ui/cards/CardHeader'
import LongCard from 'src/components/shared-ui/cards/CardLong'
import Star from 'src/components/shared-ui/Star'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardActions from 'src/components/shared-ui/cards/CardActions'
import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import { useTemplates } from 'src/components/context/TemplatesContext'
import findTemplate from 'src/helpers/utils/find-template'

type Props = {
  className?: string
}

const headerData = {
  month: 'feb',
  day: '20',
  title: 'Your Upcoming Trip to Los Angeles',
  description:
    'Plan your trip ahead but scheduling meetings with contacts in LA',
}

const HomeUpcoming: React.FC<Props> = ({ className }) => {
  const { state: usersState, dispatch: usersDispatch } = useUsers()
  const { state: templatesState } = useTemplates()

  const contacts = usersState.data?.slice(0, 6)

  const { dispatch: popupDispatch } = usePopup()
  const followUpWithAllHandler = () => {
    popupDispatch({ type: 'UPDATE_POPUP_DATA', payload: {} })
    usersDispatch({ type: 'UPDATE_USERS_DATA', payload: usersState.data })
    popupDispatch({ type: 'TOGGLE_MULTI_EMAILS_POPUP' })
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <Star className={s.star} />
      <CardHeader data={headerData} />
      <div className={s.cards}>
        {contacts.map((item) => (
          <LongCard
            data={item}
            key={item.first_message_id}
            template={findTemplate(templatesState.data, item.template)}
          />
        ))}
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

  .actions {
    margin-top: 27px;
    margin-left: auto;
  }
`

export default HomeUpcoming
