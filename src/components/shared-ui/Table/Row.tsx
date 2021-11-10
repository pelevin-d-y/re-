import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import { LoaderItem } from '../Loader'

type Props = {
  className?: string
  row: any // didn't find how to type it
}

const Row: React.FC<Props> = ({ className, row, children, ...restProps }) => {
  const { dispatch } = usePopup()
  const contactHandler = (contactData: UserData) => {
    if (!row?.state?.isLoading) {
      dispatch({ type: 'TOGGLE_CONTACT_POPUP', payload: contactData })
    }
  }

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
      {children}
      {row?.state?.isLoading && (
        <td>
          <LoaderItem />
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
