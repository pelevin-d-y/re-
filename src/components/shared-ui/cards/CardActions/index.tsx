import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import PopoverDots from 'src/components/shared-ui/popover/PopoverDots'
import Button from 'src/components/shared-ui/Button'

type Props = {
  className?: string
  mainAction: () => void
  mainText: string
}

const CardActions: React.FC<Props> = ({ className, mainAction, mainText }) => (
  <div className={classNames(s.container, className)}>
    <PopoverDots variant="outlined" />
    <Button variant="contained" handler={mainAction}>
      {mainText}
    </Button>
  </div>
)

const s = css`
  .container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 9px 18px;

    max-width: 300px;
    width: 100%;
  }
`

export default CardActions
