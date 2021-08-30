import React from 'react'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classNames from 'classnames'
import Button from '../shared-ui/Button'

type Props = {
  className?: string
}

const ListsSidebar: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(s.container, className)}>
    <div className={s.header}>
      Important <span>Lists</span>
    </div>
    <div className={s.paragraph}>
      Save lists with important task here. You can drag and drop them into this
      module.
    </div>
    <Button className={s.button} variant="outlined">
      Create a new list
    </Button>
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
    margin-bottom: 11px;

    span {
      color: var(--ginger);
    }
  }

  .createList {
    margin-top: 15px;
  }

  .paragraph {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 19px;
  }

  .button {
    width: 100%;
  }
`

export default ListsSidebar
