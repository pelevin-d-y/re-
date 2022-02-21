import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePinned } from 'src/components/context/PinnedContext'
import { getName } from 'src/helpers/utils/get-name'
import CardContainer from '../cards/CardContainer'
import Avatar from '../Avatar'
import CloseButton from '../Close'
import PopoverUserInfo from '../popover/PopoverUserInfo'

type Props = {
  className?: string
  data?: FormattedContact | null
  template?: Template
}

const PinnedCard: React.FC<Props> = ({ className, data }) => {
  const { removePinned } = usePinned()

  return data ? (
    <CardContainer className={classNames(className, s.container)}>
      <Avatar
        className={s.avatar}
        name={getName(data)}
        width={38}
        height={38}
        image={data.avatar}
      />
      <div className={s.info}>
        <PopoverUserInfo data={data} position="top left" />
      </div>
      <CloseButton
        className={s.close}
        handler={() => {
          removePinned(data.contact_id)
        }}
      />
    </CardContainer>
  ) : null
}
const s = css`
  .container {
    position: relative;

    box-shadow: 0px 1px 1px 0px #22222219;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 18px 50px 20px 20px;
    &:hover {
      .close {
        opacity: 1;
      }
    }
  }

  .avatar {
    flex: 0 0 auto;
    margin-right: 14px;
  }

  .info {
    width: 100%;

    font-size: 12px;
    line-height: 14px;
  }

  .name {
    margin-bottom: 5px;
    font-weight: var(--bold);
  }

  .pin {
    position: absolute;
    top: 17px;
    right: 9px;

    margin-left: auto;
  }

  .checkbox {
    margin-right: 19px;
  }

  .close {
    position: absolute;
    opacity: 0;
    right: 20px;
    background: transparent;
  }
`

export default PinnedCard
