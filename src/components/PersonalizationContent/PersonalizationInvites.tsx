import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Bar from '../shared-ui/Bar'
import CardShare from '../shared-ui/cards/CardShare'
import Period from '../shared-ui/Period'

type Props = {
  className?: string
}

const PersonalizationInvites: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <div className={s.subtitle}>
      Invite 10 friends and get 1 month of premium free! 👍
    </div>
    <div className={s.count}>
      <Bar bar={90} barColor="green" className={s.bar} />
      <Period className={s.period} from={9} to={10} />
    </div>
    <CardShare
      variant="dark"
      image="banner-email@2x.png"
      event="Share Strata"
      title="Sharing is Caring"
      link="bit.ly/share-strata/hailey"
    />
  </div>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    max-width: 773px;
  }

  .subtitle {
    margin-bottom: 8px;

    font-size: 16px;
  }

  .count {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;

    margin-bottom: 28px;

    @include mobile {
      flex-flow: column-reverse nowrap;
      align-items: flex-start;
    }
  }

  .bar {
    max-width: 525px;
    width: 100%;
    min-height: 8px;
  }

  .period {
    margin-left: 30px;
    @include mobile {
      flex-flow: column nowrap;
      margin-left: 0;
      margin-bottom: 6px;
    }
  }
`

export default PersonalizationInvites
