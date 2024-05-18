import http from "node:http";
import { Transform } from "node:stream";

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    const buff = Buffer.from(String(transformed));

    console.log(transformed);

    callback(null, buff);
  }
}

/**
 * Tudo no node são streams: (Todas portas de entrada e saida)
 *
 * - req: ReadableStream (Leitura)
 * - res: WhitableStream (Escrita)
 *
 */
const server = http.createServer(async (req, res) => {
  const buffers = [];

  /**
   * Usando await em streams
   * @description
   * O for await vai garantir que nossa aplicação não execute a lógica antes de finalizar a leitura da stream.
   * o Await dentro de uma Stream, ele aguarda cada pedaço/chunk da Stream ser retornado.
   */
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  return res.end(fullStreamContent);

  // const inverseNumber = new InverseNumber();
  // return req.pipe(inverseNumber).pipe(res);
});

server.listen(3331, () => console.log('Servidor de streams rodando.'));