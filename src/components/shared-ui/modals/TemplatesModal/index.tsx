import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useTemplates } from 'src/components/context/TemplatesContext'
import { usePopup } from 'src/components/context/PopupContext'
import CloseModal from 'src/components/shared-ui/Close'
import PreviousPage from 'src/components/shared-ui/PreviousPage'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Button from 'src/components/shared-ui/Button'
import ModalBase from '../ModalBase'
import HtmlEditorModal from '../ModalHtmlEditor'

type Props = {
  className?: string
}

const ModalTemplates: React.FC<Props> = ({ className }) => {
  const { state: popupState, dispatch: modalDispatch } = usePopup()
  const { templatesModalIsOpen, data } = popupState
  const {
    state: { data: templatesData },
  } = useTemplates()

  const [currentTemplate, setCurrentTemplate] = useState<Template>()

  useEffect(() => {
    setCurrentTemplate(data.templateData)
  }, [data.templateData])

  const closeHandler = () => {
    modalDispatch({ type: 'TOGGLE_TEMPLATES_POPUP' })
  }

  const templateHandler = (template: Template) => {
    setCurrentTemplate(template)
  }

  const selectTemplate = () => {
    modalDispatch({
      type: 'UPDATE_POPUP_DATA',
      payload: { ...data, templateData: currentTemplate },
    })
    closeHandler()
  }

  return (
    <ModalBase
      className={classNames(className, s.container)}
      isOpen={templatesModalIsOpen}
      onClose={closeHandler}
    >
      <div className={s.navigation}>
        <PreviousPage handler={closeHandler} text="Back to compose" />
        <CloseModal handler={closeHandler} />
      </div>
      <div className={s.title}>
        {' '}
        <SvgIcon
          className={s.titleIcon}
          icon={require('public/svg/templates.svg?include')}
        />
        Choose a Template
      </div>
      <div className={s.content}>
        <div className={s.sidebar}>
          <ul className={s.templatesList}>
            {templatesData.map((template) =>
              template.Template ? (
                <li key={template.Message}>
                  <button
                    onClick={() => templateHandler(template)}
                    className={s.templateItemButton}
                    type="button"
                  >
                    {template.Template}
                  </button>
                </li>
              ) : null
            )}
          </ul>
        </div>
        {currentTemplate && (
          <div className={s.rightContent}>
            <HtmlEditorModal
              className={s.editor}
              data={{ ...data, templateData: currentTemplate }}
              toParse={false}
            />
            <div className={s.actions}>
              <Button className={s.dublicate} variant="outlined">
                Duplicate
              </Button>
              <Button
                className={s.select}
                handler={selectTemplate}
                variant="contained"
              >
                Select
              </Button>
            </div>
          </div>
        )}
      </div>
    </ModalBase>
  )
}

const s = css`
  .container {
    max-width: 900px;
    max-height: 90vh;
    padding: 23px;
    overflow: visible;
    display: grid;
    grid-template-rows: auto auto 1fr;
  }

  .navigation {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .title {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: 30px;

    font-size: 28px;
    line-height: 32px;
    font-weight: var(--bold);
  }

  .titleIcon {
    width: 30px;
    height: 30px;
    margin-right: 14px;
    color: var(--blue);
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 20px;
    overflow: auto;
    height: 100%;
    width: 100%;
  }

  .sidebar {
    overflow: auto;
    height: 100%;
    max-width: 250px;
  }

  .templatesList {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .templateItemButton {
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: left;

    cursor: pointer;
    background: none;
    border: none;

    &:hover {
      background: var(--lightBlue);
    }
  }

  .template {
    width: 100%;
    min-height: 200px;
    padding: 16px;

    border: 1px solid #dddddd;
    border-radius: 4px;
  }

  .rightContent {
    display: flex;
    flex-flow: column nowrap;
  }

  .editor {
    margin-bottom: 20px;
  }

  .actions {
    margin-top: auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  }

  .dublicate {
    max-width: 107px;
    width: 100%;
  }

  .select {
    max-width: 95px;
    width: 100%;
    margin-left: 10px;
  }
`

export default ModalTemplates
