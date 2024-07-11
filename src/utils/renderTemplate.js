/**
 * Render a precompiled template with the given context.
 * @param precompiledFunction {function} - precompiled template function
 * @param context {object} - context for the template
 * @returns {string} - rendered template
 */
export default function renderTemplate(precompiledFunction, context) {
  return precompiledFunction(context);
}
