import { Readable } from "node:stream";

/*
 *
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

fetch("http://localhost:3333", {
  method: "POST",
  body: new OneToHungredStream(),
  duplex: 'half'
});
