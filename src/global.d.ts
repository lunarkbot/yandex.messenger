declare module '*.tmpl.js' {
  import { Template } from 'types';
  export default function(context: Template): string;
}

declare module './plugins/precompileTemplatesPlugin' {
  const precompileTemplatesPlugin: unknown;
  export default precompileTemplatesPlugin;
}
