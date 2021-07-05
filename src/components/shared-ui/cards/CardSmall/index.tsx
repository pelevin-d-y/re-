import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Pin from 'src/components/shared-ui/Pin'
import Avatar from 'src/components/shared-ui/Avatar'
import { usePopup } from 'src/components/context/PopupContext'
import PopoverActions from 'src/components/shared-ui/popover/PopoverActions'
import PopoverUserInfo from 'src/components/shared-ui/popover/PopoverUserInfo'
import Close from 'src/components/shared-ui/Close'
import parseEmailMessage from 'src/helpers/utils/parse-message'
import CardContainer from '../CardContainer'

type Props = {
  className?: string
  data: UserData
  isRow?: boolean
}

const CardSmall: React.FC<Props> = ({ className, data, isRow }) => {
  const { dispatch } = usePopup()
  const { name, avatar, templateData, relationshipStrength } = data

  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_CONTACT_POPUP', payload: data })
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <Close className={s.remove} handler={() => null} />
      <div className={classNames(isRow && s.rowUserInfo)}>
        <Avatar
          image={avatar}
          width={54}
          height={54}
          className={s.avatar}
          strength={relationshipStrength}
        />
        <div className={classNames(isRow && s.userText)}>
          {templateData && (
            <PopoverUserInfo
              className={s.name}
              data={data}
              template={templateData}
            />
          )}
          <div className={s.description}>
            {templateData && parseEmailMessage(templateData.Header, name)}
          </div>
        </div>
      </div>
      <div className={s.actions}>
        <Pin className={s.pin} />
        <PopoverActions
          buttonClickHandler={buttonHandler}
          className={s.button}
          variant="contained"
        >
          Follow Up
        </PopoverActions>
      </div>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    background: var(--white);

    width: 100%;
    padding: 14px 24px 16px 17px;
  }

  .avatar {
    margin-bottom: 7px;
  }

  .description {
    margin-bottom: 14px;
  }

  .actions {
    display: flex;
    flex-flow: row nowrap;
    margin-top: auto;
  }

  .button {
    width: 100%;
  }

  .name {
    margin-bottom: 4px;
    font-weight: var(--bold);
  }

  .pin {
    margin-right: 11px;
  }

  .remove {
    position: absolute;
    top: 5px;
    right: 5px;

    background: var(--white);
    color: #bfbfbf;
  }

  .rowUserInfo {
    display: flex;
    flex-flow: row nowrap;
    padding-top: 6px;
  }

  .userText {
    padding-top: 6px;
    margin-left: 18px;
    padding-right: 20px;
  }
`

export default CardSmall
