import React, { useReducer, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import PreviousPage from 'src/components/shared-ui/PreviousPage'
import { useLists } from 'src/components/context/ListsContext'

type Props = {
  className?: string
}

type State = {
  title: string
  description: string
  id: number
  idHasUpdated: boolean
}

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return {
        ...state,
        title: action.title,
      }

    case 'UPDATE_DESCRIPTION':
      return {
        ...state,
        description: action.description,
      }
    case 'UPDATE_HAS_ID_UPDATED':
      return {
        ...state,
        idHasUpdated: true,
      }

    default: {
      return state
    }
  }
}

const CreateListHeader: React.FC<Props> = ({ className }) => {
  const { state: litsState, addList, updateList } = useLists()

  const [state, dispatch] = useReducer(reducer, {
    title: '',
    description: '',
    id: (litsState?.length as number) + 1,
    idHasUpdated: false,
  })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_TITLE', title: e.target.value })
  }

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_DESCRIPTION', description: e.target.value })
  }

  const handleRequest = () => {
    const { title, description, id } = state
    const list = {
      id,
      title,
      description,
      users: [],
      icon: '',
    }

    if (!state.idHasUpdated) {
      dispatch({ type: 'UPDATE_HAS_ID_UPDATED' })
      addList(list)
    } else {
      updateList(list)
    }
  }

  return (
    <div className={classNames(className, s.container)}>
      <PreviousPage text="Back to list" />
      <input
        className={s.title}
        name="title"
        placeholder="Enter name..."
        onChange={handleTitleChange}
        onBlur={handleRequest}
      />
      <input
        className={s.description}
        name="description"
        placeholder="Enter description..."
        onChange={handleDescChange}
        onBlur={handleRequest}
      />
      {/* <div className={s.userCount}>{data.users.length} Contacts</div> */}
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding-top: 12px;
    padding-left: 30px;
    padding-bottom: 23px;

    @include mobile {
      padding-left: 16px;
    }
  }
  .title {
    display: block;
    margin-top: 13px;
    margin-bottom: 0;

    border: none;
    font-size: 26px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .description {
    display: block;

    border: none;
    font-weight: var(--bold);
    font-size: 16px;
  }
`

export default CreateListHeader
