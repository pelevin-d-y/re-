import React, { useCallback, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Column, useFlexLayout, useRowSelect, useTable } from 'react-table'

import Avatar from 'src/components/shared-ui/Avatar'
import { useTable as useTableContext } from 'src/components/context/TableContext'
import { useLists } from 'src/components/context/ListsContext'
import { usePopup } from 'src/components/context/PopupContext'
import PopoverUserInfo from 'src/components/shared-ui/popover/PopoverUserInfo'
import Close from 'src/components/shared-ui/Close'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Search from 'src/components/shared-ui/Search'
import EasyEdit from 'react-easy-edit'
import Checkbox from './Checkbox'

type Props = {
  className?: string
  data: List
  removeContacts?: (removeContacts: UserData[]) => void
}

const Table: React.FC<Props> = ({ className, data, removeContacts }) => {
  const { dispatch: dispatchTable } = useTableContext()
  const { dispatch } = usePopup()

  const contactHandler = (contactData: UserData) => {
    dispatch({ type: 'TOGGLE_CONTACT_POPUP', payload: contactData })
  }

  const tableData = useMemo(() => data.users, [data.users])

  const { updateList } = useLists()

  const updateUser = useCallback(
    (userData: UserData) => {
      const ind = data?.users.findIndex((u) => u.address === userData.address)
      if (ind !== -1) {
        data.users[ind] = { ...userData }
        updateList({
          ...data,
          users: [...data?.users],
        })
      }
    },
    [data, updateList]
  )

  const removeUser = useCallback(
    (e: React.MouseEvent, userData: UserData) => {
      e.stopPropagation()
      if (removeContacts) {
        removeContacts([userData])
      } else {
        const newList = {
          ...data,
          users: data.users.filter((user) => user.address !== userData.address),
        }

        updateList(newList)
      }
    },
    [removeContacts, data, updateList]
  )

  const columns: Column<UserData>[] = useMemo(
    () => [
      {
        Header: 'Contact',
        accessor: 'name',
        minWidth: 180,
        Cell: ({ row }) => (
          <div className={s.cellName}>
            <Avatar
              className={s.avatar}
              image={row.original.avatar}
              strength={row.original.relationshipStrength}
            />{' '}
            {row.original?.templateData && (
              <PopoverUserInfo
                className={s.name}
                data={row.original}
                template={row.original.templateData}
              />
            )}
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
        Cell: ({ value, row }) => {
          const restValue = value
          return (
            <div
              className={s.cellContent}
              onClick={(e) => e.stopPropagation()}
              aria-hidden="true"
            >
              <EasyEdit
                type="text"
                value={value || restValue}
                placeholder={value}
                onSave={(val: string) =>
                  updateUser({
                    ...row.original,
                    notes: val || restValue,
                  })
                }
                saveButtonLabel="Save"
                cancelButtonLabel="Cancel"
              />
            </div>
          )
        },
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
      {
        Header: () => <Close className={s.headerButton} handler={() => null} />,
        id: 'row-button',
        width: 'auto',
        Cell: ({ row }: any) => (
          <Close
            className={s.removeButton}
            handler={(e: React.MouseEvent) => removeUser(e, row.original)}
          />
        ),
      },
    ],
    [removeUser, updateUser]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: tableData,
    },
    useFlexLayout,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((hookColumns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div className={s.headerCheckbox}>
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }: any) => (
            <div className={s.cellCheckbox}>
              <Checkbox {...row.getToggleRowSelectedProps()} />{' '}
            </div>
          ),
        },
        ...hookColumns,
      ])
    }
  )
  useEffect(() => {
    dispatchTable({
      type: 'UPDATE_SELECTED_USERS',
      payload: selectedFlatRows.map((item) => item.original),
    })
  }, [selectedFlatRows, dispatchTable])

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
              <tr
                onClick={() => contactHandler(row.original)}
                className={s.row}
                {...restProps}
                key={key}
              >
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
      <div className={s.emptyCardContainer}>
        {rows.length === 0 && (
          <CardContainer className={classNames(className, s.emptyCard)}>
            <div className={s.cardLogo}>
              <SvgIcon className={s.logo} icon="contacts.svg" />
            </div>
            <div className={s.cardHeader}>Start creating your list</div>
            <Search
              inputPlaceholder="Search contact to add to list…"
              classes={{ container: s.search }}
            />
          </CardContainer>
        )}
      </div>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

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
      max-width: 55px !important;
    }
  }

  .row {
    position: relative;
    cursor: pointer;
  }

  .headerButton {
    opacity: 0;
    pointer-events: none;
  }

  .headerCheckbox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    width: 100%;
  }

  .row:hover {
    background: var(--lightBlue);
  }

  .header_All {
    color: var(--blue);
  }

  .cell {
    display: table-cell;
    padding: 28px 19px;

    &:first-child {
      max-width: 55px !important;
    }
  }

  .emptyCardContainer {
    margin-top: 50px;
    margin-bottom: 90px;
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
    color: var(--blue);
  }

  .cellCheckbox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
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

  .removeButton {
    opacity: 0;
  }

  tr:hover .removeButton {
    opacity: 1;
  }

  .search {
    max-width: 309px;
    width: 100%;

    @include mobile {
      width: 80%;
    }
  }

  .cardHeader {
    font-size: 22px;
    font-weight: 700;
    line-height: 42px;
    text-align: center;
    margin-bottom: 30px;
  }

  .emptyCardContainer {
    display: flex;
    justify-content: center;
  }

  .emptyCard {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 54px 0;
    width: 80%;
  }

  .cardLogo {
    width: 162px;
    height: 162px;
    border-radius: 50%;
    background: #f0f5ff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 13px;

    @include mobile {
      width: 100px;
      height: 100px;
    }
  }

  .logo {
    width: 58px;
    height: 58px;
    color: #1966ff;

    @include mobile {
      width: 35px;
      height: 35px;
    }
  }
`

export default Table
