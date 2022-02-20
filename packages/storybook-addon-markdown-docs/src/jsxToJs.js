import { transformAsync } from '@babel/core';

/**
 * Turns the JSX generated by MDX to JS.
 *
 * @param {string} docsJsx
 * @param {string} filename
 * @returns {Promise<string>}
 */
async function jsxToJs(docsJsx, filename) {
  const result = await transformAsync(docsJsx, {
    filename,
    sourceMaps: true,
    babelrc: false,
    configFile: false,
    plugins: [
      '@babel/plugin-syntax-import-meta',
      ['@babel/plugin-transform-react-jsx', { useSpread: true }],
    ],
  });
  if (!result || typeof result.code !== 'string') {
    throw new Error(`Something went wrong when compiling ${filename}`);
  }
  return result.code;
}

export { jsxToJs };
