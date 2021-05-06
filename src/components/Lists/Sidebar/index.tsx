import React from 'react'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'

const ListsSidebar: React.FC = () => (
  <CardContainer className={s.container}>
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
