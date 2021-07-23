import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Field, FieldProps, Formik } from 'formik'
import * as Yup from 'yup'
import Input from 'src/components/shared-ui/Input'
import Button from 'src/components/shared-ui/Button'

type Props = {
  className?: string
}

const PasswordChangeForm: React.FC<Props> = ({ className }) => {
  const CreateProfileSchema = Yup.object().shape({
    lastPassword: Yup.string().required('Required'),
    newPassword: Yup.string().min(6, 'min 6 char').max(100, 'Too Long!').required('Required'),
  })

  return (
    <div className={classNames(className, s.container)}>
      <Formik
        initialValues={{
          lastPassword: '',
          newPassword: '',
        }}
        validationSchema={CreateProfileSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false)
          }, 1000)
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <div className={s.content}>
            <form className={s.form} onSubmit={handleSubmit}>
              <Field name="lastPassword">
                {({ field, form, meta }: FieldProps) => (
                  <Input
                    className={s.field}
                    type="password"
                    field={field}
                    form={form}
                    meta={meta}
                    placeholder="Old Password"
                    label="Old Password"
                  />
                )}
              </Field>
              <Field name="newPassword">
                {({ field, form, meta }: FieldProps) => (
                  <Input
                    className={s.field}
                    type="password"
                    field={field}
                    form={form}
                    meta={meta}
                    placeholder="New Password"
                    label="New Password (min 6 char)"
                  />
                )}
              </Field>
              <Button
                className={s.saveChanges}
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                Change Password
              </Button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  )
}

const s = css`
  .content {
    display: flex;
    flex-flow: row nowrap;
    max-width: 622px;
    width: 100%;
  }

  .form {
    width: 100%;
  }

  .field {
    margin-bottom: 19px;
  }

  .saveChanges {
    max-width: 176px;
    width: 100%;
  }
`

export default PasswordChangeForm
