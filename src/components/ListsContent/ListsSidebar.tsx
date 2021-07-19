import React from 'react'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classNames from 'classnames'

type Props = {
  className?: string
}

const ListsSidebar: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(s.container, className)}>
    <div className={s.header}>
      Important <span>Lists</span>
    </div>
  </CardContainer>
)

const s = css`
  .container {
    width: 30%;
    padding: 24px 14px 19px;
    align-self: flex-start;
    border-radius: 10px;
  }

  .header {
    font-size: 24px;
    line-height: 31px;
    font-weight: var(--bold);

    span {
      color: var(--ginger);
    }
  }

  .createList {
    margin-top: 15px;
  }
`

export default ListsSidebar
