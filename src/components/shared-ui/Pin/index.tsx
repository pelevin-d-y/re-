import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { usePinned } from 'src/components/context/PinnedContext'

type Props = {
  className?: string
  data?: UserData
}

const Pin: React.FC<Props> = ({ className, data }) => {
  const { state, addPinned, removePinned } = usePinned()

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (state.data.find((item) => item.key === data?.key)) {
      return setIsActive(true)
    }
    return setIsActive(false)
  }, [data?.key, state.data])

  const pinAction = () => {
    if (isActive) {
      removePinned(data)
    }
    if (!isActive) {
      addPinned(data)
    }
  }

  return (
    <button
      type="button"
      onClick={pinAction}
      className={classNames(className, s.button)}
    >
      <SvgIcon
        icon="pin.svg"
        className={classNames(s.icon, isActive && s.active)}
      />
    </button>
  )
}

const s = css`
  .icon {
    width: 17px;
    height: 17px;

    color: #bfbfbf;
  }

  .icon.active {
    color: var(--blue);
  }

  .button {
    padding: 7px;

    line-height: 0;
    background: var(--white);
    border: none;
    border-radius: 50%;
    background: none;
    outline: none;
    cursor: pointer;
    background: var(--white);

    &:hover {
      .icon {
        color: var(--blue);
      }
    }
  }
`

export default Pin
