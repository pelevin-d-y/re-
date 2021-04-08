import React from 'react'
import Button from 'src/components/shared-ui/Button'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import PopoverContent from 'src/components/shared-ui/popover/PopoverBase/PopoverContent'

interface Props {
  className?: string
  variant: 'outlined' | 'contained'
}

const PopoverDots: React.FC<Props> = ({ className, variant }) => (
  <Popover
    triggerElement={
      <Button className={className} variant={variant}>
        •••
      </Button>
    }
    popupContent={
      <PopoverContent
        items={[
          {
            name: 'Manage',
            handler: () => null,
          },
          {
            name: 'Unsubscribe',
            handler: () => null,
          },
        ]}
      />
    }
  />
)

export default PopoverDots
