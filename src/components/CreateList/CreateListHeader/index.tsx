import React, { useReducer, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import PreviousPage from 'src/components/shared-ui/PreviousPage'

type Props = {
  className?: string
  data: List
  updateField: (type: 'title' | 'description', text: string) => void
}

const CreateListHeader: React.FC<Props> = ({
  className,
  updateField,
  data,
}) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('title', e.target.value)
  }

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('description', e.target.value)
  }

  return (
    <div className={classNames(className, s.container)}>
      <PreviousPage text="Back to list" />
      <input
        className={s.title}
        name="title"
        placeholder="Enter name..."
        onChange={handleTitleChange}
        // onBlur={handleRequest}
      />
      <input
        className={s.description}
        name="description"
        placeholder="Enter description..."
        onChange={handleDescChange}
        // onBlur={handleRequest}
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

export default CreateListHeader
