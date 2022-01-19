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
import PopoverUserInfo from 'src/components/shared-ui/popover/PopoverUserInfo'
import parseMessage from 'src/helpers/utils/parse-message'
import { useTable as useTableContext } from 'src/components/context/TableContext'
import Checkbox from '../shared-ui/Table/Checkbox'
import Row from '../shared-ui/Table/Row'
import UserHeader from '../shared-ui/UserHeader'
import Button from '../shared-ui/Button'

type Props = {
  className?: string
  data: RecommendationUser[]
}

const Table: React.FC<Props> = ({ className, data }) => {
  const { setState: setSelectedUsers } = useTableContext()
  const tableData = useMemo(() => data, [data])

  const columns: Column<any>[] = useMemo(
    () => [
      {
        id: 'Contact',
        minWidth: 200,
        Cell: ({ row }) => (
          <div className={s.cellName}>
            <Avatar
              className={s.avatar}
              image={row.original.avatar}
              strength={row.original.relationshipStrength}
            />
            <div>
              <PopoverUserInfo className={s.name} data={row.original} />
            </div>
          </div>
        ),
      },
      {
        id: 'last-message',
        minWidth: 100,
        Cell: ({ value, row }) => (
          <div className={s.cellContent}>{row.original.last_client_text}</div>
        ),
      },
      {
        id: 'Company',
        minWidth: 250,
        Cell: ({ value, row }) => (
          <UserHeader
            className={s.description}
            text={parseMessage(
              row.original.message_template_description,
              row.original.name
            )}
          />
        ),
      },
      {
        id: 'button',
        minWidth: 150,
        Cell: () => (
          <div className={s.buttonWrapper}>
            <Button
              className={s.button}
              variant="outlined"
              handler={() => null}
            >
              Follow up
            </Button>
          </div>
        ),
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    selectedFlatRows,
    prepareRow,
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
              <Checkbox
                className={s.checkbox}
                {...row.getToggleRowSelectedProps()}
              />{' '}
            </div>
          ),
        },
        ...hookColumns,
      ])
    }
  )

  useEffect(() => {
    setSelectedUsers(
      selectedFlatRows.map(
        (item) => item.original as RecommendationUser | FormattedContact
      )
    )
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
              <Row
                row={row}
                classes={{ cell: s.cell }}
                key={key}
                {...restProps}
              />
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
    padding-left: 20px;
    padding-right: 20px;
  }

  .table {
    border-collapse: collapse;
    width: 100%;
    min-width: 400px !important;
  }

  .row:hover {
    background: var(--lightBlue);
  }

  .cellName {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-weight: var(--bold);
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

    font-size: 12px;
    line-height: 14px;
  }

  .threadButton {
    font-size: 12px;
    line-height: 14px;
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

  .checkbox {
    background: var(--white);
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
  }

  .buttonWrapper {
    display: flex;
    flex-flow: row nowrap;
  }

  .button {
    margin-left: auto;
    width: 122px;
  }
`

export default Table
