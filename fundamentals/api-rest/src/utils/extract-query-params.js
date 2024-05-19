
/**
 * Retorna as query params.
 * 
 * @param {*} query
 * @example '?search=jonas&page=2'
 * @return new RegExp
 */
export function extractQueryParams(query) {
  
  if(typeof query !== 'string') {
   return {};
  }
  
  return query.substr(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=');

    queryParams[key] = value;

    return queryParams;
  }, {});

}