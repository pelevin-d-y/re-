import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import { useClient } from 'src/components/context/ClientContext'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import { Field, FieldProps, Formik } from 'formik'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import CloseModal from '../../Close'
import ModalBase from '../ModalBase'
import Input from '../../Input'
import AvatarList from '../../AvatarsList'
import Button from '../../Button'
import { LoaderComponent } from '../../Loader'

type Props = {
  className?: string
}

const CreateListSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
})

const ModalPinnedContacts: React.FC<Props> = ({ className }) => {
  const { state, dispatch: popupDispatch } = usePopup()
  const { state: clientState } = useClient()
  const { createPlaylist } = usePlaylists()
  const router = useRouter()

  const closeHandler = () => {
    popupDispatch({ type: 'TOGGLE_PINNED_USERS_POPUP' })
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={state.modalPinnedIsOpen}
      onClose={closeHandler}
    >
      <CloseModal handler={closeHandler} className={s.close} />
      <div className={s.content}>
        <div className={s.title}>Add these Contacts</div>
        <div className={s.description}>Manage these contacts in a list</div>
        <ReactTabs>
          <TabList className={s.tabs}>
            <Tab className={s.tab}>Create new list</Tab>
            <Tab className={s.tab}>Add to existing list</Tab>
          </TabList>
          <div className={s.avatars}>
            {clientState.data?.contacts && (
              <AvatarList
                users={clientState.data.contacts}
                avatarWidth={59}
                avatarHeight={59}
              />
            )}
          </div>
          <TabPanel className={s.tabContent}>
            <Formik
              initialValues={{ name: '', description: '' }}
              validationSchema={CreateListSchema}
              onSubmit={(values, { setSubmitting }) => {
                createPlaylist({
                  title: values.name,
                  description: values.description,
                  contacts: state?.dataMulti || [],
                })
                  .then((res) => {
                    setSubmitting(false)
                    router.push(`/list?id=${res[0].id}`)
                  })
                  .catch((err) => {
                    setSubmitting(false)
                    console.log('err', err)
                  })
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="name">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        className={s.input}
                        type="text"
                        field={field}
                        form={form}
                        meta={meta}
                        label="Name"
                      />
                    )}
                  </Field>
                  <Field name="description">
                    {({ field, form, meta }: FieldProps) => (
                      <Input
                        className={s.input}
                        type="text"
                        field={field}
                        form={form}
                        meta={meta}
                        label="Description"
                      />
                    )}
                  </Field>
                  <div className={s.actions}>
                    <Button
                      className={s.cancel}
                      variant="outlined"
                      handler={closeHandler}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={s.createList}
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <LoaderComponent /> : 'Create'}
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </TabPanel>
          <TabPanel>aaaa</TabPanel>
        </ReactTabs>
      </div>
    </ModalBase>
  )
}

const s = css`
  .container {
    max-width: 475px;
    padding: 30px 33px 49px;
    min-height: 462px;
  }

  .close {
    position: absolute;
    right: 23px;
    top: 23px;
  }

  .title {
    margin-bottom: 14px;

    font-weight: var(--semibold);
    font-size: 18px;
    line-height: 21px;
  }

  .description {
    margin-bottom: 15px;

    font-size: 16px;
    line-height: 19px;
  }

  .tabs {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 35px;
  }

  .tab {
    width: 50%;
    padding: 16px;
    cursor: pointer;

    text-align: center;
    font-size: 16px;
    line-height: 19px;
    color: #cbcbcb;
  }

  .tab[aria-selected='true'] {
    color: var(--blue);
    border-bottom: 4px solid var(--blue);
  }

  .avatars {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    overflow: auto;

    width: 100%;
    margin-bottom: 28px;
  }

  .input {
    margin-bottom: 21px;
  }

  .actions {
    display: flex;
    flex-flow: row wrap;
    justify-content: right;

    margin-top: 29px;
  }

  .cancel {
    width: 87px;
  }

  .createList {
    width: 102px;
    margin-left: 7px;
  }
`

export default ModalPinnedContacts
