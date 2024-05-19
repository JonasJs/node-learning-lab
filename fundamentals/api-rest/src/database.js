import fs from "node:fs/promises";

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  // No node precisamos utilizar o '#' para declarar que uma propriedade ou metodo é privada.
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then((data) => {
        this.#database =JSON.parse(data)
      }).catch(() => {
        this.#persist();
      });

  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, filter = null) {
    let data = this.#database[table] ?? [];

    if(typeof filter === 'object') {
      data = data.filter(row => {
        return Object.entries(filter).some(([key, value]) => {
          return typeof value !== 'string' || row[key].toLowerCase().includes(value.toLowerCase());
        });
      })
    }
    
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
    return data;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);
    if(rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);
    if(rowIndex > -1) {

      this.#database[table][rowIndex] = {
        id,
       ...data,
      };

      this.#persist();
    }
  }
}
