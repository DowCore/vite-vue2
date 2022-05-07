import { omit } from 'lodash'
export interface Column {
  key: string
  attributes: ColumnAttribute
  isSelected?: Boolean
  component?: string
}
export interface RowAttribute {
  height: number
  display: string
  marginTop: number
  marginLeft: number
  marginRight: number
  marginBottom: number
  paddingTop: number
  paddingLeft: number
  paddingRight: number
  paddingBottom: number
  space: string
  backgroundColor: string
}
export interface Row {
  key: string
  attributes: RowAttribute
  columns: Array<Column>
  isSelected?: Boolean
  fixed: number
}
const maps = new Map([
  ['none', '0px'],
  ['md', '16px'],
  ['lg', '24px'],
  ['sm', '8px'],
])
const attrsMaps = [
  { key: 'height', prefix: null, suffix: 'px' },
  { key: 'marginTop', prefix: null, suffix: 'px' },
  { key: 'marginLeft', prefix: null, suffix: 'px' },
  { key: 'marginRight', prefix: null, suffix: 'px' },
  { key: 'marginBottom', prefix: null, suffix: 'px' },
  { key: 'paddingTop', prefix: null, suffix: 'px' },
  { key: 'paddingLeft', prefix: null, suffix: 'px' },
  { key: 'paddingRight', prefix: null, suffix: 'px' },
  { key: 'paddingBottom', prefix: null, suffix: 'px' },
]
export function toRowStyle(row: Row) {
  let style: any = { ...row.attributes }
  style = omit(style, 'space')
  if (row.attributes.display === 'grid') {
    style.columnGap = maps.get(row.attributes.space)
    const gap = parseInt(maps.get(row.attributes.space) as string)
    style['grid-template-columns'] = `repeat(${row.columns.length},calc(${
      100 / row.columns.length
    }% - ${(gap * (row.columns.length - 1)) / row.columns.length}px))`
  }
  for (const key in style) {
    const attr = attrsMaps.find((t) => {
      return t.key === key
    })
    if (attr) {
      style[key] = (attr.prefix ?? '') + style[key] + attr.suffix
    }
  }
  return style
}
const spaceXMap = new Map([
  ['md', 'space-x-md'],
  ['sm', 'space-x-sm'],
  ['lg', 'space-x-lg'],
])
export function toRowClass(row: Row) {
  let _class = ''
  if (row.attributes.display === 'flex') {
    _class += spaceXMap.get(row.attributes.space)
  }
  if (row.isSelected) {
    _class += ' row-active'
  }
  return _class
}

export interface ColumnAttribute {
  distribution: string
  width?: number
  marginTop: number
  marginLeft: number
  marginRight: number
  marginBottom: number
  paddingTop: number
  paddingLeft: number
  paddingRight: number
  paddingBottom: number
  backgroundColor: string
}
export function toColumnStyle(row: Row, col: Column) {
  let style: any = { ...col.attributes }
  style = omit(style, 'distribution')
  if (row.attributes.display !== 'flex') {
    style = omit(style, 'width')
  }
  else {
    switch (col.attributes.distribution) {
      case 'equal':
        style = omit(style, 'width')
        break
      case 'scale':
        style = omit(style, 'width')
        style.flex = col.attributes.width
        break
    }
  }
  if (col.isSelected) {
    style.border = '1px solid #ff9900'
  }
  for (const key in style) {
    const attr = attrsMaps.find((t) => {
      return t.key === key
    })
    if (attr) {
      style[key] = (attr.prefix ?? '') + style[key] + attr.suffix
    }
  }
  return style
}
