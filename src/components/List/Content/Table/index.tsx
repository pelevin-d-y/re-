import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Column, useFlexLayout, useTable } from 'react-table'
import Avatar from 'src/components/shared-ui/Avatar'

type Props = {
  className?: string
  data: List
}

const Table: React.FC<Props> = ({ className, data }) => {
  const tableData = useMemo(() => data.users, [data.users])

  const columns: Column<UserData>[] = useMemo(
    () => [
      {
        Header: 'Contact',
        accessor: 'name',
        minWidth: 180,
        Cell: ({ value, row }) => (
          <div className={s.cellName}>
            <Avatar
              className={s.avatar}
              image={require(`public/images/${row.original.avatar}`)}
            />{' '}
            <span>{value}</span>
          </div>
        ),
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({ value }) => <span className={s.cellContent}>{value}</span>,
      },
      {
        Header: 'Last outreach',
        accessor: 'last_client_text',
        Cell: ({ value }) => <span className={s.cellContent}>{value}</span>,
      },
      {
        Header: 'Notes',
        accessor: 'notes',
        Cell: ({ value }) => <span className={s.cellContent}>{value}</span>,
      },
      {
        Header: 'Playlists',
        accessor: 'template',
        Cell: ({ value }) => <span className={s.cellContent}>{value}</span>,
      },
      {
        Header: 'Next outreach',
        accessor: 'next_outreach',
        Cell: ({ value }) => <span className={s.cellContent}>{value}</span>,
      },
    ],
    []
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData }, useFlexLayout)

  return (
    <div className={s.container}>
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
    </div>
  )
}

const s = css`
  .container {
    width: 100%;
    overflow: auto;
  }

  .table {
    border-collapse: collapse;
    width: 100%;
  }

  .thead {
    border-bottom: 2px solid #dbe7ff;
  }

  .columnHeader {
    text-align: left;
    padding: 18px 19px;
  }

  .cell {
    display: table-cell;
    padding: 28px 19px;
    border: 1px solid #efefef;
  }

  .cellName {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-weight: var(--bold);
  }

  .avatar {
    flex: 0 0 auto;
    margin-right: 20px;
  }

  .cellContent {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

export default Table
