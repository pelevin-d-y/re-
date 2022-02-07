import parseMessage from 'src/helpers/utils/parse-message'
import { getName } from 'src/helpers/utils/get-name'
import sample from 'lodash/sample'
import testTemplates from 'src/testTemplates.json'

export const getNextStep = (
  data?: FormattedContact | RecommendationUser,
  name?: string
): string => {
  if (data) {
    if (
      'message_template_description' in data &&
      data?.message_template_description
    ) {
      return parseMessage(data.message_template_description, data.name, name)
    }

    return parseMessage(
      (sample(testTemplates) as Template).Action,
      getName(data),
      name
    )
  }
  return 'Next step is not found'
}
