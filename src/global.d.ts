declare module '*.tmpl.js' {
  // eslint-disable-next-line
  const template: any;
  export default template;
}

declare module './plugins/precompileTemplatesPlugin' {
  const precompileTemplatesPlugin: any;
  export default precompileTemplatesPlugin;
}
