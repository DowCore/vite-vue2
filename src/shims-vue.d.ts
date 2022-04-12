declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module '*.scss' {
  const classes: Readonly<Record<string, string>>
  export default classes
}
