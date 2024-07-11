import { readFileSync } from 'fs';
import path from 'path';

/*
* The idea for the first sprint is as follows: templates are stored in a variable in tmpl.js files (there are
* no problems with it when building, and it is highlighted when working in the IDE for HTML). Then at the
* precompilation stage in Vite, we convert the template into a function that takes the context and returns
* the finished markup. As a result, it will be possible to reuse templates as the application runs without
* worrying about performance.
*  */

/**
 * Precompile a template string into a function that takes a context and returns the rendered markup.
 * @param template {string} - template string
 * @param fullPath {string} - full path to the template file
 * @returns {object} - precompiled template function
 */
function precompileTemplate(template, fullPath) {
  const templateString = template.match(/`([^`]*)`/);
  if (!templateString) throw Error(`Template string not found in ${fullPath}`);

  /* eslint-disable */
  const functionBody = `return \`${templateString[1].replace(/\{\{(\w+)\}\}/g, '${context.$1}')}\``;
  return new Function('context', functionBody);
  /* eslint-enable */
}

export default function precompileTemplatesPlugin() {
  return {
    name: 'precompile-templates',
    // eslint-disable-next-line
    transform(src, id) {
      if (id.endsWith('.tmpl.js')) {
        const fullPath = path.resolve(id);
        const template = readFileSync(fullPath, { encoding: 'utf-8' });
        const precompiledTemplate = precompileTemplate(template, fullPath);
        const precompiledString = precompiledTemplate.toString();

        return {
          code: `export default ${precompiledString}`,
          map: null,
        };
      }
    },
  };
}
