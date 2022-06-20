export interface ApiParam {
  name: string
  value: string | number
}
export interface Api {
  name: string
  params: Array<ApiParam>
  alias?: string
}
