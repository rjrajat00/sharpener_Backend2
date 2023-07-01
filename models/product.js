const path = require("path");
const fs = require("fs");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFIle = (cb) => {
  fs.readFile(p, (error, fileContent) => {
    if (error) {
      return cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFIle((products) => {
      products.push(this);

      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFIle(cb);
  }
};
