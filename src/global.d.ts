declare const __DEV__: boolean

declare module '*.vue' {
  const component: any
  export default component
}

declare module chrome {
  const chrome: any
  const extension: any
  export default extension
}