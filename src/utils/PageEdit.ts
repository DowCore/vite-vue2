import { omit } from 'lodash'
import type { Column, Row } from '@/types/PageEdit'
const maps = new Map([
  ['none', '0px'],
  ['md', '16px'],
  ['lg', '24px'],
  ['sm', '8px'],
])
const attrsMaps = [
  { key: 'height', prefix: null, suffix: 'px' },
  { key: 'width', prefix: null, suffix: 'px' },
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
    if (
      row.columns.every((t) => {
        return t.attributes.distribution === 'equal'
      })
    ) {
      style.columnGap = maps.get(row.attributes.space)
      const gap = parseInt(maps.get(row.attributes.space) as string)
      style['grid-template-columns'] = `repeat(${row.columns.length},calc(${
        100 / row.columns.length
      }% - ${(gap * (row.columns.length - 1)) / row.columns.length}px))`
    }
    else {
      let templates = ''
      row.columns.forEach((t) => {
        switch (t.attributes.distribution) {
          case 'equal':
            templates += '1fr '
            break
          case 'fixed':
            templates += `${t.attributes.width}px `
            break
          case 'scale':
            templates += `${t.attributes.width}fr `
            break
          default:
            break
        }
      })
      style['grid-template-columns'] = templates
    }
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
        style.flex = 1
        break
      case 'scale':
        style = omit(style, 'width')
        style.flex = col.attributes.width
        break
      case 'fixed':
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
