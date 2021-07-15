import React from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

import { Formik } from 'formik'
import CloseModal from '../../Close'
import ModalBase from '../ModalBase'

const EmailModal: React.FC = () => {
  const { dispatch, state } = usePopup()
  const { addContactModalIsOpen } = state

  const closeHandler = () => {
    dispatch({ type: 'TOGGLE_ADD_CONTACT_POPUP' })
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={addContactModalIsOpen}
      // isOpen={true}
      onClose={closeHandler}
    >
      <CloseModal handler={closeHandler} className={s.close} />
      <div className={s.header}>
        <div className={s.title}>Create Contact</div>
        <div className={s.description}>Enter your contact’s info</div>
        <SvgIcon className={s.icon} icon="avatar-placeholder.svg?include" />
      </div>
      <div className={s.content}>
        <Formik
          initialValues={{ email: '', password: '' }}
          // validate={(values) => {
          //   const errors = {}
          //   if (!values.email) {
          //     errors.email = 'Required'
          //   } else if (
          //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          //   ) {
          //     errors.email = 'Invalid email address'
          //   }
          //   return errors
          // }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false)
            }, 400)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </ModalBase>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';
  .container {
    max-width: 475px;
    padding: 30px 33px;
  }

  .icon {
    display: block;
    width: 84px;
    height: 84px;
    padding: 19px 27px 26px;
    margin-right: auto;
    margin-left: auto;

    border-radius: 50%;
    background: var(--lightBlue);

    svg {
      width: 30px;
      height: 39px;
    }
  }

  .header {
    margin-bottom: 26px;
  }

  .close {
    position: absolute;
    top: 23px;
    right: 23px;
  }

  .title {
    margin-bottom: 14px;

    font-size: 18px;
    line-height: 21px;
    font-weight: var(--bold);
  }

  .description {
    margin-bottom: 47px;

    font-size: 16px;
    line-height: 19px;
  }
`

export default EmailModal
