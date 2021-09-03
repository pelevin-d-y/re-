import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import PreviousPage from 'src/components/shared-ui/PreviousPage'
import TextareaAutosize from 'react-textarea-autosize'
import { css } from 'astroturf'
import { useDebounce } from 'use-debounce/lib'
import { postPlaylists } from 'src/api'
import { useRouter } from 'next/router'
import SvgIcon from '../SvgIcon'
import Button from '../Button'

type Props = {
  className?: string
  data: any
  updateNewList?: (type: 'title' | 'description', text: string) => void
}

const ListHeader: React.FC<Props> = ({ className, data, updateNewList }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState({
    title: data.info?.name,
    description: data.info?.description,
  })

  const [debounceFields] = useDebounce(fields, 1000)

  useEffect(() => {
    setFields({ title: data.info?.name, description: data.info?.description })
  }, [data.contacts, data.info?.description, data.info?.name])

  const createList = () => {
    if (fields.title || fields.description) {
      setIsLoading(true)
      postPlaylists([
        {
          info: {
            name: debounceFields.title,
            description: debounceFields.description,
          },
        },
      ])
        .then(() => {
          setIsLoading(false)
          router.push('/lists')
        })
        .catch((err) => {
          setIsLoading(false)
          console.log('ListHeader err =>', err)
        })
    }
  }

  useEffect(() => {
    const updatePlaylist = async () => {
      if (
        debounceFields.title !== data.title ||
        debounceFields.description !== data.description
      ) {
        if (data.id) {
          await postPlaylists([
            {
              id: data.id,
              info: {
                name: debounceFields.title,
                description: debounceFields.description,
              },
            },
          ]).catch((err) => {
            setIsLoading(false)
            console.log('ListHeader err =>', err)
          })
        }
      }
    }

    updatePlaylist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, debounceFields])

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

      {!data.id && (
        <Button
          className={classNames(s.button, isLoading && s.disabled)}
          variant="contained"
          handler={() => createList()}
        >
          Save list
        </Button>
      )}
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 12px 16px 23px 30px;

    @include mobile {
      padding-left: 16px;
    }
  }
  .title {
    display: block;
    margin-top: 13px;
    margin-bottom: 0;
    width: 100%;

    border: none;
    font-size: 26px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .description {
    display: block;
    width: 100%;
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

  .inputWrapper {
    position: relative;
  }

  .button {
    max-width: 200px;
    width: 100%;
    margin-top: 20px;
  }

  .disabled {
    pointer-events: none;
  }
`

export default ListHeader
