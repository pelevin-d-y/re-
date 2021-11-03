import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { useClient } from 'src/components/context/ClientContext'

type Props = {
  className?: string
  data?: UserData
}

const Pin: React.FC<Props> = ({ className, data }) => {
  const { state, updateUserData } = useClient()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(!!data?.pinned)
  }, [data?.pinned])

  const pinAction = () => {
    setIsActive(!isActive)
    const contacts = state?.contacts?.map((item) => {
      if (item.address === data?.address) {
        return {
          ...item,
          pinned: !item.pinned,
        }
      }
      return item
    })
    // updateUserData({ ...state, contacts })
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
