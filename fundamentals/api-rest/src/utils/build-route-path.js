
/**
 * Retorna os parametros.
 * 
 * @param {*} path 
 * @return String
 */
export function buildRoutePath(path) {
  /**
   * Espresão Regular:
   * @description É uma das forma de encontrar textos que seguem um padrão/formato dentro de um texto que é muito maior.
   */
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
  
  const pathRegex = new RegExp(`^${pathWithParams}`);
  
  return pathRegex
}