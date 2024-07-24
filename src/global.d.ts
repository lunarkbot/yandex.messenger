declare module '*.tmpl.js' {
  import { ITemplate } from 'types';

  // eslint-disable-next-line
  export default function(context: ITemplate): string;
}

declare module './plugins/precompileTemplatesPlugin' {
  const precompileTemplatesPlugin: unknown;
  export default precompileTemplatesPlugin;
}
