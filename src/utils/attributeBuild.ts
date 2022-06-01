export function buildAttributes(attrs: any) {
  const result: any = {}
  attrs.attrs.forEach((t: any) => {
    if (t.value || t.defaultValue) {
      result[t.key] = t.value || t.defaultValue
    }
  })
  attrs.styles &&
    attrs.styles.forEach((p: any) => {
      result[p.key] = {}
      p.attrs.forEach((t: any) => {
        if (t.value || t.defaultValue) {
          result[p.key][t.key] =
            (t.prefix || '') + (t.value || t.defaultValue) + (t.suffix || '')
        }
      })
    })
  if (attrs.columnTemplate) {
    result.columnTemplate = {}
    attrs.columnTemplate.attrs.forEach((t: any) => {
      if (t.value || t.defaultValue) {
        result.columnTemplate[t.key] =
          (t.prefix || '') + (t.value || t.defaultValue) + (t.suffix || '')
      }
    })
  }

  return result
}
