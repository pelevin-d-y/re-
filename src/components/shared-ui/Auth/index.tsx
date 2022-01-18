import React, { useState } from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Logo from 'src/components/shared-ui/Logo'
import { Field, FieldProps, Formik } from 'formik'
import Input from 'src/components/shared-ui/Input'
import Link from 'next/link'
import Button from 'src/components/shared-ui/Button'
import * as Yup from 'yup'

type Props = {
  className?: string
}

const Auth: React.FC<Props> = ({ className }) => {
  const [isSignIn, setIsSignIn] = useState(false)

  const CreateListSchema = Yup.object().shape({
    email: Yup.string(),
    password: Yup.string(),
  })

  return (
    <div className={classNames(s.container, className)}>
      <Logo isOpen className={s.logo} />
      <div className={s.formContainer}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={CreateListSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log('submit')
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form className={s.form} onSubmit={handleSubmit}>
              <Field name="email">
                {({ field, form, meta }: FieldProps) => (
                  <Input
                    className={s.field}
                    type="email"
                    field={field}
                    form={form}
                    meta={meta}
                    placeholder="Email"
                    label="Email"
                  />
                )}
              </Field>
              <Field name="password">
                {({ field, form, meta }: FieldProps) => (
                  <Input
                    className={s.lastField}
                    type="password"
                    field={field}
                    form={form}
                    meta={meta}
                    placeholder="Password"
                    label="Password"
                  />
                )}
              </Field>
              {isSignIn && (
                <Link href="#">
                  <a className={s.link}>Forgot your password?</a>
                </Link>
              )}
              <div className={s.buttonContainer}>
                <Button
                  className={s.button}
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  <span className={s.textSignIn}>
                    Sign {isSignIn ? <span> In </span> : <span> Up </span>}
                  </span>
                </Button>
                <div>
                  {isSignIn ? (
                    <span className={s.text}>Need an account? </span>
                  ) : (
                    <span className={s.text}>Already have an account? </span>
                  )}
                  <button
                    className={s.textBlue}
                    type="button"
                    onClick={() => setIsSignIn(!isSignIn)}
                  >
                    Sign
                    {isSignIn ? <span> Up </span> : <span> In </span>}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';
  .container {
    background: var(--white);
    max-width: 475px;
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    padding: 54px 35px 43px;
  }
  .logo {
    justify-content: center;
    margin-bottom: 54px;
  }
  .formContainer {
    max-width: 406px;
    margin: auto;
  }
  .form {
    width: 100%;
  }
  .field {
    margin-bottom: 18px;
  }
  .lastField {
    margin-bottom: 9px;
  }
  .link {
    cursor: pointer;
    text-decoration: none;
    color: var(--blue);
    line-height: 17px;
    font-weight: 500;
  }
  .buttonContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 43px;
  }
  .button {
    width: 211px;
    height: 42px;
    padding: 11px;
    margin-bottom: 29px;
  }
  .textSignIn {
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
  }
  .text {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  }
  .textBlue {
    cursor: pointer;
    border: none;
    background: none;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: var(--blue);
  }
`
export default Auth
