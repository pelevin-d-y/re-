import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Field, FieldProps, Formik } from 'formik'
import * as Yup from 'yup'
import Input from 'src/components/shared-ui/Input'
import Button from 'src/components/shared-ui/Button'
import Avatar from 'src/components/shared-ui/Avatar'

type Props = {
  className?: string
  data: UserData
}

const Profile: React.FC<Props> = ({ className, data }) => {
  const CreateProfileSchema = Yup.object().shape({
    profileFirstName: Yup.string().max(100, 'Too Long!').required('Required'),
    profileLastName: Yup.string().max(100, 'Too Long!'),
  })

  const { name } = data
  const names = name?.split(' ')

  return (
    <div className={classNames(className, s.container)}>
      <Formik
        initialValues={{
          profileFirstName: names ? names[0] : '',
          profileLastName: names ? names[1] : '',
          profileEmail: data.address,
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
            <Avatar image={data.avatar} className={s.avatar} />
            <form className={s.form} onSubmit={handleSubmit}>
              <div className={s.row}>
                <Field name="profileFirstName">
                  {({ field, form, meta }: FieldProps) => (
                    <Input
                      className={classNames(s.field, s.smallField)}
                      type="text"
                      field={field}
                      form={form}
                      meta={meta}
                      placeholder="First name"
                      label="First Name"
                    />
                  )}
                </Field>
                <Field name="profileLastName">
                  {({ field, form, meta }: FieldProps) => (
                    <Input
                      className={classNames(s.field, s.smallField)}
                      type="text"
                      field={field}
                      form={form}
                      meta={meta}
                      placeholder="Last name"
                      label="Last Name"
                    />
                  )}
                </Field>
              </div>
              <div className={s.row}>
                <Field name="profileEmail">
                  {({ field, form, meta }: FieldProps) => (
                    <Input
                      className={classNames(s.field, s.smallField)}
                      type="email"
                      field={field}
                      form={form}
                      meta={meta}
                      placeholder="email"
                      label="Email"
                    />
                  )}
                </Field>
                <Field name="profilePhone">
                  {({ field, form, meta }: FieldProps) => (
                    <Input
                      className={classNames(s.field, s.smallField)}
                      type="text"
                      field={field}
                      form={form}
                      meta={meta}
                      placeholder="phone"
                      label="Phone number"
                    />
                  )}
                </Field>
              </div>
              <Field name="profileCompany">
                {({ field, form, meta }: FieldProps) => (
                  <Input
                    className={s.field}
                    type="text"
                    field={field}
                    form={form}
                    meta={meta}
                    placeholder="Company"
                    label="Company"
                  />
                )}
              </Field>
              <Field name="TitleProfile">
                {({ field, form, meta }: FieldProps) => (
                  <Input
                    className={s.field}
                    type="text"
                    field={field}
                    form={form}
                    meta={meta}
                    placeholder="Title"
                    label="Title"
                  />
                )}
              </Field>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  )
}

const s = css`
  .avatar {
    width: 87px !important;
    height: 87px !important;
    margin-right: 22px;
  }

  .content {
    display: flex;
    flex-flow: row nowrap;
    max-width: 622px;
    width: 100%;
  }

  .form {
    width: 100%;
  }

  .row {
    display: flex;
    flex-flow: row nowrap;
    margin-left: -9px;
  }

  .field {
    margin-bottom: 19px;
  }

  .smallField {
    margin-left: 9px;
  }
`

export default Profile
