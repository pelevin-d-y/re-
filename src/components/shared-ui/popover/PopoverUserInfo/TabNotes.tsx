import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Button from 'src/components/shared-ui/Button'
import { Formik, Field } from 'formik'
import { post } from 'src/api'
import { useClient } from 'src/components/context/ClientContext'

type Props = {
  className?: string
  data?: FormattedContact
  updateData: (val: string, type: 'name' | 'Notes') => Promise<void>
}

const TabNotes: React.FC<Props> = ({ className, data, updateData }) => (
  <div className={classNames(className, s.container)}>
    <Formik
      initialValues={{
        notes: data?.Notes ? data?.Notes : '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        updateData(values.notes, 'Notes').then(() => setSubmitting(false))
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
    border: 1px solid #dddddd;
    width: 100%;
    height: 291px;
    resize: none;
    padding: 13px 18px 18px 14px;
  }

  .button {
    display: block;
    max-width: 247px;
    width: 100%;
    margin: 22px auto 0 auto;
  }
`

export default TabNotes
