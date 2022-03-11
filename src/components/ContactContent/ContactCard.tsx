import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import parseMessage from 'src/helpers/utils/parse-message'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import formatContactData from 'src/helpers/utils/format-contact-data'
import { getName } from 'src/helpers/utils/get-name'
import { getNextStep } from 'src/helpers/utils/get-next-step'
import Avatar from '../shared-ui/Avatar'
import PopoverDots from '../shared-ui/popover/PopoverDots'
import PopoverActions from '../shared-ui/popover/PopoverActions'
import { usePopup } from '../context/PopupContext'
import { UserInfo } from '../shared-ui/UserInfo'
import NextStep from '../shared-ui/NextStep'

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
        <div className={s.headerTop}>
          {formattedData && (
            <Avatar
              name={getName(formattedData)}
              className={s.avatar}
              image={formattedData.avatar}
            />
          )}
          <div className={s.name}>
            {formattedData && getName(formattedData)}
          </div>
        </div>
        <div className={s.actions}>
          {formattedData && (
            <NextStep
              className={s.nextStep}
              text={getNextStep(formattedData)}
            />
          )}
          <div className={s.buttons}>
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
  }

  .header {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
  }

  .headerTop {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    @include mobile {
      flex-direction: column;
    }
  }

  .headerInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .avatar {
    font-size: 38px !important;
    width: 119px !important;
    height: 119px !important;
    margin-right: 39px;
    @include mobile {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }

  .actions {
    display: flex;
    margin-bottom: 47px;
    justify-content: space-between;

    @include mobile {
      align-items: center;
      flex-direction: column;
    }
  }

  .buttons {
    display: flex;
  }

  .nextStep {
    max-width: 350px;
    width: 100%;
    margin-right: 38px;
    @include mobile {
      margin-right: 0;
      margin-bottom: 20px;
    }
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
