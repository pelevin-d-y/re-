import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { usePinned } from 'src/components/context/PinnedContext'

type Props = {
  className?: string
  data: string
}

const Pin: React.FC<Props> = ({ className, data }) => {
  const { state, addPinned, removePinned } = usePinned()
  const [loading, setLoading] = useState(false)

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (state.ids.find((item) => item === data)) {
      return setIsActive(true)
    }
    return setIsActive(false)
  }, [data, state.ids])

  const pinAction = () => {
    setLoading(true)
    if (isActive) {
      removePinned(data).finally(() => setLoading(false))
    }
    if (!isActive) {
      addPinned(data).finally(() => setLoading(false))
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
        className={classNames(
          s.icon,
          isActive && s.active,
          loading && s.loadingPin
        )}
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
    color: var(--neutral1);
  }

  .loadingPin path {
    fill: var(--neutral1);
    animation-name: glow-blue;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
  }

  @-webkit-keyframes glow-blue {
    100% {
      fill: #bfbfbf;
    }
  }

  .button {
    padding: 7px;

    line-height: 0;
    background: var(--shades2);
    border: none;
    border-radius: 50%;
    background: none;
    outline: none;
    cursor: pointer;

    &:hover {
      .icon {
        color: var(--neutral1);
      }
    }
  }
`

export default Pin
