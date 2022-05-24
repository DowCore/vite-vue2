export interface Column {
  key: string
  attributes: ColumnAttribute
  isSelected?: Boolean
  component?: ComponentInfo
}
export interface ComponentInfo {
  name: string
  path: string
  component: any
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
