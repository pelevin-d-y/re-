import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import parseMessage from 'src/helpers/utils/parse-message'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import formatContactData from 'src/helpers/utils/format-contact-data'
import { getName } from 'src/helpers/utils/get-name'
import Avatar from '../shared-ui/Avatar'
import PopoverDots from '../shared-ui/popover/PopoverDots'
import PopoverActions from '../shared-ui/popover/PopoverActions'
import { usePopup } from '../context/PopupContext'
import { UserInfo } from '../shared-ui/UserInfo'

type Props = {
  className?: string
  updateData: UpdateMutableData
  mutableData?: ContactMutable[]
  id: string
}

const ContactCard: React.FC<Props> = ({
  className,
  updateData,
  mutableData,
  id,
}) => {
  const formattedData = mutableData ? formatContactData(mutableData, id) : null
  const { dispatch } = usePopup()

  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: formattedData })
  }

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <Avatar className={s.avatar} image={formattedData?.avatar} />
        <div className={s.headerInfo}>
          <div className={s.name}>
            {formattedData && getName(formattedData)}
          </div>
          {/* {formattedData?.templateData ? (
            <UserHeader
              className={s.message}
              text={parseMessage(
                formattedData?.templateData?.Subject,
                formattedData.name
              )}
            />
          ) : null} */}
        </div>
        <div className={s.actions}>
          <PopoverDots className={s.dots} variant="outlined" />
          <PopoverActions
            className={s.buttonPopup}
            variant="contained"
            buttonClickHandler={buttonHandler}
            isArrow
          >
            Appreciate you!
          </PopoverActions>
        </div>
      </div>
      <UserInfo mutableData={mutableData} updateData={updateData} />
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    min-width: 350px;
    padding: 37px 24px 47px 18px;
    border-right: 1px solid #dddddd;

    @include mobile {
      min-width: auto;
      max-width: 350px;
      border-right: none;
      align-self: center;
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .headerInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .avatar {
    margin-bottom: 22px;
    width: 119px !important;
    height: 119px !important;
  }

  .actions {
    margin-bottom: 47px;
  }

  .name {
    font-size: 24px;
    text-align: center;
    margin-bottom: 12px;
  }

  .message {
    margin-bottom: 19px;
    max-width: 264px;
  }

  .dots {
    margin-right: 6px;
  }

  .buttonPopup {
    width: 199px;
  }
`

export default ContactCard
