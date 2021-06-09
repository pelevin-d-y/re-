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
  data?: List
}

const HomeUpcoming: React.FC<Props> = ({ className, data }) => {
  const { dispatch: usersDispatch } = useUsers()
  const { state: templatesState } = useTemplates()

  const contacts = data?.users.slice(0, 6)

  const { dispatch: popupDispatch } = usePopup()
  const followUpWithAllHandler = () => {
    popupDispatch({ type: 'UPDATE_POPUP_DATA', payload: {} })
    usersDispatch({ type: 'UPDATE_USERS_DATA', payload: data?.users || [] })
    popupDispatch({ type: 'TOGGLE_CONTACTS_POPUP' })
  }

  const headerData = {
    month: 'feb',
    day: '20',
    title: data?.title as string,
    description: data?.description as string,
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <Star className={s.star} />
      <CardHeader data={headerData} />
      <div className={s.cards}>
        {contacts &&
          contacts.map((item) => (
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
