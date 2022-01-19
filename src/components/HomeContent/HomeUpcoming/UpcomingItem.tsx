import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Avatar from 'src/components/shared-ui/Avatar'
import { usePopup } from 'src/components/context/PopupContext'
import UserHeader from 'src/components/shared-ui/UserHeader'
import parseMessage from 'src/helpers/utils/parse-message'
import Button from 'src/components/shared-ui/Button'

type Props = {
  className?: string
  data: RecommendationUser
  template?: Template
}

const UpcomingItem: React.FC<Props> = ({ data, template, className }) => {
  const { avatar, name } = data
  const { dispatch } = usePopup()
  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: data })
  }
  return (
    <CardContainer className={classNames(className, s.container)}>
      <div className={s.profile}>
        <Avatar className={s.avatar} image={avatar} />
        <div className={s.text}>
          <div className={s.name}>{name}</div>
        </div>
      </div>
      <div className={s.message}>
        {template?.Action && (
          <UserHeader text={parseMessage(template.Action, data.name)} />
        )}
      </div>
      <Button className={s.button} variant="outlined" handler={buttonHandler}>
        Follow up
      </Button>
      {/* <PopoverRate
        className={s.button}
        buttonClickHandler={buttonHandler}
        variant="outlined"
      >
        Reach out
      </PopoverRate> */}
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 10px 22px 14px 17px;
    margin-bottom: 8px;
    @include mobile {
      flex-flow: column nowrap;
      padding: 14px 24px 18px 24px;
      max-width: 300px;
      width: 100%;
      margin-right: auto;
      margin-left: auto;
    }
  }
  .profile {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    max-width: 250px;
    width: 100%;
    margin-right: 9%;
    @include mobile {
      flex-flow: column nowrap;
      margin-right: 0;
    }
  }
  .avatar {
    margin-right: 26px;
    @include mobile {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
  .event {
    flex: 1 0 auto;
  }
  .name {
    margin-bottom: 4px;
    font-weight: var(--bold);
    line-height: 16px;
  }
  .position {
    font-size: 12px;
    @include mobile {
      display: none;
    }
  }
  .button {
    margin-left: auto;
    max-width: 119px;
    width: 100%;
    @include mobile {
      margin-top: 12px;
    }
  }

  .message {
    max-width: 40%;
    width: 100%;
    margin-right: 20px;
    @include mobile {
      max-width: 100%;
    }
  }
`

export default UpcomingItem
