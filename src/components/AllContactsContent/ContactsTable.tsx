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
import PopoverUserInfo from 'src/components/shared-ui/popover/PopoverUserInfo'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { apiHelpers } from 'src/api'
import { useTable as useTableContext } from 'src/components/context/TableContext'
import { useRouter } from 'next/router'
import { customSortType } from 'src/helpers/utils/custom-sort-table'
import { getName } from 'src/helpers/utils/get-name'
import { getNextStep } from 'src/helpers/utils/get-next-step'
import Checkbox from '../shared-ui/Table/Checkbox'
import Row from '../shared-ui/Table/Row'
import EditField from '../shared-ui/EditField'
import CellLastMessage from '../shared-ui/Table/CellLastMessage'
import { HOCLastMessage } from '../HOCs/HOCLastMessage'
import NextStep from '../shared-ui/NextStep'

type Props = {
  className?: string
  data: FormattedContact[]
  fetchData: () => void
}

const ContactsTable: React.FC<Props> = ({ className, data, fetchData }) => {
  const { setState: setSelectedUsers } = useTableContext()
  const tableData = useMemo(() => data, [data])
  const router = useRouter()

  const updateUser = useCallback((userData: any) => {
    const defaultNote = {
      type: 'Notes',
      data: '',
      review: 1,
      meta: { type: 'primary' },
    }

    if (userData.Notes) {
      return apiHelpers.updateMutableData(
        userData.contact_id,
        [
          {
            ...userData.Notes,
            data: userData.newNotes,
            meta: {
              type: 'primary',
            },
          },
        ],
        [
          {
            ...userData.Notes,
            review: 2,
          },
        ]
      )
    }
    return apiHelpers.updateMutableData(userData.contact_id, [
      { ...defaultNote, data: userData.newNotes },
    ])
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
              name={getName(row.original)}
              strength={row.original.relationshipStrength}
            />
            <PopoverUserInfo
              className={s.name}
              data={row.original}
              updateDataCallback={fetchData}
            />
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
        disableSortBy: true,
        Cell: ({ value, row }) => {
          return (
            <HOCLastMessage id={row.original.contact_id}>
              {(lastMessageData, isLoading, ref) => (
                <CellLastMessage
                  isLoading={isLoading}
                  lastMessageData={lastMessageData}
                  ref={ref}
                />
              )}
            </HOCLastMessage>
          )
        },
      },
      {
        Header: 'Next steps',
        disableSortBy: true,
        Cell: ({ value, row }) => {
          return (
            <NextStep
              className={s.cellContent}
              text={getNextStep(row.original)}
            />
          )
        },
      },
      {
        Header: 'Notes',
        accessor: 'Notes',
        disableSortBy: true,
        Cell: ({ value, row }) => {
          const [currentValue, setCurrentValue] = useState(value?.data)

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
                })
                // .catch(() => setCurrentValue(currentValue))
              }}
            />
          )
        },
      },
      {
        accessor: 'edit',
        disableSortBy: true,
        Cell: ({ value, row }) => (
          <div className={s.cellButton}>
            <button
              type="button"
              className={s.rowButton}
              onClick={(evt) => {
                evt.stopPropagation()
                router.push(`/contact?id=${row.original.contact_id}`)
              }}
            >
              <SvgIcon className={s.pen} icon="pen.svg" />
            </button>
          </div>
        ),
      },
    ],
    [router, updateUser]
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
          {rows.map((row: any) => {
            prepareRow(row)
            const { key, ...restProps } = row.getRowProps()
            return (
              <Row
                row={row}
                classes={{ container: s.tableRow }}
                key={key}
                {...restProps}
              />
            )
          })}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div className={s.emptyCardContainer}>
          <CardContainer className={classNames(className, s.emptyCard)}>
            <div className={s.cardLogo}>
              <SvgIcon className={s.logo} icon="contacts.svg" />
            </div>
          </CardContainer>
        </div>
      )}
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
    padding-bottom: 36px;
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

    &:last-child {
      max-width: 50px !important;
    }
  }

  .tableRow {
    &:hover {
      .rowButton {
        opacity: 1;
      }
    }
  }

  .tableRow td {
    &:last-child {
      max-width: 50px !important;
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
    background: var(--primary2);
  }

  .header_All {
    color: var(--primary1);
  }

  .pen {
    color: var(--primary1);
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
    word-break: break-word;
  }

  .avatar {
    font-size: 16px;
    flex: 0 0 auto;
    margin-right: 20px;
  }

  .cellContent {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .cellHeaderAll {
    color: var(--primary1);
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
    background: var(--primary2);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 13px;

    @include mobile {
      width: 100px;
      height: 100px;
    }
  }

  .rowButton {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    padding: 0;

    background: 0;
    border: 0;
    cursor: pointer;

    opacity: 0;
  }

  .logo {
    width: 58px;
    height: 58px;
    color: var(--primary1);

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

export default ContactsTable
