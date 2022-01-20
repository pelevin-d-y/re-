import React, { useEffect, useState } from 'react'
import { Field, FieldProps, Formik } from 'formik'
import { css } from 'astroturf'
import Select from 'src/components/shared-ui/Select'
import { usePopup } from 'src/components/context/PopupContext'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import Button from 'src/components/shared-ui/Button'
import { LoaderComponent } from 'src/components/shared-ui/Loader'
import { usePlaylist } from 'src/components/context/PlaylistContext'
import { useRouter } from 'next/router'

type Props = {
  className?: string
  users: RecommendationUser[] | FormattedContact[]
}

const TabAddToExistingPlaylist: React.FC<Props> = ({ className, users }) => {
  const { dispatch: popupDispatch } = usePopup()
  const { state: playlistsState, getPlaylists } = usePlaylists()
  const { addUsers } = usePlaylist()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getPlaylistsAsync = async () => {
      setIsLoading(true)
      await getPlaylists()
      setIsLoading(false)
    }
    getPlaylistsAsync()
  }, [getPlaylists])

  const closeHandler = () => {
    popupDispatch({ type: 'TOGGLE_PINNED_USERS_POPUP' })
  }

  return (
    <Formik
      initialValues={{ playlist: playlistsState.data[0]?.playlist_id }}
      onSubmit={(values, { setSubmitting }) => {
        addUsers(values.playlist, users)
          .then((res) => {
            router.push(`/list?id=${values.playlist}`)
            setSubmitting(false)
          })
          // eslint-disable-next-line no-console
          .catch((err) => {
            setSubmitting(false)
            console.log('addUsers err ==>', err)
          })
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="playlist">
            {({ field, form }: FieldProps) => (
              <Select
                options={playlistsState.data?.map((item: ListData) => ({
                  value: item.playlist_id,
                  label: item?.info?.name as string,
                }))}
                label="List"
                handler={(option) =>
                  form.setFieldValue(field.name, option.value)
                }
                isLoading={isLoading}
              />
            )}
          </Field>
          <div className={s.actions}>
            <Button
              className={s.cancel}
              variant="outlined"
              handler={closeHandler}
            >
              Cancel
            </Button>
            <Button
              className={s.addToList}
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoaderComponent /> : 'Add'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}

const s = css`
  .actions {
    display: flex;
    flex-flow: row wrap;
    justify-content: right;

    margin-top: 29px;
  }

  .cancel {
    width: 87px;
  }

  .addToList {
    width: 102px;
    margin-left: 7px;
  }
`

export default TabAddToExistingPlaylist
