import path from 'path';


/**
 * Resolve relative path for current angularjs application
 *
 * @param {...string} [paths] paths to resolve (see Node.js api : path.resolve)
 * @returns {string}
 *
 * @example
 * ```js
     resolveNgPath(__dirname, 'templates/template.html');

     resolveNgPath(__dirname, 'templates', 'template.html');
 * ```
 */
function resolveNgPath() {
    return path.relative('.', path.resolve.apply(null, [].slice.call(arguments)));
}

export { resolveNgPath };
