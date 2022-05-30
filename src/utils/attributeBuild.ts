export function buildAttributes(attrs: any) {
  const result: any = {}
  attrs.attrs.forEach((t: any) => {
    result[t.key] = t.value || t.defaultValue || (t.valueType === 'number' ? 0 : '未设置')
  })
  attrs.panels.forEach((p: any) => {
    result[p.key] = {}
    p.attrs.forEach((t: any) => {
      result[p.key][t.key] = (t.prefix || '') +
        (t.value || t.defaultValue || (t.valueType === 'number' ? 0 : '未设置')) + (t.suffix || '')
    })
  })
  return result
}
