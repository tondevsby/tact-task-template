"use strict";

const { normalize, resolve } = require("path");
const { existsSync, readFileSync } = require("fs");
const { writeFileWithDirsSync } = require("./fs.cjs");

const vfs = {
  resolve: (...paths) => normalize(resolve(...paths)),
  exists: (path) => existsSync(path),
  readFile: (path) => readFileSync(path),
  writeFile: (path, content) => {
    const data = typeof content === "string" ? Buffer.from(content, "utf-8") : content;
    writeFileWithDirsSync(path, data);
  },
};

module.exports = vfs;
