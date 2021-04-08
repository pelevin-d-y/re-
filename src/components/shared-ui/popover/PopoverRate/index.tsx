import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Stars from 'src/components/shared-ui/Starts'
import Button from 'src/components/shared-ui/Button'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import PopoverContent from 'src/components/shared-ui/popover/PopoverBase/PopoverContent'

interface Props {
  className?: string
  buttonClickHandler: () => void
  variant: 'outlined' | 'contained'
}

const PopoverRate: React.FC<Props> = ({
  className,
  buttonClickHandler,
  variant,
  children,
}) => (
  <Popover
    triggerElement={
      <Button
        className={classNames(className, s.button)}
        variant={variant}
        isArrow
        handler={() => buttonClickHandler()}
      >
        {children}
      </Button>
    }
    popupContent={
      <PopoverContent
        items={[
          {
            name: 'Schedule Send',
            handler: () => null,
          },
          {
            name: 'Ignore',
            handler: () => null,
          },
        ]}
      >
        <div className={s.rate}>
          Rate Recommendation
          <Stars className={s.stars} />
        </div>
      </PopoverContent>
    }
  />
)

const s = css`
  .stars {
    margin-top: 6px;
  }

  .rate {
    padding: 9px 15px;
    font-weight: var(--bold);
  }
`

export default PopoverRate
