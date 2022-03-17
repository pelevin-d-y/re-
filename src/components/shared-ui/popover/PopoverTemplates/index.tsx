import React, { useState } from 'react'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { css } from 'astroturf'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { useTemplates } from 'src/components/context/TemplatesContext'
import { usePopup } from 'src/components/context/PopupContext'
import classNames from 'classnames'

type Props = {
  className?: string
}

const PopoverTemplates: React.FC<Props> = () => {
  const { state: popupState, dispatch: modalDispatch } = usePopup()
  const { data } = popupState
  const [isOpen, setIsOpen] = useState(false)

  const {
    state: { data: templatesData },
  } = useTemplates()

  const selectTemplate = (template: Template) => {
    console.log('template', template)
    console.log('🚀 ~ file: index.tsx ~ line 17 ~ data', data)
    if (data) {
      modalDispatch({
        type: 'UPDATE_POPUP_DATA',
        payload: {
          ...data,
          templateData: template,
        },
      })
    }
  }

  return (
    <Popover
      position="right bottom"
      showPopupEvent="click"
      open={isOpen}
      triggerElement={(open) => (
        <button
          className={classNames(s.button, open && s.active)}
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <SvgIcon className={s.icon} icon="templates.svg" />
        </button>
      )}
      popupContent={
        <CardContainer className={s.popup}>
          <div className={s.title}>Snippets</div>
          <ul className={s.templatesList}>
            {templatesData.map((template) =>
              template ? (
                <li key={template.info.name}>
                  <button
                    onClick={() => selectTemplate(template)}
                    className={s.templateItemButton}
                    type="button"
                  >
                    {template.info.name}
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

    background: var(--shades2);
  }

  .button {
    background: none;
    border: none;
    color: #737373;
    cursor: pointer;

    &:hover {
      color: var(--primary1);
    }
  }

  .active {
    color: var(--primary1);
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
      background: var(--primary2);
    }
  }
`

export default PopoverTemplates
