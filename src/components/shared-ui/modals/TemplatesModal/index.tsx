import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useTemplates } from 'src/components/context/TemplatesContext'
import { usePopup } from 'src/components/context/PopupContext'
import CloseModal from 'src/components/shared-ui/Close'
import PreviousPage from 'src/components/shared-ui/PreviousPage'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import parseMessage from 'src/helpers/utils/parse-message'
import ModalBase from '../ModalBase'

type Props = {
  className?: string
}

const ModalTemplates: React.FC<Props> = ({ className }) => {
  const { state: popupState, dispatch: modalDispatch } = usePopup()
  const { templatesModalIsOpen } = popupState
  const {
    state: { data: templatesData },
  } = useTemplates()

  const [currentTemplate, setCurrentTemplate] = useState<Template>()

  const closeHandler = () => {
    modalDispatch({ type: 'TOGGLE_TEMPLATES_POPUP' })
  }

  const templateHandler = (template: Template) => {
    setCurrentTemplate(template)
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
          <div
            className={s.template}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: parseMessage(
                currentTemplate.Message,
                '«Contact»',
                '«Client»'
              ),
            }}
          />
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
    overflow: auto;
  }

  .sidebar {
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

  .content {
    display: flex;
    flex-flow: row nowrap;
  }

  .template {
    width: 100%;
    min-height: 200px;
    padding: 16px;

    border: 1px solid #dddddd;
    border-radius: 4px;
  }
`

export default ModalTemplates
