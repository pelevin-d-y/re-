import React from 'react'
import classNames from 'classnames'
import PreviousPage from 'src/components/shared-ui/PreviousPage'
import { css } from 'astroturf'

type Props = {
  className?: string
  data: List
}

const ListHeader: React.FC<Props> = ({ className, data }) => (
  <div className={classNames(s.container, className)}>
    <PreviousPage text="Back to list" />
    <h2 className={s.title}>{data.title}</h2>
    <div className={s.description}>{data.description}</div>
    <div className={s.userCount}>{data.users.length} Contacts</div>
  </div>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding-top: 12px;
    padding-left: 30px;
    padding-bottom: 23px;

    @include mobile {
      padding-left: 16px;
    }
  }

  .title {
    margin-top: 13px;
    margin-bottom: 0;
    font-size: 26px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .description {
    font-weight: var(--bold);
    font-size: 16px;
  }

  .userCount {
    margin-top: 8px;
    font-size: 14px;
    font-weight: var(--bold);
    color: var(--blue);
  }
`

export default ListHeader
