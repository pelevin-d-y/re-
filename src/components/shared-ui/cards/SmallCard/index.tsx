import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'

import Select from 'src/components/shared-ui/Select'
import Star from 'src/components/shared-ui/Star'
import Avatar from 'src/components/shared-ui/Avatar'
import ColorfulCircle from 'src/components/shared-ui/ColorfulCircle'
import CardContainer from '../CardContainer'

interface Props {
  className?: string
  src: string
}

const selectOptions = [
  { value: 'followUp', label: 'Follow Up' },
  { value: 'congrats', label: 'Congrats' },
  { value: 'planDinner', label: 'Plan Dinner' },
]

const SmallCard: React.FC<Props> = ({ className, src }) => (
  <CardContainer className={classNames(className, s.container)}>
    <Avatar src={src} width={44} height={44} className={s.avatar} />
    <div className={s.name}>Landon Tucker</div>
    <div className={s.actionType}>
      <ColorfulCircle />
      Follow up on Meetings
    </div>
    <Select options={selectOptions} />
    <Star className={s.star} />
  </CardContainer>
)

const s = css`
  .container {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background: var(--white);

    width: 100%;
    padding: 14px 24px 18px 24px;
  }

  .avatar {
    margin-bottom: 15px;
  }

  .actionType {
    margin-bottom: 12px;
  }

  .name {
    margin-bottom: 4px;
    font-weight: var(--bold);
  }

  .star {
    position: absolute;
    top: 13px;
    right: 13px;
  }
`

export default SmallCard
