import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Image from 'next/image'
import Star from 'public/svg/star.svg'
import CardContainer from '../CardContainer'

interface Props {
  className?: string
  src: string
}

const SmallCard: React.FC<Props> = ({ className, src }) => (
  <CardContainer className={classNames(className)}>
    <div className={s.container}>
      <div className={s.avatar}>
        <Image className={s.avatar} src={src} width={44} height={44} />
      </div>
      <div className={s.name}>Landon Tucker</div>
      <div className={s.actionType}>
        <span className={s.circle} />
        Follow up on Meetings
      </div>
      <button type="button" className={s.button}>
        Follow Up
      </button>
      <Star className={s.star} />
    </div>
  </CardContainer>
)

const s = css`
  .container {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    width: 100%;
    padding: 14px 24px 18px 24px;
  }

  .avatar {
    overflow: hidden;
    margin-bottom: 15px;
    border-radius: 50%;
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
    width: 16px;
    height: 16px;

    color: var(--grey);
    cursor: pointer;
  }
`

export default SmallCard
