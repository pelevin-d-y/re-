import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Field, FieldProps, Formik } from 'formik'
import * as Yup from 'yup'
import Input from 'src/components/shared-ui/Input'
import Button from 'src/components/shared-ui/Button'
import Avatar from 'src/components/shared-ui/Avatar'
import Selector from '../shared-ui/Select'

type Props = {
  className?: string
  data: MainUserData
}

const Profile: React.FC<Props> = ({ className, data }) => {
  const CreateProfileSchema = Yup.object().shape({
    profileFirstName: Yup.string().max(100, 'Too Long!').required('Required'),
    profileLastName: Yup.string().max(100, 'Too Long!'),
  })

  const { fullName } = data
  const names = fullName?.split(' ')

  return (
    <div className={classNames(className, s.container)}>
      <Formik
        initialValues={{
          profileFirstName: names ? names[0] : '',
          profileLastName: names ? names[1] : '',
          profileEmail: data.syncedEmails,
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
            <div className={s.avatarBlock}>
              <Avatar image={data.avatar} className={s.avatar} />
              <button type="button" className={s.changeAvatar}>
                {data.avatar ? 'Change Pic' : 'Upload Pic'}
              </button>
            </div>
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
                <div className={classNames(s.field, s.email, s.smallField)}>
                  <Field name="profileEmail">
                    {({ field }: FieldProps) => (
                      <Selector
                        styles={{
                          valueContainer: {
                            padding: '16px 21px',
                          },
                          option: {
                            borderRadius: 5,
                            padding: '12px 18px 15px 18px',
                            marginBottom: 6,
                            boxShadow:
                              '0px 1px 1px 0px rgba(34, 34, 34, 0.0989), 0px 4px 8px 0px rgba(0, 0, 0, 0.1199)',
                          },
                          menu: {
                            width: 275,
                            padding: '18px 13px 19px 21px',
                            '&:before': {
                              position: 'absolute',
                              content: '"Synced emails"',
                              fontWeight: 800,
                              fontSize: 14,
                            },
                          },
                          menuList: {
                            marginTop: 30,
                            padding: 0,
                            overflowY: 'visible',
                          },
                        }}
                        options={field.value.map((item: string) => ({
                          value: item,
                          label: item,
                        }))}
                        label="Email"
                      />
                    )}
                  </Field>
                </div>
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
                      {() => (
                        <Selector
                          styles={{
                            container: {
                              width: '100%',
                              maxWidth: '182px',
                              marginRight: '15px',
                            },
                          }}
                          options={[
                            { value: 'one1', label: 'Once per week1' },
                            { value: 'one2', label: 'Once per week2' },
                            { value: 'one3', label: 'Once per week3' },
                          ]}
                          label="Cadence"
                        />
                      )}
                    </Field>
                  </div>
                  <div className={s.recomField}>
                    <Field name="RecommendationsWeekly">
                      {() => (
                        <Selector
                          styles={{
                            container: {
                              width: '100%',
                              maxWidth: '229px',
                            },
                          }}
                          options={[
                            { value: 'rec1', label: '1 recommendations' },
                            { value: 'rec2', label: '2 recommendations' },
                            { value: 'rec3', label: '3 recommendations' },
                          ]}
                          label="Recommendations weekly"
                        />
                      )}
                    </Field>
                  </div>
                </div>
              </div>
              <Button
                className={s.saveChanges}
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                Save changes
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
  }

  .avatarBlock {
    margin-right: 22px;
    display: flex;
    flex-direction: column;

    @include mobile {
      margin-right: 0;
      max-width: fit-content;
    }
  }

  .changeAvatar {
    color: var(--blue);
    font-size: 12px;
    line-height: 26px;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .content {
    display: flex;
    flex-flow: row nowrap;
    max-width: 622px;
    width: 100%;

    @include mobile {
      display: block;
    }
  }

  .form {
    width: 100%;
  }

  .row {
    display: flex;
    flex-flow: row nowrap;
    margin-left: -9px;

    @include mobile {
      flex-direction: column;
    }
  }

  .field {
    margin-bottom: 19px;
  }

  .smallField {
    margin-left: 9px;
  }

  .email {
    width: 100%;
  }

  .recomHeader {
    font-weight: var(--semibold);
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

  .saveChanges {
    max-width: 176px;
    width: 100%;
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
