import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { getName } from 'src/helpers/utils/get-name'
import { usePinned } from 'src/components/context/PinnedContext'
import CardContainer from '../cards/CardContainer'
import Avatar from '../Avatar'
import CloseButton from '../Close'

type Props = {
  className?: string
  data?: RecommendationUser | null
  template?: Template
}

const PinnedCard: React.FC<Props> = ({ className, data }) => {
  const { removePinned } = usePinned()
  return data ? (
    <CardContainer className={classNames(className, s.container)}>
      <Avatar
        className={s.avatar}
        width={38}
        height={38}
        image={data.image_url}
      />
      <div className={s.info}>
        <div className={s.name}>{getName(data)}</div>
      </div>
      <CloseButton
        className={s.close}
        handler={() => {
          removePinned(data)
        }}
      />
    </CardContainer>
  ) : null
}
const s = css`
  .container {
    position: relative;

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
