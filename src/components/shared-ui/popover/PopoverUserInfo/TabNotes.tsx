import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Button from 'src/components/shared-ui/Button'
import { Formik, Field } from 'formik'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'

type Props = {
  className?: string
  mutableData?: ContactMutable[]
  updateData: UpdateMutableData
}

const TabNotes: React.FC<Props> = ({ className, mutableData, updateData }) => {
  const primaryNote =
    mutableData?.find(
      (item) => item.type === 'Notes' && item.meta.type === 'primary'
    ) || mutableData?.find((item) => item.type === 'Notes')
  return (
    <div className={classNames(className, s.container)}>
      <Formik
        initialValues={{
          notes: primaryNote?.data || '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (primaryNote) {
            updateData(
              [
                {
                  ...primaryNote,
                  data: values.notes,
                  meta: { ...primaryNote?.meta, type: 'primary' },
                },
              ],
              [{ ...primaryNote, review: 2 }]
            ).then(() => setSubmitting(false))
          } else {
            updateData([
              {
                data: values.notes,
                review: 1,
                type: 'Notes',
                meta: { type: 'primary' },
              },
            ]).then(() => setSubmitting(false))
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form className={s.form} onSubmit={handleSubmit}>
            <Field
              placeholder="Include a note for this contact..."
              className={s.textarea}
              name="notes"
              as="textarea"
            />
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
}

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
