import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Field, FieldProps, Formik } from 'formik'
import * as Yup from 'yup'
import Input from 'src/components/shared-ui/Input'
import Button from 'src/components/shared-ui/Button'
import Avatar from 'src/components/shared-ui/Avatar'
import Selector from '../shared-ui/Selector'

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
              <div className={s.recomModule}>
                <div className={s.recomHeader}>Recommendation</div>
                <div className={s.recomFields}>
                  <div className={s.recomField}>
                    <Field name="Cadence">
                      {({field, form, meta}: FieldProps) => (
                        <Selector
                          styles={{container: {
                            width: '100%',
                            maxWidth: '182px',
                            marginRight: '15px',
                          }}} 
                          options={[
                            { value: 'one1', label: 'Once per week1' },
                            { value: 'one2', label: 'Once per week2' },
                            { value: 'one3', label: 'Once per week3' }
                          ]}
                          label='Cadence'
                        />
                      )}
                    </Field>
                  </div>
                  <div className={s.recomField}>
                    <Field name="RecommendationsWeekly">
                      {({field, form, meta}: FieldProps) => (
                        <Selector
                          styles={{container: {
                            width: '100%',
                            maxWidth: '229px',
                          }}} 
                          options={[
                            { value: 'rec1', label: '1 recommendations' },
                            { value: 'rec2', label: '2 recommendations' },
                            { value: 'rec3', label: '3 recommendations' }
                          ]}
                          label='Recommendations weekly'
                        />
                      )}
                    </Field>
                  </div>
                </div>
              </div>
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
  @import 'src/styles/preferences/_mixins.scss';

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

  .recomHeader {
    font-weight: 800;
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 14px;
  }

  .recomFields {
    display: flex;
    margin-bottom: 30px;
    width: 83%;

    @include mobile {
      flex-direction: column;
    }
  }
  
  .recomField {
    width: 100%;
    
    &:first-child {
      @include mobile {
        margin-bottom: 15px;
      }
    }
  }
`

export default Profile
