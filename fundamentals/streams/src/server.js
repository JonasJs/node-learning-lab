import http from "node:http";
import { Transform } from "node:stream";

import { json } from "./middlewares/json.js";

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    const buff = Buffer.from(String(transformed));

    console.log(transformed);

    callback(null, buff);
  }
}


/** Simulação deu banco de dados local */
const users = [];

/**
 * Tudo no node são streams: (Todas portas de entrada e saida)
 *
 * - req: ReadableStream (Leitura)
 * - res: WhitableStream (Escrita)
 *
 */
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  /** O middleware como um interceptador, que recebe a requisição que lida com essa requisição da melhor forma para a aplicação.*/
  await json(req, res);

  if(method === 'GET' && url === '/users') {
    return res.end(JSON.stringify(users));
  }

  if(method === 'POST' && url === '/users') {
    const { name, email } = req.body;

    users.push({
      id: 1,
      name,
      email,
    });

    return res.writeHead(201).end();
  }

});

server.listen(3333, () => console.log('Servidor de streams com JSON rodando.'));