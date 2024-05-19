import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  /** O middleware como um interceptador, que recebe a requisição que lida com essa requisição da melhor forma para a aplicação.*/
  await json(req, res);

  const route = routes.find(route => route.method === method && route.path.test(url));

  if(route){
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;
    
    req.params = params;
    req.query = extractQueryParams(query);

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333, () => console.log('Servidor de API REST rodando.'));