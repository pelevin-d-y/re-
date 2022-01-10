import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import { LoaderComponent } from '../Loader'

type Props = {
  row: any // didn't find how to type it
  classes?: {
    container?: string
    cell?: string
  }
}

const Row: React.FC<Props> = ({ row, children, classes, ...restProps }) => {
  const { dispatch } = usePopup()
  const contactHandler = (contactData: UserData) => {
    if (!row?.state?.isLoading) {
      dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: contactData })
    }
  }

  return (
    <tr
      onClick={() => contactHandler(row.original)}
      className={classNames(s.container, classes?.container)}
      {...restProps}
    >
      {row.cells.map((cell: any) => {
        const { key: cellKey, ...restCellProps } = cell.getCellProps([
          {
            style: {
              paddingTop: 15,
              paddingBottom: 15,
            },
          },
        ])
        return (
          <td
            className={classNames(s.cell, classes?.cell)}
            {...restCellProps}
            key={cellKey}
          >
            {cell.render('Cell')}
          </td>
        )
      })}
      {children}
      {row?.state?.isLoading && (
        <td>
          <LoaderComponent />
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
