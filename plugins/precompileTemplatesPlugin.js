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
function precompileTemplate(template) {
  // eslint-disable-next-line
  return template
    .replace(/\{\{\{\s*(\w+)\s*\}\}\}/g, '<div data-component="$1">${context.$1}</div>')
    .replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
      return `\${Array.isArray(context.${key}) ? context.${key}.join('') : context.${key}}`;
    });
}

export default function precompileTemplatesPlugin() {
  return {
    name: 'precompile-templates',
    // eslint-disable-next-line
    transform(src, id) {
      if (id.endsWith('.tmpl.js')) {
        const fullPath = path.resolve(id);
        const template = readFileSync(fullPath, { encoding: 'utf-8' });
        const precompiledTemplate = precompileTemplate(template);

        return {
          code: precompiledTemplate,
          map: null,
        };
      }
    },
  };
}
