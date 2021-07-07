import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useLists } from 'src/components/context/ListsContext'
import CardContainer from '../../cards/CardContainer'

type Props = {
  className?: string
  data: UserData
}

const TabLists: React.FC<Props> = ({ className, data }) => {
  const { state: lists } = useLists()

  const matchLists = lists?.filter((item) =>
    item.users.find((user) => user.address === data.address)
  )
  return (
    <div className={classNames(className, s.container)}>
      <ul>
        {matchLists?.map((list) => (
          <li className={s.item} key={list.id}>
            <CardContainer className={s.card}>
              <div className={s.title}>{list.title}</div>
              <div className={s.description}>{list.description}</div>
            </CardContainer>
          </li>
        ))}
      </ul>
      <button type="button" className={s.button}>
        + Add to new list{' '}
      </button>
    </div>
  )
}

const s = css`
  .container {
    padding: 16px 16px 34px 16px;
  }

  .item {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .card {
    padding: 16px 16px 12px 16px;
  }

  .title {
    margin-bottom: 10px;

    font-size: 16px;
    font-weight: var(--bold);
  }

  .description {
    font-size: 12px;
  }

  .button {
    padding: 10px;
    width: 100%;
    margin-top: 17px;

    cursor: pointer;
    background: none;
    border: 1px dashed #1966ff;
    border-radius: 6px;
    font-size: 14px;
    line-height: 26px;
    color: var(--blue);
  }
`

export default TabLists
