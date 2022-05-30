export interface ApiParam{
  name: string
  value: string|number
  alias?: string
}
export interface Api{
  name: string
  params: Array<ApiParam>
}
