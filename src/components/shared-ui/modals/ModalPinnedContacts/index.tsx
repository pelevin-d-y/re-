import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import { useClient } from 'src/components/context/ClientContext'
import { Field, FieldProps, Formik } from 'formik'
import * as Yup from 'yup'
import CloseModal from '../../Close'
import ModalBase from '../ModalBase'
import Avatar from '../../Avatar'
import Input from '../../Input'
import AvatarList from '../../AvatarsList'
import Button from '../../Button'

type Props = {
  className?: string
}

const CreateListSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
})

const ModalPinnedContacts: React.FC<Props> = ({ className }) => {
  const { state, dispatch: popupDispatch } = usePopup()
  const { state: clientState } = useClient()

  const closeHandler = () => {
    popupDispatch({ type: 'TOGGLE_PINNED_USERS_POPUP' })
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={state.modalPinnedIsOpen}
      onClose={closeHandler}
    >
      <CloseModal handler={closeHandler} className={s.close} />
      <div className={s.content}>
        <div className={s.title}>Add these Contacts</div>
        <div className={s.description}>Manage these contacts in a list</div>
        <div className={s.tabs}>
          <div className={s.tab}>Create new list</div>
          <div className={s.tab}>Add to existing list</div>
        </div>
        <div className={s.tabContent}>
          <Formik
            initialValues={{
              name: '',
              description: '',
            }}
            validationSchema={CreateListSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false)
              }, 1000)
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <div className={s.avatars}>
                  {clientState.data?.contacts && (
                    <AvatarList users={clientState.data.contacts} />
                  )}
                </div>
                <Field name="name">
                  {({ field, form, meta }: FieldProps) => (
                    <Input
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
                    Create
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </ModalBase>
  )
}

const s = css`
  .container {
    max-width: 475px;
    padding: 30px 33px 49px;
    min-height: auto;
  }
`

export default ModalPinnedContacts
