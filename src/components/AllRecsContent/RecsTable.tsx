import React, { useCallback, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import {
  Column,
  useFlexLayout,
  useRowSelect,
  useRowState,
  useTable,
} from 'react-table'

import Avatar from 'src/components/shared-ui/Avatar'
import { useTable as useTableContext } from 'src/components/context/TableContext'
import PopoverUserInfo from 'src/components/shared-ui/popover/PopoverUserInfo'
import formatTime from 'src/helpers/utils/parseTime'
import Checkbox from '../shared-ui/Table/Checkbox'
import Row from '../shared-ui/Table/Row'
import Button from '../shared-ui/Button'

type Props = {
  className?: string
  data: UserData[]
  removeContacts?: (removeContacts: any) => void
}

const Table: React.FC<Props> = ({ className, data }) => {
  const { setState: setSelectedUsers } = useTableContext()

  const tableData = useMemo(() => data, [data])

  const updateUser = useCallback((userData: any) => {
    console.log('userData', userData)
  }, [])

  const columns: Column<any>[] = useMemo(
    () => [
      {
        id: 'Contact',
        // accessor: 'name',
        minWidth: 180,
        Cell: ({ row }) => (
          <div className={s.cellName}>
            <Avatar
              className={s.avatar}
              image={row.original.avatar}
              strength={row.original.relationshipStrength}
            />{' '}
            <PopoverUserInfo
              className={s.name}
              data={row.original}
              template={row.original.templateData}
            />
          </div>
        ),
      },
      {
        id: 'Company',
        Cell: ({ value, row }) => (
          <div className={s.cellContent}>Placeholder</div>
        ),
      },
      {
        id: 'Last outreach',
        accessor: 'last_client_text',
        Cell: ({ value, row }) => (
          <div className={s.cellContent}>
            <div className={s.lastData}>
              {formatTime(row.original.last_client_time)}
            </div>
            <div>
              Hi Hailey, Did get a chance to view the deck i sent ove...
            </div>
          </div>
        ),
      },
    ],
    []
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
    useFlexLayout,
    useRowSelect,
    useRowState,
    (hooks) => {
      hooks.visibleColumns.push((hookColumns) => [
        {
          id: 'selection',
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
    setSelectedUsers(selectedFlatRows.map((item) => item.original))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlatRows])

  const removeUser = useCallback((e: React.MouseEvent, userData: any) => {
    e.stopPropagation()
    return null
  }, [])

  return (
    <div className={s.container}>
      <table className={classNames(className, s.table)} {...getTableProps()}>
        <tbody className={s.tbody} {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            const { key, ...restProps } = row.getRowProps()

            return (
              <Row row={row} className={s.tableRow} key={key} {...restProps}>
                <td className={s.removeButton}>
                  <Button
                    handler={() => {
                      console.log('handler')
                    }}
                    variant="contained"
                  >
                    Follow up
                  </Button>
                </td>
              </Row>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    width: 100%;
    overflow: auto;
    padding: 20px;
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
    padding-right: 26px;

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

  .addUserView {
    max-width: 326px;
    width: 100%;
    box-shadow: none;
    padding: 8px;
  }
`

export default Table
