import React, { useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Column, useFlexLayout, useRowSelect, useTable } from 'react-table'
import Avatar from 'src/components/shared-ui/Avatar'
import Checkbox from 'src/components/shared-ui/Checkbox'

type Props = {
  className?: string
  data: List
}

const Table: React.FC<Props> = ({ className, data }) => {
  const tableData = useMemo(() => data.users, [data.users])
  const [checkedUsers, setCheckedUsers] = useState<UserData[]>([])

  const checkboxHandler = (user: UserData, isChecked: boolean) => {
    if (isChecked) {
      setCheckedUsers([...checkedUsers, user])
    } else {
      setCheckedUsers(
        checkedUsers.filter(
          (item) => item.first_message_id !== user.first_message_id
        )
      )
    }
  }

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
    useTable(
      { columns, data: tableData },
      useFlexLayout,
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((hookColumns) => [
          {
            id: 'selection',
            Header: 'All',
            Cell: ({ row }: any) => (
              <div className={s.cellHeaderAll}>
                <Checkbox
                  handler={(isChecked) =>
                    checkboxHandler(row.original, isChecked)
                  }
                />{' '}
              </div>
            ),
          },
          ...hookColumns,
        ])
      }
    )
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
                      className={classNames(s.columnHeader, s[keyHeader])}
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
        <tbody className={s.tbody} {...getTableBodyProps()}>
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
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 10px;
  }

  .table {
    border-collapse: collapse;
    width: 100%;
  }

  .columnHeader {
    text-align: left;
    padding: 18px 19px;

    &:first-child {
      width: 40px !important;
    }
  }

  .header_All {
    color: var(--blue);
  }

  .cell {
    display: table-cell;
    padding: 28px 19px;

    &:first-child {
      width: 40px !important;
    }
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
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .cellHeaderAll {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .tbody tr {
    margin-bottom: 5px;

    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.119865),
      0px 1px 1px rgba(34, 34, 34, 0.0989128);
    border-radius: 6px;
  }
`

export default Table
