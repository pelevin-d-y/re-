import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import PopoverActions from 'src/components/shared-ui/popover/PopoverActions'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Pin from 'src/components/shared-ui/Pin'
import Avatar from 'src/components/shared-ui/Avatar'
import Likes from 'src/components/shared-ui/Likes'
import PopoverUserInfo from 'src/components/shared-ui/popover/PopoverUserInfo'
import { usePopup } from 'src/components/context/PopupContext'

type Props = {
  className?: string
  data: UserData
  template: Template
}

const CardLikes: React.FC<Props> = ({ className, data, template }) => {
  const { dispatch } = usePopup()

  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_CONTACT_POPUP', payload: data })
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      <Avatar
        className={s.avatar}
        image={require(`public/images/${data.avatar}`)}
        strength={data.relationshipStrength}
      />
      <PopoverUserInfo className={s.name} data={data} template={template} />
      <div>{template.Subject}</div>
      <div className={s.buttons}>
        <Likes />
        <PopoverActions
          className={s.button}
          buttonClickHandler={buttonHandler}
          variant="outlined"
        >
          Followup
        </PopoverActions>
      </div>
    </CardContainer>
  )
}

const s = css`
  .container {
    overflow: hidden;
    position: relative;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding: 14px 10px 17px;
  }

  .star {
    position: absolute;
    right: 6px;
    top: 6px;
  }

  .avatar {
    margin-bottom: 9px;
  }

  .name {
    margin-bottom: 4px;
    font-weight: var(--bold);
  }

  .buttons {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin-top: 13px;
    width: 100%;
  }

  .button {
    max-width: 93px;
    width: 100%;
    margin-left: 5px;

    font-size: 12px;
  }
`

export default CardLikes
