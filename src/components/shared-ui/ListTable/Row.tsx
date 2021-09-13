import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePlaylist } from 'src/components/context/PlaylistContext'
import { usePopup } from 'src/components/context/PopupContext'
import Close from '../Close'
import Loader from '../Loader'

type Props = {
  className?: string
  row: any // didn't find how to type it
}

const Row: React.FC<Props> = ({ className, row, ...restProps }) => {
  const { dispatch } = usePopup()
  const [isLoading, setIsLoading] = useState(false)

  const contactHandler = (contactData: any) => {
    if (!isLoading) {
      dispatch({ type: 'TOGGLE_CONTACT_POPUP', payload: contactData })
    }
  }

  const { removeUsers } = usePlaylist()

  const removeUser = useCallback(
    (e: React.MouseEvent, userData: any[]) => {
      e.stopPropagation()
      setIsLoading(true)
      removeUsers([userData])
        .then(() => setIsLoading(false))
        .catch((err) => {
          console.log('removeUser err ==>', err)
          setIsLoading(false)
        })
    },
    [removeUsers]
  )

  return (
    <tr
      onClick={() => contactHandler(row.original)}
      className={classNames(s.container, className)}
      {...restProps}
    >
      {row.cells.map((cell: any) => {
        const { key: cellKey, ...restCellProps } = cell.getCellProps()
        return (
          <td className={s.cell} {...restCellProps} key={cellKey}>
            {cell.render('Cell')}
          </td>
        )
      })}
      <td>
        <Close
          className={s.removeButton}
          handler={(e: React.MouseEvent) => removeUser(e, row.original)}
        />
      </td>
      {isLoading && (
        <td>
          <Loader />
        </td>
      )}
    </tr>
  )
}

const s = css`
  .container {
    position: relative;
    cursor: pointer;
    align-items: center;

    border-left: 4px;

    &:hover {
      background: var(--lightBlue);
    }

    &:hover .removeButton {
      opacity: 1;
    }
  }

  .cell {
    display: table-cell;
    padding: 28px 19px;

    &:first-child {
      max-width: 55px !important;
    }
  }

  .removeButton {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);

    opacity: 0;
  }
`

export default Row
