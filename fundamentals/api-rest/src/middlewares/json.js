export async function json(req, res) {

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

  // transforma os dados do Buffer em String.
  const bufferString = Buffer.concat(buffers).toString();

  try {
    // Transforma os dados do Buffer em JSON.
    req.body = JSON.parse(bufferString);
  } catch {
    req.body = null
  }


  res.setHeader('Content-Type', 'application/json');
};