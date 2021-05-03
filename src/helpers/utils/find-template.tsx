const findTemplate = (
  templates: Template[],
  templateName: string | undefined
): Template | undefined =>
  templates.find(
    (templateItem) =>
      templateItem.Template?.toLocaleLowerCase() ===
      templateName?.toLocaleLowerCase()
  )

export default findTemplate
