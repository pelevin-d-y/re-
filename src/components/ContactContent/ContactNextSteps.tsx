import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import data from './dummyData.json'
import CardContainer from '../shared-ui/cards/CardContainer'
import Avatar from '../shared-ui/Avatar'
import UserHeader from '../shared-ui/UserHeader'
import Pin from '../shared-ui/Pin'
import PopoverActions from '../shared-ui/popover/PopoverActions'

type Props = {
  className?: string
}

const ContactNextSteps: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    {data?.nextSteps?.map((step) => (
      <CardContainer className={s.card} key={step.id}>
        <div className={s.topContainer}>
          <div className={s.profileInfo}>
            <Avatar
              className={s.avatar}
              image={step?.avatar}
              height={59}
              width={59}
            />
            <div className={s.info}>
              <div className={s.name}>{step?.name}</div>
            </div>
          </div>
          <UserHeader className={s.message} text={step?.message} />
        </div>
        <div className={s.bottomContainer}>
          <div className={s.nextStep}>{step?.nextStep}</div>
          <div className={s.actions}>
            <Pin className={s.pinButton} />
            <PopoverActions
              className={s.buttonPopup}
              variant="contained"
              buttonClickHandler={() => console.log('')}
              isArrow
            >
              {step?.buttonLabel}
            </PopoverActions>
          </div>
        </div>
      </CardContainer>
    ))}
  </div>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 12px 15px 29px 19px;
  }

  .card {
    padding: 18px 27px 18px 22px;
    box-shadow: 0px 1px 1px 0px #22222219;
    margin-bottom: 7px;
  }

  .topContainer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 31px;
    flex-wrap: wrap;

    @include mobile {
      flex-direction: column;
      align-items: center;
      margin-bottom: 0;
    }
  }

  .profileInfo {
    display: flex;
    margin-bottom: 10px;

    @include mobile {
      flex-direction: column;
    }
  }

  .avatar {
    margin-right: 17px;

    @include mobile {
      align-self: center;
      margin-right: 0;
      margin-bottom: 5px;
    }
  }

  .name {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 9px;
    white-space: nowrap;

    @include mobile {
      text-align: center;
    }
  }

  .message {
    max-width: 314px;

    @include mobile {
      margin-bottom: 10px;
    }
  }

  .bottomContainer {
    display: flex;
    justify-content: space-between;

    @include mobile {
      flex-direction: column;
      align-items: center;
    }
  }

  .nextStep {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    align-self: center;

    @include mobile {
      text-align: center;
      margin-bottom: 10px;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end;

    @include mobile {
      justify-content: center;
    }
  }

  .pinButton {
    margin-right: 9px;
  }

  .buttonPopup {
    max-width: 217px;
    width: 100%;
    height: auto;
  }
`

export default ContactNextSteps
