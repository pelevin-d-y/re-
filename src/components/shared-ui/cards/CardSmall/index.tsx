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
  template: any
}

const SmallCard: React.FC<Props> = ({ className, data, template }) => {
  const { dispatch } = usePopup()
  const { name, avatar } = data
  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_CONTACT_POPUP', payload: data })
  }
  return (
    <CardContainer className={classNames(className, s.container)}>
      <Close className={s.remove} handler={() => null} />
      <Avatar
        image={require(`public/images/${avatar}`)}
        width={54}
        height={54}
        className={s.avatar}
        straight={data.connection_E}
      />
      <PopoverUserInfo className={s.name} data={data} template={template} />
      <div className={s.description}>
        {parseEmailMessage(template.Header, name)}
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
    max-width: 140px;
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
`

export default SmallCard
