import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import * as Yup from 'yup'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import { Field, FieldProps, Formik } from 'formik'
import { usePopup } from 'src/components/context/PopupContext'
import Input from 'src/components/shared-ui/Input'
import Button from 'src/components/shared-ui/Button'
import { LoaderAbsolute } from 'src/components/shared-ui/Loader'
import { toast } from 'react-toastify'

type Props = {
  className?: string
  users: RecommendationUser[] | FormattedContact[]
}

const CreateListSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
})

const TabCreatePlaylist: React.FC<Props> = ({ className, users }) => {
  const { dispatch: popupDispatch } = usePopup()
  const { createPlaylist } = usePlaylists()

  const closeHandler = () => {
    popupDispatch({ type: 'TOGGLE_PINNED_USERS_POPUP' })
  }

  return (
    <Formik
      initialValues={{ name: '', description: '' }}
      validationSchema={CreateListSchema}
      onSubmit={(values, { setSubmitting }) => {
        createPlaylist({
          title: values.name,
          description: values.description,
          contacts: users,
        })
          .then(() => {
            toast('Playlist has been created')
            setSubmitting(false)
          })
          .catch((err) => {
            setSubmitting(false)
            toast('Error')
            console.log('err', err)
          })
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="name">
            {({ field, form, meta }: FieldProps) => (
              <Input
                className={s.input}
                type="text"
                field={field}
                form={form}
                meta={meta}
                label="Name"
              />
            )}
          </Field>
          <Field name="description">
            {({ field, form, meta }: FieldProps) => (
              <Input
                className={s.input}
                type="text"
                field={field}
                form={form}
                meta={meta}
                label="Description"
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
              className={s.createList}
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoaderAbsolute /> : 'Create'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}

const s = css`
  .input {
    margin-bottom: 21px;
  }

  .actions {
    display: flex;
    flex-flow: row wrap;
    justify-content: right;

    margin-top: 29px;
  }

  .cancel {
    width: 87px;
  }

  .createList {
    width: 102px;
    margin-left: 7px;
  }
`

export default TabCreatePlaylist
