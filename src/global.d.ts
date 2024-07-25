declare module '*.tmpl.js' {
  import { TProps } from 'types';

  // eslint-disable-next-line
  export default function(context: TProps): string;
}

declare module './plugins/precompileTemplatesPlugin' {
  const precompileTemplatesPlugin: unknown;
  export default precompileTemplatesPlugin;
}
