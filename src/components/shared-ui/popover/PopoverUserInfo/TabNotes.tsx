import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Button from 'src/components/shared-ui/Button'
import { Formik, Field } from 'formik'

type Props = {
  className?: string
  data: UserData
}

const TabNotes: React.FC<Props> = ({ className, data }) => (
  <div className={classNames(className, s.container)}>
    <Formik
      initialValues={{
        notes: data?.Notes ? data?.Notes : '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values?.notes)
        setTimeout(() => {
          setSubmitting(false)
        }, 1000)
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form className={s.form} onSubmit={handleSubmit}>
          <Field className={s.textarea} name="notes" as="textarea" />
          <Button
            className={s.button}
            type="submit"
            variant="outlined"
            disabled={isSubmitting}
          >
            Save
          </Button>
        </form>
      )}
    </Formik>
  </div>
)

const s = css`
  .container {
    padding: 16px 16px 34px 16px;
  }

  .textarea {
    border-radius: 4px;
    border: 1px solid #DDDDDD;
    width: 100%;
    height: 291px;
    resize: none;
    padding: 13px 18px 18px 14px
  }

  .button {
    display: block;
    max-width: 247px;
    width: 100%;
    margin: 22px auto 0 auto;
  }
`

export default TabNotes
