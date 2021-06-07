import React from 'react'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Button from 'src/components/shared-ui/Button'
import classNames from 'classnames'
import { usePopup } from 'src/components/context/PopupContext'

type Props = {
  className?: string
}

const ListsSidebar: React.FC<Props> = ({ className }) => {
  const { dispatch } = usePopup()

  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_CREATE_LIST_POPUP' })
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      <div className={s.header}>
        Important <span>Lists</span>
      </div>
      <Button
        className={s.createList}
        variant="contained"
        handler={buttonHandler}
      >
        Create New
      </Button>
    </CardContainer>
  )
}

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

  .createList {
    margin-top: 15px;
  }
`

export default ListsSidebar
