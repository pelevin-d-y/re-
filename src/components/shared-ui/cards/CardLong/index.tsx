import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Avatar from 'src/components/shared-ui/Avatar'
import PopoverActions from 'src/components/shared-ui/popover/PopoverActions'
import { usePopup } from 'src/components/context/PopupContext'
import UserEvent from 'src/components/shared-ui/UserEvent'
import PopoverUserInfo from 'src/components/shared-ui/popover/PopoverUserInfo'
import CardContainer from '../CardContainer'

type Props = {
  className?: string
  data: UserData
  template: Template
}

const LongCard: React.FC<Props> = ({ data, template, className }) => {
  const { dispatch } = usePopup()
  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_CONTACT_POPUP', payload: data })
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <div className={s.profile}>
        <Avatar
          className={s.avatar}
          image={require(`public/images/${data.avatar}`)}
          strength={data.relationshipStrength}
        />
        <div className={s.text}>
          <PopoverUserInfo className={s.name} data={data} template={template} />
          <div className={s.position}>{template?.Subject}</div>
        </div>
      </div>
      {template?.Subject && (
        <UserEvent
          className={s.event}
          circleColor="black"
          text={template.Subject}
        />
      )}
      <PopoverActions
        className={s.button}
        buttonClickHandler={buttonHandler}
        variant="outlined"
      >
        Reach out
      </PopoverActions>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    padding: 10px 22px 14px 17px;
    margin-bottom: 8px;

    @include mobile {
      flex-flow: column nowrap;
      padding: 14px 24px 18px 24px;
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
    max-width: 119px;
    width: 100%;

    @include mobile {
      margin-top: 12px;
    }
  }
`

export default LongCard
