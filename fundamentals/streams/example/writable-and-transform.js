import { Readable, Transform, Writable } from "node:stream";


/**
 * Classe de Leitura
 * @description Apenas ler dados.
 */
class OneToHungredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
        return;
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}


/**
 * Classe de Transformação
 * @description Apenas ler dados e escrever dados.
 */
class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    const buff = Buffer.from(String(transformed)); 

    // Error, buff 
    callback(null, buff);
  }
}

/**
 * Classe de Escrita
 * @description Apenas escreve dados
 */
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);

    callback();
  }
}


const multiplyByTenStream = new MultiplyByTenStream();
const inverseNumber = new InverseNumber();

new OneToHungredStream()
  .pipe(inverseNumber)
  .pipe(multiplyByTenStream);