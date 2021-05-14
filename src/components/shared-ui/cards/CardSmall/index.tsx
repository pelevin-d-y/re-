import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Star from 'src/components/shared-ui/Star'
import Avatar from 'src/components/shared-ui/Avatar'
import { usePopup } from 'src/components/context/PopupContext'
import PopoverRate from 'src/components/shared-ui/popover/PopoverRate'
import UserEvent from 'src/components/shared-ui/UserEvent'
import CardContainer from '../CardContainer'

type Props = {
  className?: string
  data: UserData
  template: any
}

const SmallCard: React.FC<Props> = ({ className, data, template }) => {
  const { dispatch } = usePopup()
  const { name, avatar } = data

  const buttonHandler = () => {
    dispatch({
      type: 'UPDATE_POPUP_DATA',
      payload: { name, avatar, templateData: template },
    })
    dispatch({ type: 'TOGGLE_EMAIL_POPUP' })
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <Star className={s.star} />
      <Avatar
        image={require(`public/images/${avatar}`)}
        width={44}
        height={44}
        className={s.avatar}
      />
      <div className={s.name}>{name}</div>
      <UserEvent className={s.actionType} text={template.Subject} />
      <PopoverRate
        buttonClickHandler={buttonHandler}
        className={s.button}
        variant="contained"
      >
        Follow Up
      </PopoverRate>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background: var(--white);

    width: 100%;
    padding: 14px 24px 18px 24px;
  }

  .avatar {
    margin-bottom: 15px;
  }

  .actionType {
    margin-bottom: 12px;
  }

  .button {
    max-width: 140px;
    width: 100%;
  }

  .name {
    margin-bottom: 4px;
    font-weight: var(--bold);
  }

  .star {
    position: absolute;
    top: 6px;
    right: 6px;
  }
`

export default SmallCard
