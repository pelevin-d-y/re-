import React, { useState } from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Logo from 'src/components/shared-ui/Logo'
import { Field, FieldProps, Formik } from 'formik'
import Input from 'src/components/shared-ui/Input'
import Link from 'next/link'
import Button from 'src/components/shared-ui/Button'

type Props = {
  className?: string
}

const Auth: React.FC<Props> = ({ className }) => {
  const [isSignIn, setIsSignIn] = useState(true)
  return (
    <div className={classNames(s.container, className)}>
      <Logo isOpen className={s.logo} />
      <div className={s.formContainer}>
        <Formik
          initialValues={{}}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false)
            }, 1000)
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
            </form>
          )}
        </Formik>
        {isSignIn && (
          <Link href="#">
            <a className={s.link}>Forgot your password?</a>
          </Link>
        )}
      </div>
      <div className={s.buttonContainer}>
        <Button className={s.button} variant="contained">
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
            {isSignIn ? <span> In </span> : <span> Up </span>}
          </button>
        </div>
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
    margin-bottom: 43px;
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
    color: #1966ff;
    line-height: 17px;
    font-weight: 500;
  }
  .buttonContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    color: #1966ff;
  }
`
export default Auth
