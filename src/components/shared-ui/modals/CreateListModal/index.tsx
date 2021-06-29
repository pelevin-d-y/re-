import React from 'react'
import { css } from 'astroturf'
import { Field, FieldProps, Formik } from 'formik'
import { usePopup } from 'src/components/context/PopupContext'
import AddUserView from 'src/components/shared-ui/AddUserView'
import Button from 'src/components/shared-ui/Button'
import Input from 'src/components/shared-ui/Input'
import * as Yup from 'yup'
import CloseModal from '../../Close'
import ModalBase from '../ModalBase'

const CreateListSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Too Short!')
    .max(80, 'Too Long!')
    .required('Required'),
  description: Yup.string().max(50, 'Too Long!'),
})

const CreateListModal: React.FC = () => {
  const { state, dispatch: popupDispatch } = usePopup()
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
        <div className={s.title}>Create List</div>
        <div className={s.description}>Enter your list’s info</div>
        <Formik
          initialValues={{ name: '', description: '' }}
          validationSchema={CreateListSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false)
            }, 1000)
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Field name="name">
                {({ field, form, meta }: FieldProps) => (
                  <Input
                    className={s.field}
                    placeholder="List name"
                    type="string"
                    field={field}
                    form={form}
                    meta={meta}
                  />
                )}
              </Field>
              <Field name="description">
                {({ field, form, meta }: FieldProps) => (
                  <Input
                    className={s.field}
                    placeholder="Description"
                    type="string"
                    field={field}
                    form={form}
                    meta={meta}
                  />
                )}
              </Field>
              <AddUserView
                handler={() => null}
                users={[]}
                className={s.addUser}
              />
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Create
              </Button>
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
  }

  .field {
    margin-bottom: 15px;
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
    margin-bottom: 40px;
    font-size: 16px;
    line-height: 19px;
  }

  .addUser {
    box-shadow: none;
  }
`

export default CreateListModal
