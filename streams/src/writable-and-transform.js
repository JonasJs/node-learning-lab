import { Readable, Transform, Writable } from "node:stream";


// Leitura: é possivel apenas ler dados dela
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


// Tranformação: Obrigatoria mente precisa ler dados de algum lugar e escrever dados para outro lugar
class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    const buff = Buffer.from(String(transformed)); 

    // Error, buff 
    callback(null, buff);
  }
}

// Escrita: Consigo apenas escrever dados para ela
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