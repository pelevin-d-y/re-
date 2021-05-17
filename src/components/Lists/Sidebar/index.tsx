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
    height: 100vh;
    padding: 24px 14px 19px;

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
`

export default ListsSidebar
