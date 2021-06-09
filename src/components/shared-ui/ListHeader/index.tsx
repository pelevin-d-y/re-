import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import PreviousPage from 'src/components/shared-ui/PreviousPage'
import TextareaAutosize from 'react-textarea-autosize'
import { css } from 'astroturf'
import { useLists } from 'src/components/context/ListsContext'
import { useDebounce } from 'use-debounce/lib'

type Props = {
  className?: string
  data: List
  updateNewList?: (type: 'title' | 'description', text: string) => void
}

const ListHeader: React.FC<Props> = ({ className, data, updateNewList }) => {
  const { updateList } = useLists()
  const [fields, setFields] = useState({
    title: data.title,
    description: data.description,
  })

  const [debounceFields] = useDebounce(fields, 1000)

  useEffect(() => {
    if (
      debounceFields.title !== data.title ||
      debounceFields.description !== data.description
    ) {
      updateList({
        ...data,
        title: debounceFields.title,
        description: debounceFields.description,
      })
    }
  }, [data, debounceFields, updateList])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updateNewList) {
      updateNewList('title', e.target.value)
    } else {
      setFields({
        title: e.target.value,
        description: debounceFields.description,
      })
    }
  }

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (updateNewList) {
      updateNewList('description', e.target.value)
    } else {
      setFields({ title: debounceFields.title, description: e.target.value })
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
        defaultValue={fields.title || ''}
      />
      <TextareaAutosize
        className={s.description}
        name="description"
        placeholder="Enter description..."
        defaultValue={fields.description || ''}
        onChange={handleDescChange}
      />
      <div className={s.userCount}>{data.users.length} Contacts</div>
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
    min-width: 276px;
    resize: none;

    border: none;
    font-weight: var(--bold);
    font-size: 16px;
  }

  .userCount {
    margin-top: 8px;
    font-size: 14px;
    font-weight: var(--bold);
    color: var(--blue);
  }
`

export default ListHeader
