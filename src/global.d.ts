declare module '*.tmpl.js' {
  const template: any;
  export default template;
}

declare module './plugins/precompileTemplatesPlugin' {
  const precompileTemplatesPlugin: object;
  export default precompileTemplatesPlugin;
}
