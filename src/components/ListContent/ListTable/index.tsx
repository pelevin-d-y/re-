/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import {
  Column,
  useFlexLayout,
  useRowSelect,
  useRowState,
  useSortBy,
  useTable,
} from 'react-table'

import Avatar from 'src/components/shared-ui/Avatar'
import { useTable as useTableContext } from 'src/components/context/TableContext'
import PopoverUserInfo from 'src/components/shared-ui/popover/PopoverUserInfo'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { usePlaylist } from 'src/components/context/PlaylistContext'
import { post } from 'src/api'
import EditField from 'src/components/shared-ui/EditField'
import { customSortType } from 'src/helpers/utils/custom-sort-table'
import CellLastMessage from 'src/components/shared-ui/Table/CellLastMessage'
import CellNextSteps from 'src/components/shared-ui/Table/CellNextSteps'
import AddUserView from '../../shared-ui/AddUserView'
import Row from '../../shared-ui/Table/Row'
import Close from '../../shared-ui/Close'
import Checkbox from '../../shared-ui/Table/Checkbox'

type Props = {
  className?: string
  data: ListData
}

const Table: React.FC<Props> = ({ className, data }) => {
  const { setState: setSelectedUsers } = useTableContext()
  const { removeUsers, getPlaylistData } = usePlaylist()
  const tableData = useMemo(() => data.contacts, [data.contacts])

  const updateUser = useCallback((userData: any) => {
    const newValue = [
      {
        type: 'Playlist_Notes',
        data: data.playlist_id,
        review: 1,
        meta: {
          text: userData.newNotes,
        },
      },
    ]

    const previousValue = [
      {
        type: 'Playlist_Notes',
        data: data.playlist_id,
        review: 2,
      },
    ]
    const body = {
      [userData.contact_id]: [...newValue, ...previousValue],
    }

    return post.postContactsMutable(body)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns: Column<any>[] = useMemo(
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
            <PopoverUserInfo className={s.name} data={row.original} />
          </div>
        ),
        sortType: customSortType(),
      },
      // {
      //   Header: 'Title',
      //   Cell: ({ value }) => <span className={s.cellContent}>Placeholder</span>,
      // },
      // {
      //   Header: 'Company',
      //   Cell: ({ value, row }) => (
      //     <div className={s.cellContent}>Placeholder</div>
      //   ),
      // },
      {
        Header: 'Last outreach',
        accessor: 'last_client_text',
        maxWidth: 100,
        disableSortBy: true,
        Cell: ({ value, row }) => <CellLastMessage data={row.original} />,
      },
      {
        Header: 'Next steps',
        minWidth: 250,
        disableSortBy: true,
        Cell: ({ value, row }) => (
          <CellNextSteps className={s.cellContent} data={row.original} />
        ),
      },
      {
        Header: 'Notes',
        accessor: 'Playlist_Notes',
        disableSortBy: true,
        Cell: ({ value, row }) => {
          const currentPlaylistValue =
            value.filter(
              (item: { text: string; playlistId: string }) =>
                item?.playlistId === data.playlist_id
            )[0] || ''

          const [currentValue, setCurrentValue] = useState(
            currentPlaylistValue?.text
          )

          return (
            <EditField
              type="text"
              value={currentValue}
              placeholder=""
              onSave={(val: string) => {
                setCurrentValue(val)
                updateUser({
                  ...row.original,
                  newNotes: val,
                }).catch(() => setCurrentValue(currentValue))
              }}
            />
          )
        },
      },
    ],
    [data.playlist_id, updateUser]
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
      data: tableData || [],
    },
    useSortBy,
    useFlexLayout,
    useRowSelect,
    useRowState,
    (hooks) => {
      hooks.visibleColumns.push((hookColumns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div className={s.headerCheckbox}>
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
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
    setSelectedUsers(
      selectedFlatRows.map((item) => item.original as FormattedContact)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlatRows])

  const removeUser = useCallback(
    async (e: React.MouseEvent, userData) => {
      e.stopPropagation()
      await removeUsers(data.playlist_id, [userData])
      await getPlaylistData(data.playlist_id)
    },
    [getPlaylistData, removeUsers, data.playlist_id]
  )

  return (
    <div className={s.container}>
      <table className={classNames(className, s.table)} {...getTableProps()}>
        <thead className={s.thead}>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps()
            return (
              <tr {...restHeaderGroupProps} className={s.tableRow} key={key}>
                {headerGroup.headers.map((column) => {
                  const { key: keyHeader } = column.getHeaderProps()
                  return (
                    <th
                      className={classNames(s.columnHeader, s[keyHeader])}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={keyHeader}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <SvgIcon className={s.sort} icon="sort.svg" />
                          ) : (
                            <SvgIcon
                              className={classNames(s.sort, s.sortAsc)}
                              icon="sort.svg"
                            />
                          )
                        ) : (
                          ''
                        )}
                      </span>
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
              <Row
                row={row}
                classes={{ container: s.tableRow }}
                key={key}
                {...restProps}
              >
                <td className={s.removeButton}>
                  <Close
                    handler={(e: React.MouseEvent) => {
                      row.setState({ isLoading: true })
                      removeUser(e, row.original).then(() => {
                        row.setState({ ...row.state, isLoading: false })
                      })
                    }}
                  />
                </td>
              </Row>
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
            <AddUserView className={s.addUserView} listId={data.playlist_id} />
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
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
  }

  .table {
    border-collapse: collapse;
    width: 100%;
  }

  .columnHeader {
    text-align: left;
    padding: 18px 19px;
    font-size: 12px;

    &:first-child {
      max-width: 55px !important;
    }
  }

  .tableRow {
    padding-right: 50px;

    &:hover {
      .removeButton {
        opacity: 1;
      }
    }
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

  .emptyCardContainer {
    margin-top: 50px;
    margin-bottom: 90px;
  }

  .cellName {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    word-break: break-word;
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

  .lastData {
    margin-bottom: 6px;

    font-size: 12px;
    line-height: 14px;
    color: #adadad;
  }

  .lastMessage {
    font-size: 12px;
    line-height: 14px;
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
    background: var(--lightBlue);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 13px;

    @include mobile {
      width: 100px;
      height: 100px;
    }
  }

  .removeButton {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);

    opacity: 0;
  }

  .logo {
    width: 58px;
    height: 58px;
    color: var(--blue);

    @include mobile {
      width: 35px;
      height: 35px;
    }
  }

  .addUserView {
    max-width: 326px;
    width: 100%;
    box-shadow: none;
    padding: 8px;
  }

  .sort {
    margin-left: 3px;
  }
  .sortAsc {
    transform: scale(1, -1);
  }
`

export default Table
