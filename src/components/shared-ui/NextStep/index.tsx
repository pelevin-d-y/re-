import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useTemplates } from 'src/components/context/TemplatesContext'
import parseMessage from 'src/helpers/utils/parse-message'
import { getName } from 'src/helpers/utils/get-name'
import Img from '../Img'
import Typography from '../Typography'

type Props = {
  className?: string
  data?: RecommendationUser | FormattedContact
}

const NextStep: React.FC<Props> = ({ className, data }) => {
  const { getTemplate } = useTemplates()
  const getText = () => {
    const template = getTemplate(data)
    const name = data && getName(data)
    if (data && template && name) {
      return parseMessage(template.description, name)
    }
    return ''

    // const defaultNextStep = templatesState.defaultTemplate?.description || ''
    // if (data && 'message_template_description' in data) {
    //   return parseMessage(data.message_template_description, data.name)
    // }

    // if (data && 'message_template_id' in data) {
    //   const templateString =
    //     templatesState.data.find(
    //       (item) => item.message_template_id === data.message_template_id
    //     )?.description || defaultNextStep

    //   const name = getName(data)
    //   return parseMessage(templateString, name)
    // }

    // return defaultNextStep
  }
  return (
    <Typography
      className={classNames(className, s.container)}
      styleVariant="body4"
    >
      <Img className={s.icon} alt="logo" img="logo-user-info.svg" />
      {getText()}
    </Typography>
  )
}

const s = css`
  .container {
    position: relative;

    width: 100%;
    padding: 10px 10px 10px 16px;

    background: var(--primary2);
    border-radius: 6px;
  }

  .icon {
    position: absolute;
    top: -3px;
    right: -3px;
    width: 17px;
    height: 18px;
  }
`

export default NextStep
