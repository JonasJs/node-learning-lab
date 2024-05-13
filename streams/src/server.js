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
 * - req: ReadableStream (Ler)
 * - res: WhitableStream (Escrever)
 *
 */
const server = http.createServer((req, res) => {
  const inverseNumber = new InverseNumber();

  return req.pipe(inverseNumber).pipe(res);
});

server.listen(3333);
