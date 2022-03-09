import React from 'react'
import { css } from 'astroturf'
import { Field, FieldProps, Formik } from 'formik'
import { usePopup } from 'src/components/context/PopupContext'
import Button from 'src/components/shared-ui/Button'
import Input from 'src/components/shared-ui/Input'
import * as Yup from 'yup'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import CloseModal from '../../Close'
import ModalBase from '../ModalBase'
import { LoaderAbsolute } from '../../Loader'

const CreateListSchema = Yup.object().shape({
  name: Yup.string().max(80, 'Too Long').required('Required'),
})

const CreateListModal: React.FC = () => {
  const { state, dispatch: popupDispatch } = usePopup()
  const { createPlaylist } = usePlaylists()
  const router = useRouter()
  const { createListModalIsOpen } = state

  const closeHandler = () => {
    popupDispatch({ type: 'TOGGLE_CREATE_LIST_POPUP' })
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={createListModalIsOpen}
      onClose={closeHandler}
    >
      <CloseModal handler={closeHandler} className={s.close} />
      <div className={s.content}>
        <div className={s.title}>Create new list</div>
        <div className={s.description}>
          Manage this list in the “Lists” section
        </div>
        <Formik
          initialValues={{ name: '', description: '' }}
          validationSchema={CreateListSchema}
          onSubmit={(values, { setSubmitting }) => {
            createPlaylist({
              title: values.name,
              description: values.description,
              contacts: state?.dataMulti || [],
            })
              .then((res) => {
                router.push(`/list?id=${res[0].playlist_id}`)
                setSubmitting(false)
              })
              .catch((err) => {
                setSubmitting(false)
                console.log('err', err)
              })
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Field name="name">
                {({ field, form, meta }: FieldProps) => (
                  <Input
                    className={s.field}
                    label="Name"
                    type="string"
                    field={field}
                    form={form}
                    meta={meta}
                    placeholder="Add a name for this list..."
                  />
                )}
              </Field>
              <Field name="description">
                {({ field, form, meta }: FieldProps) => (
                  <Input
                    className={s.field}
                    label="Description"
                    type="string"
                    field={field}
                    form={form}
                    meta={meta}
                    placeholder="Add a description for this list..."
                  />
                )}
              </Field>
              <div className={s.actions}>
                <Button
                  className={classNames(s.button)}
                  variant="outlined"
                  handler={closeHandler}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  className={classNames(s.createButton, s.button)}
                >
                  {isSubmitting ? <LoaderAbsolute /> : 'Create'}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </ModalBase>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    max-width: 475px;
    padding: 30px 33px 49px;
    min-height: auto;
  }

  .field {
    margin-bottom: 21px;
  }

  .close {
    position: absolute;
    top: 23px;
    right: 23px;
  }

  .title {
    margin-bottom: 14px;

    font-size: 18px;
    line-height: 22px;
    font-weight: var(--bold);
  }

  .description {
    margin-bottom: 31px;
  }

  .input {
    margin-bottom: 21px;
  }

  .actions {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;

    margin-top: 25px;
  }

  .button {
    min-width: 87px;
  }

  .createButton {
    width: 102px;
    margin-left: 7px;
  }
`

export default CreateListModal
