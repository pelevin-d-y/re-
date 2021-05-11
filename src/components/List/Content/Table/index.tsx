import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useTable } from 'react-table'

type Props = {
  className?: string
  data: List
}

const Table: React.FC<Props> = ({ className, data }) => {
  const tableData = useMemo(() => data.users, [data.users])

  const columns: any = useMemo(
    () => [
      {
        Header: 'Contact',
        accessor: 'name',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Last outreach',
        accessor: 'last_client_text',
      },
      {
        Header: 'Notes',
        accessor: 'notes',
      },
      {
        Header: 'Playlists',
        accessor: 'template',
      },
      {
        Header: 'Next outreach',
        accessor: 'next_outreach',
      },
    ],
    []
  )

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({ columns, data: tableData })

  return (
    <table className={classNames(className, s.table)} {...getTableProps()}>
      <thead className={s.thead}>
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } =
            headerGroup.getHeaderGroupProps()
          return (
            <tr {...restHeaderGroupProps} key={key}>
              {headerGroup.headers.map((column) => {
                const { key: keyHeader, ...restHeaderProps } =
                  column.getHeaderProps()
                return (
                  <th
                    className={s.columnHeader}
                    {...restHeaderProps}
                    key={keyHeader}
                  >
                    {column.render('Header')}
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          const { key, ...restProps } = row.getRowProps()
          return (
            <tr {...restProps} key={key}>
              {row.cells.map((cell) => {
                const { key: cellKey, ...restCellProps } = cell.getCellProps()
                return (
                  <td className={s.cell} {...restCellProps} key={cellKey}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const s = css`
  .table {
    border-collapse: collapse;
  }

  .thead {
    border-bottom: 2px solid #dbe7ff;
  }

  .columnHeader {
    text-align: left;
    padding: 18px 19px;
  }

  .cell {
    width: 200px;
    padding: 28px 19px;
    border: 1px solid #efefef;
  }
`

export default Table
