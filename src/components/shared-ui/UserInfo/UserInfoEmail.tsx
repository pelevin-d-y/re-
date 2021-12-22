import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import EasyEdit from 'react-easy-edit'
import { post } from 'src/api'
import * as yup from 'yup'
import EmailPopover from './EmailPopover'

type Props = {
  className?: string
  emails: string[]
  userId?: string
}

type ExtendedEmail = {
  email: string
  id: string
  status: string
}

const schema = yup.string().email()

const UserInfoEmail: React.FC<Props> = ({ className, emails, userId }) => {
  const extendedEmails = emails.map((item, index) => ({
    email: item,
    id: item,
    status: index === 0 ? 'Primary' : 'Set Primary',
  }))

  const [primaryEmail, setPrimaryEmail] = useState(extendedEmails[0])

  const setEmail = (email: ExtendedEmail) => {
    setPrimaryEmail(email)
  }

  // const onSaveEmail = async (value: string) => {
  //   try {
  //     await schema.validate(value)
  //     await post.postContactsMutable({
  //       [userId]: [
  //         {
  //           type: 'email',
  //           data: value,
  //           review: 1,
  //         },
  //       ],
  //     })
  //   } catch (err) {
  //     // eslint-disable-next-line no-console
  //     console.log('err', err)
  //   }
  // }

  return (
    <div className={classNames(className, s.container)}>
      <EmailPopover data={extendedEmails} setEmail={setEmail} />
      {/* <EasyEdit
        type="text"
        value={primaryEmail.email}
        hideCancelButton
        hideSaveButton
        saveOnBlur
        onSave={(val: string) => {
          onSaveEmail(val)
        }}
      /> */}
      <div>{primaryEmail.email}</div>
    </div>
  )
}

const s = css`
  .container {
  }
`

export default UserInfoEmail
