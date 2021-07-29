import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from '../SvgIcon'
import CardRecs from '../cards/CardRecs'

type Props = {
  className?: string
  data?: UserData[]
}

const ListRecs: React.FC<Props> = ({ className, data }) => {
  return (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <SvgIcon className={s.svg} icon="lists.svg" />
        <div className={s.title}>Add these recs to list?</div>
      </div>
      <div className={s.cards}>
        {data?.map((user) => <CardRecs data={user}/>)}
      </div>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 12px 16px 23px 30px;

    @include mobile {
      padding-left: 16px;
    }
  }

  .header {
    display: flex;
    align-items: center;
  }

  .svg {
    width: 24px;
    height: 24px;
    color: #1966FF;
    margin-right: 16px;
  }

  .title {
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    color: #1966FF;
  }

  .cards {
    display: flex;
    overflow: scroll;
    min-height: 150px;
    padding: 19px 19px 9px 19px;
  }
`

export default ListRecs
