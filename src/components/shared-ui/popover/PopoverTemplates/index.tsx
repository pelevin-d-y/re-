import React from 'react'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { css } from 'astroturf'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { useTemplates } from 'src/components/context/TemplatesContext'
import { usePopup } from 'src/components/context/PopupContext'
import { useClient } from 'src/components/context/ClientContext'
import { findIndex } from 'lodash'

type Props = {
  className?: string
}

const PopoverTemplates: React.FC<Props> = () => {
  const { state: popupState, dispatch: modalDispatch } = usePopup()
  const { data } = popupState

  const {
    state: { data: templatesData },
  } = useTemplates()
  const { state: clientState, updateUserData } = useClient()

  const selectTemplate = (template: Template) => {
    modalDispatch({
      type: 'UPDATE_POPUP_DATA',
      payload: { ...data, templateData: template, template: template.Template },
    })

    const contacts = clientState?.contacts && [...clientState.contacts] // new array
    const clientIndex = findIndex(clientState?.contacts, {
      address: data.address,
    })

    contacts?.splice(clientIndex, 1, {
      ...data,
      template: template.Template,
      templateData: template,
    })

    updateUserData({ ...clientState, contacts })
  }

  return (
    <Popover
      position="right bottom"
      showPopupEvent="click"
      triggerElement={
        <button className={s.button} type="button">
          <SvgIcon className={s.icon} icon="templates.svg" />
        </button>
      }
      popupContent={
        <CardContainer className={s.popup}>
          <div className={s.title}>Templates</div>
          <ul className={s.templatesList}>
            {templatesData.map((template) =>
              template.Template ? (
                <li key={template.Message}>
                  <button
                    onClick={() => selectTemplate(template)}
                    className={s.templateItemButton}
                    type="button"
                  >
                    {template.Template}
                  </button>
                </li>
              ) : null
            )}
          </ul>
        </CardContainer>
      }
    />
  )
}

const s = css`
  .popup {
    max-height: 300px;
    overflow: auto;

    padding: 20px;

    background: var(--white);
  }

  .button {
    background: none;
    border: none;
    color: #737373;
    cursor: pointer;
  }

  .icon {
    width: 24px;
    height: 24px;
  }

  .title {
    margin-bottom: 16px;

    font-size: 16px;
    line-height: 19px;
    font-weight: var(--bold);
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
`

export default PopoverTemplates
