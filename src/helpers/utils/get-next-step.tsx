import parseMessage from 'src/helpers/utils/parse-message'
import { getName } from 'src/helpers/utils/get-name'

export const getNextStep = (
  data?: FormattedContact | RecommendationUser | ContactMutable
): string => {
  if (data) {
    if (
      'message_template_description' in data &&
      data?.message_template_description
    ) {
      return parseMessage(data.message_template_description, data.name)
    }
    if ('templateData' in data && data.templateData) {
      return parseMessage(data.templateData.subject, getName(data))
    }
  }
  return ''
}
