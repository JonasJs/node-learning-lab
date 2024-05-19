
/**
 * Retorna os parametros.
 * 
 * @param {*} path
 * @example '/users/:id' '/users/:id?search=jonas' '/users'
 * @return new RegExp
 */
export function buildRoutePath(path) {
  /**
   * Espresão Regular:
   * @description É uma das forma de encontrar textos que seguem um padrão/formato dentro de um texto que é muito maior.
   */
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
  
  /**
   * Cria o grupo com as query params => tudo depois do '?'.
   */
  const queryParametersGroupRegex = '(?<query>\\?(.*))';
  const pathRegex = new RegExp(`^${pathWithParams}${queryParametersGroupRegex}?$`);

  return pathRegex
}